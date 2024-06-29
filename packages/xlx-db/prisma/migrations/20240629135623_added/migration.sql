/*
  Warnings:

  - You are about to drop the column `room_code` on the `Room` table. All the data in the column will be lost.
  - Added the required column `is_finished` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Room_room_code_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "room_code";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "is_finished" BOOLEAN NOT NULL;
