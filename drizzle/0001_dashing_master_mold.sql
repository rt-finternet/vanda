CREATE TABLE `access_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`action` varchar(64) NOT NULL,
	`ipAddress` varchar(64),
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `access_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `access_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`sessionToken` varchar(128) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `access_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `access_sessions_sessionToken_unique` UNIQUE(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `allowed_emails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` text,
	`organization` text,
	`defaultPin` varchar(6),
	`isActive` boolean NOT NULL DEFAULT true,
	`accessCount` int NOT NULL DEFAULT 0,
	`lastAccessAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `allowed_emails_id` PRIMARY KEY(`id`),
	CONSTRAINT `allowed_emails_email_unique` UNIQUE(`email`)
);
