/*
  Warnings:

  - You are about to drop the column `is_asnwered` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "is_asnwered",
ADD COLUMN     "is_answered" BOOLEAN NOT NULL DEFAULT false;
