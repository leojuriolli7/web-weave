import { relations } from 'drizzle-orm';
import { text, sqliteTable, int, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('auth_user', {
	id: text('id', {
		length: 15
	}).primaryKey(),
	username: text('username', {
		length: 55
	}).unique(),
	email: text('email'),
	avatar: text('avatar'),
	description: text('description'),
	twitter: text('twitter_url'),
	instagram: text('instagram_url'),
	facebook: text('facebook_url'),
	youtube: text('youtube_url'),
	linkedin: text('linkedin_url'),
	tiktok: text('tiktok_url'),
	twitch: text('twitch_url'),
	telegram: text('telegram_url'),
	buttonsBackgroundColor: text('buttons_background').default('#151515').notNull(),
	buttonsBorderColor: text('buttons_border').default('#00000015').notNull(),
	iconsColor: text('icons_color').default('#8075ff').notNull(),
	descriptionColor: text('description_color').default('#b3b6b7').notNull(),
	usernameColor: text('username_color').default('#f8fafc').notNull(),
	backgroundColor: text('background_color').default('#222222').notNull(),
	buttonTextColor: text('button_text_color').default('#ffffff').notNull(),
	buttonFontWeight: text('button_font_weight').default('400').notNull(),
	buttonBorderSize: text('button_border_size').default('1px').notNull(),
	gradient: integer('has_gradient', { mode: 'boolean' }).default(false).notNull(),
	firstGradientColor: text('gradient_color_1').default('#fff989').notNull(),
	secondGradientColor: text('gradient_color_2').default('#89d9ff').notNull(),
	gradientDegrees: integer('gradient_degrees').default(45).notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
	links: many(links)
}));

export const links = sqliteTable('user_links', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	image: text('image'),
	url: text('url').notNull(),
	authorId: text('user_id', {
		length: 15
	})
		.notNull()
		.references(() => users.id)
});

export const linksRelations = relations(links, ({ one }) => ({
	author: one(users, {
		fields: [links.authorId],
		references: [users.id]
	})
}));

export const sessions = sqliteTable('user_session', {
	id: text('id', {
		length: 128
	}).primaryKey(),
	userId: text('user_id', {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	activeExpires: int('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: int('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const keys = sqliteTable('auth_key', {
	id: text('id', {
		length: 255
	}).primaryKey(),
	userId: text('user_id', {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	hashedPassword: text('hashed_password', {
		length: 255
	})
});

export type User = typeof users.$inferSelect;
export type Link = typeof links.$inferSelect;
