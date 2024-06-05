/*
  Warnings:

  - You are about to drop the `SessionQuestions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SessionQuestions" DROP CONSTRAINT "SessionQuestions_room_id_fkey";

-- DropTable
DROP TABLE "SessionQuestions";

-- CreateTable
CREATE TABLE "SessionMessages" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "SessionMessages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionMessages_user_id_key" ON "SessionMessages"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SessionMessages_room_id_key" ON "SessionMessages"("room_id");

-- AddForeignKey
ALTER TABLE "SessionMessages" ADD CONSTRAINT "SessionMessages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionMessages" ADD CONSTRAINT "SessionMessages_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
