/*
  Warnings:

  - You are about to drop the column `room_id` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `session_id` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_room_id_fkey";

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "room_id",
ADD COLUMN     "session_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
