/*
  Warnings:

  - You are about to drop the column `deskripsi_kursus` on the `Kursus` table. All the data in the column will be lost.
  - You are about to drop the column `id_kategori` on the `Kursus` table. All the data in the column will be lost.
  - You are about to drop the column `id_topik_kursus` on the `Kursus` table. All the data in the column will be lost.
  - You are about to drop the column `jumlah_materi_total` on the `Kursus` table. All the data in the column will be lost.
  - You are about to drop the column `jumlah_pertemuan_total` on the `Kursus` table. All the data in the column will be lost.
  - You are about to drop the column `mentor_kursus` on the `Kursus` table. All the data in the column will be lost.
  - You are about to drop the column `nama_kursus` on the `Kursus` table. All the data in the column will be lost.
  - You are about to drop the column `id_pertemuan` on the `Materi` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `Materi` table. All the data in the column will be lost.
  - You are about to drop the column `id_kursus` on the `MyCourse` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `MyCourse` table. All the data in the column will be lost.
  - You are about to drop the column `id_kursus` on the `Pertemuan` table. All the data in the column will be lost.
  - You are about to drop the column `id_kategori` on the `TopikKursus` table. All the data in the column will be lost.
  - You are about to drop the `whychoose` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kategoriId` to the `Kursus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentorId` to the `Kursus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaKursus` to the `Kursus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pertemuanId` to the `Materi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kursusId` to the `MyCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `MyCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kursusId` to the `Pertemuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategoriId` to the `TopikKursus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Kursus` DROP FOREIGN KEY `Kursus_id_kategori_fkey`;

-- DropForeignKey
ALTER TABLE `Kursus` DROP FOREIGN KEY `Kursus_id_topik_kursus_fkey`;

-- DropForeignKey
ALTER TABLE `Materi` DROP FOREIGN KEY `Materi_id_pertemuan_fkey`;

-- DropForeignKey
ALTER TABLE `MyCourse` DROP FOREIGN KEY `MyCourse_id_kursus_fkey`;

-- DropForeignKey
ALTER TABLE `MyCourse` DROP FOREIGN KEY `MyCourse_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `Pertemuan` DROP FOREIGN KEY `Pertemuan_id_kursus_fkey`;

-- DropForeignKey
ALTER TABLE `TopikKursus` DROP FOREIGN KEY `TopikKursus_id_kategori_fkey`;

-- DropIndex
DROP INDEX `Kursus_id_kategori_fkey` ON `Kursus`;

-- DropIndex
DROP INDEX `Kursus_id_topik_kursus_fkey` ON `Kursus`;

-- DropIndex
DROP INDEX `Materi_id_pertemuan_fkey` ON `Materi`;

-- DropIndex
DROP INDEX `MyCourse_id_kursus_fkey` ON `MyCourse`;

-- DropIndex
DROP INDEX `MyCourse_id_user_fkey` ON `MyCourse`;

-- DropIndex
DROP INDEX `Pertemuan_id_kursus_fkey` ON `Pertemuan`;

-- DropIndex
DROP INDEX `TopikKursus_id_kategori_fkey` ON `TopikKursus`;

-- AlterTable
ALTER TABLE `Kursus` DROP COLUMN `deskripsi_kursus`,
    DROP COLUMN `id_kategori`,
    DROP COLUMN `id_topik_kursus`,
    DROP COLUMN `jumlah_materi_total`,
    DROP COLUMN `jumlah_pertemuan_total`,
    DROP COLUMN `mentor_kursus`,
    DROP COLUMN `nama_kursus`,
    ADD COLUMN `deskripsiKursus` VARCHAR(191) NULL,
    ADD COLUMN `jumlahMateriTotal` INTEGER NULL,
    ADD COLUMN `jumlahPertemuanTotal` INTEGER NULL,
    ADD COLUMN `kategoriId` INTEGER NOT NULL,
    ADD COLUMN `mentorId` INTEGER NOT NULL,
    ADD COLUMN `namaKursus` VARCHAR(191) NOT NULL,
    ADD COLUMN `topikKursusId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Materi` DROP COLUMN `id_pertemuan`,
    DROP COLUMN `video_url`,
    ADD COLUMN `pertemuanId` INTEGER NOT NULL,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `MyCourse` DROP COLUMN `id_kursus`,
    DROP COLUMN `id_user`,
    ADD COLUMN `kursusId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Pertemuan` DROP COLUMN `id_kursus`,
    ADD COLUMN `kursusId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TopikKursus` DROP COLUMN `id_kategori`,
    ADD COLUMN `kategoriId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `whychoose`;

-- CreateTable
CREATE TABLE `Mentor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bidang` VARCHAR(191) NOT NULL,
    `privilage` VARCHAR(191) NULL,

    UNIQUE INDEX `Mentor_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WhyChoose` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `icon` VARCHAR(191) NULL,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mentor` ADD CONSTRAINT `Mentor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyCourse` ADD CONSTRAINT `MyCourse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyCourse` ADD CONSTRAINT `MyCourse_kursusId_fkey` FOREIGN KEY (`kursusId`) REFERENCES `Kursus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopikKursus` ADD CONSTRAINT `TopikKursus_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `Kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kursus` ADD CONSTRAINT `Kursus_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `Kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kursus` ADD CONSTRAINT `Kursus_topikKursusId_fkey` FOREIGN KEY (`topikKursusId`) REFERENCES `TopikKursus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kursus` ADD CONSTRAINT `Kursus_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Mentor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pertemuan` ADD CONSTRAINT `Pertemuan_kursusId_fkey` FOREIGN KEY (`kursusId`) REFERENCES `Kursus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materi` ADD CONSTRAINT `Materi_pertemuanId_fkey` FOREIGN KEY (`pertemuanId`) REFERENCES `Pertemuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
