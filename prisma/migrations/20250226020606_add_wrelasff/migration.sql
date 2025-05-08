/*
  Warnings:

  - You are about to drop the `Hakakses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Hakakses` DROP FOREIGN KEY `Hakakses_mentorId_fkey`;

-- DropForeignKey
ALTER TABLE `Hakakses` DROP FOREIGN KEY `Hakakses_userId_fkey`;

-- DropTable
DROP TABLE `Hakakses`;

-- CreateTable
CREATE TABLE `hakakses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `mentorId` INTEGER NOT NULL,
    `statususer` VARCHAR(191) NOT NULL,
    `statusmentor` VARCHAR(191) NOT NULL,
    `statusadmin` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `hakakses_userId_key`(`userId`),
    UNIQUE INDEX `hakakses_mentorId_key`(`mentorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hakakses` ADD CONSTRAINT `hakakses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hakakses` ADD CONSTRAINT `hakakses_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Mentor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
