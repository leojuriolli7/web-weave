import { users as usersTable, links as linksTable } from '$drizzle/schema';
import { tursoClient } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { updateProfileSchema } from './dashboard.schema';
import { eq } from 'drizzle-orm';
import type { ZodError } from 'zod';

/**
 * We receive the FormData object, such as:
 *
 * ```json
 * {
 *   "username": "johndoe",
 *   "links.title[23]": "Title of the link with ID 23",
 *   "links.url[23]": "URL of the link with ID 23"
 * }
 * ```
 *
 * and convert all links into a `links` array:
 *
 * ```json
 * [{"title": "Title of the link with ID 23", "url": "URL of the link with ID 23", "id": 23 }]
 * ```
 *
 */
function mountLinks(input: Record<string, any>) {
	const links: Record<string, string>[] = [];

	for (const key in input) {
		const isLink = key.match(/links\.(title|url)\[(.*?)\]/);

		if (isLink) {
			const [, property, id] = isLink;

			if (!links.some((link) => link.id === id)) {
				links.push({
					[property]: input[key],
					id
				});
			} else {
				const index = links.findIndex((link) => link.id === id);

				if (index !== -1) {
					links[index][property] = input[key];
				}
			}

			delete input[key];
		}

		input.links = links;
	}
}

/**
 * We receive an array of errors from `parseZodErrors`,
 * and parse it to return only the first error for each field.
 */
function getFirstMessages(
	arrayOfErrors: { field: string | number; message: string }[]
): Record<string, { message: string }> {
	const resultMap: Record<string, { message: string }> = {};

	for (const item of arrayOfErrors) {
		if (!resultMap[item.field]) {
			resultMap[item.field] = { message: item.message };
		}
	}

	return resultMap;
}

/**
 * We receive the `errors` array from zod, and parse it to return it with:
 *
 * ```json
 *  [{"field": "username", "message": "Required"}]
 * ```
 *
 * We also verify if the error is related to one of the `links.*` fields,
 * and parse it to return the `field` with the proper name. (`links.property[id]`)
 */
function parseZodErrors(formErrors: ZodError, input: Record<string, any>) {
	const formattedErrors = formErrors.errors.map((error) => {
		const getPath = () => {
			if (error.path[0] !== 'links') return error.path[0];

			const linkIndex = error.path[1];
			const linkProperty = error.path[2];
			const linkID = input.links[linkIndex].id;

			return `links.${linkProperty}[${linkID}]`;
		};

		return {
			field: getPath(),
			message: error.message
		};
	});

	return getFirstMessages(formattedErrors);
}

export const load = async ({ locals, depends }) => {
	const session = await locals.auth.validate();
	depends('app:your-dashboard');

	if (!session) throw redirect(302, '/');

	const profile = await tursoClient.query.users.findFirst({
		where: eq(usersTable.id, session.user.userId),
		with: {
			links: true
		}
	});

	if (!profile) throw redirect(302, '/');

	const parsedProfile = {
		...profile,
		links: profile.links.map((link) => ({
			...link,
			id: link.id.toString()
		}))
	};

	return {
		user: session.user,
		profile: parsedProfile
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) throw redirect(302, '/');

		const form = Object.fromEntries(await request.formData());

		mountLinks(form);

		const input = updateProfileSchema.safeParse(form);

		if (!input.success) {
			const errors = parseZodErrors(input.error, form);

			return fail(400, { error: true, errors });
		}

		const { links, buttonBorderSize, gradient, ...userInfoAndSocialLinks } = input.data;

		const updateUserPromise = tursoClient.update(usersTable).set({
			...userInfoAndSocialLinks,
			// html input returns a string instead of boolean...
			gradient: gradient === 'false' ? false : true,
			buttonBorderSize: `${buttonBorderSize}px`
		});

		// after here, we deal with extra links:

		const userLinks = await tursoClient.query.links.findMany({
			where: eq(linksTable.authorId, session.user.userId)
		});

		const linksToCreate = links.filter((link) => String(link.id).startsWith('__new'));

		const linksToDelete: { url: string; title: string; id: number | string }[] = userLinks.filter(
			(link) => !links.some((value) => value.id.toString() === link.id.toString())
		);

		const linksToUpdate = links.filter(
			(link) => !linksToCreate.includes(link) && !linksToDelete.includes(link)
		);

		const createPromises = linksToCreate.map(async (link) => {
			await tursoClient.insert(linksTable).values({
				authorId: session.user.userId,
				title: link.title,
				url: link.url
			});
		});

		const deletePromises = linksToDelete.map(async (link) => {
			await tursoClient.delete(linksTable).where(eq(linksTable.id, Number(link.id)));
		});

		const updatePromises = linksToUpdate.map(async (link) => {
			await tursoClient
				.update(linksTable)
				.set({
					title: link.title,
					url: link.url
				})
				.where(eq(linksTable.id, Number(link.id)));
		});

		await Promise.all([updateUserPromise, createPromises, deletePromises, updatePromises]);
	}
};
