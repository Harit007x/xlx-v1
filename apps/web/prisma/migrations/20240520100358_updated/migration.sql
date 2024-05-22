/*
  Warnings:

  - You are about to drop the column `password` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "password",
ALTER COLUMN "is_chat_paused" SET DEFAULT false,
ALTER COLUMN "is_ind_paused" SET DEFAULT false;
