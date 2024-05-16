/*
  Warnings:

  - You are about to drop the column `scheduled_time` on the `Session` table. All the data in the column will be lost.
  - Added the required column `description` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduled_date_time` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "scheduled_time",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "scheduled_date_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tags" TEXT[];
