-- CreateTable
CREATE TABLE `hakakses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `statususer` VARCHAR(191) NULL,
    `statusmentor` VARCHAR(191) NULL,
    `statusadmin` VARCHAR(191) NULL,

    UNIQUE INDEX `hakakses_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hakakses` ADD CONSTRAINT `hakakses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
