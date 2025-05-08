/*
  Warnings:

  - You are about to drop the `Kategori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KategoriTopik` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kursus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Materi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mentor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MyCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pertemuan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusMentor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TopikKursus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WhyChoose` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hakakses` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[hakAksesId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `KategoriTopik` DROP FOREIGN KEY `KategoriTopik_kategoriId_fkey`;

-- DropForeignKey
ALTER TABLE `KategoriTopik` DROP FOREIGN KEY `KategoriTopik_topikId_fkey`;

-- DropForeignKey
ALTER TABLE `Kursus` DROP FOREIGN KEY `Kursus_kategoriId_fkey`;

-- DropForeignKey
ALTER TABLE `Kursus` DROP FOREIGN KEY `Kursus_mentorId_fkey`;

-- DropForeignKey
ALTER TABLE `Kursus` DROP FOREIGN KEY `Kursus_topikKursusId_fkey`;

-- DropForeignKey
ALTER TABLE `Materi` DROP FOREIGN KEY `Materi_pertemuanId_fkey`;

-- DropForeignKey
ALTER TABLE `Mentor` DROP FOREIGN KEY `Mentor_userId_fkey`;

-- DropForeignKey
ALTER TABLE `MyCourse` DROP FOREIGN KEY `MyCourse_kursusId_fkey`;

-- DropForeignKey
ALTER TABLE `MyCourse` DROP FOREIGN KEY `MyCourse_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Pertemuan` DROP FOREIGN KEY `Pertemuan_kursusId_fkey`;

-- DropForeignKey
ALTER TABLE `StatusMentor` DROP FOREIGN KEY `StatusMentor_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `hakakses` DROP FOREIGN KEY `hakakses_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `hakAksesId` INTEGER NULL;

-- DropTable
DROP TABLE `Kategori`;

-- DropTable
DROP TABLE `KategoriTopik`;

-- DropTable
DROP TABLE `Kursus`;

-- DropTable
DROP TABLE `Materi`;

-- DropTable
DROP TABLE `Mentor`;

-- DropTable
DROP TABLE `MyCourse`;

-- DropTable
DROP TABLE `Pertemuan`;

-- DropTable
DROP TABLE `StatusMentor`;

-- DropTable
DROP TABLE `TopikKursus`;

-- DropTable
DROP TABLE `WhyChoose`;

-- DropTable
DROP TABLE `hakakses`;

-- CreateTable
CREATE TABLE `HakAkses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statusmentor` INTEGER NULL,
    `statusadmin` INTEGER NULL,
    `statususer` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_hakAksesId_key` ON `User`(`hakAksesId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_hakAksesId_fkey` FOREIGN KEY (`hakAksesId`) REFERENCES `HakAkses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
