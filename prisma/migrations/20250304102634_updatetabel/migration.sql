/*
  Warnings:

  - You are about to drop the column `kategoriId` on the `TopikKursus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `TopikKursus` DROP FOREIGN KEY `TopikKursus_kategoriId_fkey`;

-- DropIndex
DROP INDEX `TopikKursus_kategoriId_fkey` ON `TopikKursus`;

-- AlterTable
ALTER TABLE `TopikKursus` DROP COLUMN `kategoriId`;

-- CreateTable
CREATE TABLE `KategoriTopik` (
    `kategoriId` INTEGER NOT NULL,
    `topikId` INTEGER NOT NULL,

    PRIMARY KEY (`kategoriId`, `topikId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KategoriTopik` ADD CONSTRAINT `KategoriTopik_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `Kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KategoriTopik` ADD CONSTRAINT `KategoriTopik_topikId_fkey` FOREIGN KEY (`topikId`) REFERENCES `TopikKursus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
