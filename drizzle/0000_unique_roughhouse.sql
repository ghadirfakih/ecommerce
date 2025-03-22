CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerName` varchar(255),
	`totalAmount` float,
	`createdAt` datetime,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`price` float,
	`description` varchar(500),
	`createdAt` datetime,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
