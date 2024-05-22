/*
  Warnings:

  - You are about to drop the column `is_manual` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `scheduled_date_time` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "is_manual",
DROP COLUMN "scheduled_date_time";
