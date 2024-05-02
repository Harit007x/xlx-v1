/*
  Warnings:

  - The primary key for the `Preferences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `preference_id` on the `Preferences` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `session_id` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[room_id]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room_id` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- AlterTable
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_pkey",
DROP COLUMN "preference_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "session_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "room_id" INTEGER NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_chat_paused" BOOLEAN NOT NULL,
    "is_ind_paused" BOOLEAN NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participants" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionQuestions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "question_type" TEXT NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "SessionQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "up_vote_count" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participants_user_id_key" ON "Participants"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Participants_room_id_key" ON "Participants"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "SessionQuestions_room_id_key" ON "SessionQuestions"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_user_id_key" ON "Questions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_room_id_key" ON "Questions"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_room_id_key" ON "Session"("room_id");

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionQuestions" ADD CONSTRAINT "SessionQuestions_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
