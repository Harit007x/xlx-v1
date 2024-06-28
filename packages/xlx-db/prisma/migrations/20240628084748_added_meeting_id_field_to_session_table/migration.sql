/*
  Warnings:

  - A unique constraint covering the columns `[meeting_id]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `meeting_id` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "meeting_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_meeting_id_key" ON "Session"("meeting_id");
