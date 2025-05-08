/*
  Warnings:

  - You are about to alter the column `statusmentor` on the `HakAkses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `statusadmin` on the `HakAkses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `statususer` on the `HakAkses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `HakAkses` MODIFY `statusmentor` BOOLEAN NULL,
    MODIFY `statusadmin` BOOLEAN NULL,
    MODIFY `statususer` BOOLEAN NULL;
