/*
  Warnings:

  - You are about to drop the column `room_code` on the `Participants` table. All the data in the column will be lost.
  - You are about to drop the column `room_code` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `room_code` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `room_code` on the `SessionMessages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[room_id]` on the table `Participants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[room_id]` on the table `Questions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[room_id]` on the table `SessionMessages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room_id` to the `Participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `SessionMessages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_room_code_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_room_code_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_room_code_fkey";

-- DropForeignKey
ALTER TABLE "SessionMessages" DROP CONSTRAINT "SessionMessages_room_code_fkey";

-- DropIndex
DROP INDEX "Participants_room_code_key";

-- DropIndex
DROP INDEX "Questions_room_code_key";

-- DropIndex
DROP INDEX "SessionMessages_room_code_key";

-- AlterTable
ALTER TABLE "Participants" DROP COLUMN "room_code",
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "room_code",
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "room_code",
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SessionMessages" DROP COLUMN "room_code",
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Participants_room_id_key" ON "Participants"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_room_id_key" ON "Questions"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "SessionMessages_room_id_key" ON "SessionMessages"("room_id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionMessages" ADD CONSTRAINT "SessionMessages_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
