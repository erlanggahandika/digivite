/*
  Warnings:

  - You are about to drop the `sampah` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `sampah`;

-- CreateTable
CREATE TABLE `topikkursus` (
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
