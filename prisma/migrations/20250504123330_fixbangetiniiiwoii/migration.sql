/*
  Warnings:

  - You are about to drop the column `statusmentor` on the `HakAkses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `HakAkses` DROP COLUMN `statusmentor`,
    ADD COLUMN `statuscontent` BOOLEAN NULL,
    ADD COLUMN `statuspegawai` BOOLEAN NULL;
