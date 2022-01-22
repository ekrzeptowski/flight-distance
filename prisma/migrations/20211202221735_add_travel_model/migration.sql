-- CreateTable
CREATE TABLE `Travel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departureDate` DATETIME(3) NOT NULL,
    `arrivalDate` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `fromAirportId` INTEGER NOT NULL,
    `toAirportId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Travel` ADD CONSTRAINT `Travel_fromAirportId_fkey` FOREIGN KEY (`fromAirportId`) REFERENCES `Airport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Travel` ADD CONSTRAINT `Travel_toAirportId_fkey` FOREIGN KEY (`toAirportId`) REFERENCES `Airport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Travel` ADD CONSTRAINT `Travel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
