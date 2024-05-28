-- CreateTable
CREATE TABLE "digimon" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "img" VARCHAR(255) NOT NULL,
    "level" VARCHAR(45) NOT NULL,

    CONSTRAINT "digimon_pkey" PRIMARY KEY ("id")
);
