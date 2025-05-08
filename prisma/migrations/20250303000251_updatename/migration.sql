/*
  Warnings:

  - Added the required column `namaTopik` to the `Kursus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Kursus` ADD COLUMN `namaTopik` VARCHAR(191) NOT NULL;
