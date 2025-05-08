-- CreateTable
CREATE TABLE `ConnectTele` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bot_token` VARCHAR(191) NULL,
    `chat_id` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
