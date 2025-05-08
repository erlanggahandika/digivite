/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Kategori` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Kategori` ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `metadata` JSON NULL,
    ADD COLUMN `slug` VARCHAR(191) NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    ADD COLUMN `urutan` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Kategori_slug_key` ON `Kategori`(`slug`);
