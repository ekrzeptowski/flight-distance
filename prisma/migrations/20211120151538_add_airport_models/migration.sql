-- CreateTable
CREATE TABLE `Continent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` CHAR(2) NOT NULL,

    UNIQUE INDEX `Continent_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL,
    `code` CHAR(2) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `wikipediaLink` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,
    `continentId` INTEGER NOT NULL,

    UNIQUE INDEX `Country_code_key`(`code`),
    UNIQUE INDEX `Country_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `id` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `localCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `wikipediaLink` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,
    `continentId` INTEGER NOT NULL,
    `countryId` INTEGER NOT NULL,

    UNIQUE INDEX `Region_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Airport` (
    `id` INTEGER NOT NULL,
    `ident` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `latitudeDeg` DECIMAL(15, 13) NOT NULL,
    `longitudeDeg` DECIMAL(16, 13) NOT NULL,
    `elevationFt` INTEGER NOT NULL,
    `municipality` VARCHAR(191) NOT NULL,
    `scheduledService` BOOLEAN NOT NULL,
    `homeLink` VARCHAR(191) NOT NULL,
    `wikipediaLink` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,
    `continentId` INTEGER NOT NULL,
    `countryId` INTEGER NOT NULL,
    `regionId` INTEGER NOT NULL,
    `airportTypeId` INTEGER NOT NULL,

    UNIQUE INDEX `Airport_ident_key`(`ident`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AirportType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AirportType_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Country` ADD CONSTRAINT `Country_continentId_fkey` FOREIGN KEY (`continentId`) REFERENCES `Continent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Region` ADD CONSTRAINT `Region_continentId_fkey` FOREIGN KEY (`continentId`) REFERENCES `Continent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Region` ADD CONSTRAINT `Region_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Airport` ADD CONSTRAINT `Airport_airportTypeId_fkey` FOREIGN KEY (`airportTypeId`) REFERENCES `AirportType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Airport` ADD CONSTRAINT `Airport_continentId_fkey` FOREIGN KEY (`continentId`) REFERENCES `Continent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Airport` ADD CONSTRAINT `Airport_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Airport` ADD CONSTRAINT `Airport_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
