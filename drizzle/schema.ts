import { text, sqliteTable, int } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('auth_user', {
	id: text('id', {
		length: 15
	}).primaryKey(),
	username: text('username', {
		length: 55
	}),
	email: text('email'),
	avatar: text('avatar')
});

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
