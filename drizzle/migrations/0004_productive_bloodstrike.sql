ALTER TABLE auth_user ADD `has_gradient` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE auth_user ADD `gradient_color_1` text DEFAULT '#fff989' NOT NULL;--> statement-breakpoint
ALTER TABLE auth_user ADD `gradient_color_2` text DEFAULT '#89d9ff' NOT NULL;--> statement-breakpoint
ALTER TABLE auth_user ADD `gradient_degrees` integer DEFAULT 45 NOT NULL;