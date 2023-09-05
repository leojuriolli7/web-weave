ALTER TABLE auth_user ADD `github_username` text(255);--> statement-breakpoint
ALTER TABLE `auth_user` DROP COLUMN `names`;--> statement-breakpoint
ALTER TABLE `auth_user` DROP COLUMN `last_names`;