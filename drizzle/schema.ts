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
	avatar: text('avatar')
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

export type UserWithLinks = User & { links: Link[] };
