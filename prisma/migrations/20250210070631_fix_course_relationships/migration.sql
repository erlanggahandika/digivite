/*
  Warnings:

  - You are about to drop the `topikkursus` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `saldo` INTEGER NULL DEFAULT 0;

-- DropTable
DROP TABLE `topikkursus`;

-- CreateTable
CREATE TABLE `MyCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_kursus` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TopikKursus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kategori` INTEGER NOT NULL,
    `type` VARCHAR(191) NULL,
    `gambar` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `nama` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kursus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kategori` INTEGER NOT NULL,
    `id_topik_kursus` INTEGER NULL,
    `nama_kursus` VARCHAR(191) NOT NULL,
    `deskripsi_kursus` VARCHAR(191) NULL,
    `mentor_kursus` VARCHAR(191) NULL,
    `jumlah_pertemuan_total` INTEGER NULL,
    `jumlah_materi_total` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pertemuan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kursus` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NULL,
    `urutan` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pertemuan` INTEGER NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `konten` VARCHAR(191) NULL,
    `video_url` VARCHAR(191) NULL,
    `urutan` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MyCourse` ADD CONSTRAINT `MyCourse_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyCourse` ADD CONSTRAINT `MyCourse_id_kursus_fkey` FOREIGN KEY (`id_kursus`) REFERENCES `Kursus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopikKursus` ADD CONSTRAINT `TopikKursus_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `Kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kursus` ADD CONSTRAINT `Kursus_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `Kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kursus` ADD CONSTRAINT `Kursus_id_topik_kursus_fkey` FOREIGN KEY (`id_topik_kursus`) REFERENCES `TopikKursus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pertemuan` ADD CONSTRAINT `Pertemuan_id_kursus_fkey` FOREIGN KEY (`id_kursus`) REFERENCES `Kursus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materi` ADD CONSTRAINT `Materi_id_pertemuan_fkey` FOREIGN KEY (`id_pertemuan`) REFERENCES `Pertemuan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
