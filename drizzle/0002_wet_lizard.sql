CREATE TABLE `ipe_analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` enum('persona_select','cross_persona_click','ai_guide_query','next_section_click','page_view') NOT NULL,
	`personaId` varchar(64) NOT NULL,
	`sectionPath` varchar(256) NOT NULL,
	`targetPersonaId` varchar(64),
	`targetSection` varchar(256),
	`queryText` text,
	`sessionToken` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ipe_analytics_id` PRIMARY KEY(`id`)
);
