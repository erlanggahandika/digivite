-- AlterTable
ALTER TABLE `User` ADD COLUMN `saldo` INTEGER NULL;

-- CreateTable
CREATE TABLE `sampah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
