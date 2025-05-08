/*
  Warnings:

  - You are about to drop the column `mentorId` on the `hakakses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `hakakses` DROP FOREIGN KEY `hakakses_mentorId_fkey`;

-- DropIndex
DROP INDEX `hakakses_mentorId_key` ON `hakakses`;

-- AlterTable
ALTER TABLE `hakakses` DROP COLUMN `mentorId`;
