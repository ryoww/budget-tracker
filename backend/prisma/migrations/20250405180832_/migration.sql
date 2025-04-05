/*
  Warnings:

  - Made the column `change` on table `Record` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "change" SET NOT NULL,
ALTER COLUMN "change" SET DEFAULT 0;
