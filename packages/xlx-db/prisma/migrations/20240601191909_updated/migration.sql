/*
  Warnings:

  - You are about to drop the column `room_id` on the `Participants` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `SessionMessages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[room_code]` on the table `Participants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[room_code]` on the table `Questions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[room_code]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[room_code]` on the table `SessionMessages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room_code` to the `Participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_code` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_code` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_code` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_code` to the `SessionMessages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_room_id_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_room_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_room_id_fkey";

-- DropForeignKey
ALTER TABLE "SessionMessages" DROP CONSTRAINT "SessionMessages_room_id_fkey";

-- DropIndex
DROP INDEX "Participants_room_id_key";

-- DropIndex
DROP INDEX "Questions_room_id_key";

-- DropIndex
DROP INDEX "Room_room_id_key";

-- DropIndex
DROP INDEX "SessionMessages_room_id_key";

-- AlterTable
ALTER TABLE "Participants" DROP COLUMN "room_id",
ADD COLUMN     "room_code" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "room_id",
ADD COLUMN     "room_code" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "room_id",
ADD COLUMN     "room_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "room_id",
ADD COLUMN     "room_code" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SessionMessages" DROP COLUMN "room_id",
ADD COLUMN     "room_code" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Participants_room_code_key" ON "Participants"("room_code");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_room_code_key" ON "Questions"("room_code");

-- CreateIndex
CREATE UNIQUE INDEX "Room_room_code_key" ON "Room"("room_code");

-- CreateIndex
CREATE UNIQUE INDEX "SessionMessages_room_code_key" ON "SessionMessages"("room_code");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_room_code_fkey" FOREIGN KEY ("room_code") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_room_code_fkey" FOREIGN KEY ("room_code") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionMessages" ADD CONSTRAINT "SessionMessages_room_code_fkey" FOREIGN KEY ("room_code") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_room_code_fkey" FOREIGN KEY ("room_code") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
