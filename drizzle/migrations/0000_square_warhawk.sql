CREATE TABLE `auth_key` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`hashed_password` text(255),
	FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`active_expires` integer NOT NULL,
	`idle_expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `auth_user` (
	`id` text(15) PRIMARY KEY NOT NULL,
	`username` text(55),
	`names` text(255),
	`last_names` text(255)
);
