-- CreateTable
CREATE TABLE `StatusMentor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statusId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NULL,

    UNIQUE INDEX `StatusMentor_statusId_key`(`statusId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StatusMentor` ADD CONSTRAINT `StatusMentor_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Mentor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
