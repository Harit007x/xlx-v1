/*
  Warnings:

  - You are about to drop the `UserPreferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPreferences" DROP CONSTRAINT "UserPreferences_user_id_fkey";

-- DropTable
DROP TABLE "UserPreferences";

-- CreateTable
CREATE TABLE "Preferences" (
    "preference_id" SERIAL NOT NULL,
    "theme" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("preference_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "session_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scheduled_time" TIMESTAMP(3) NOT NULL,
    "is_manual" BOOLEAN NOT NULL,
    "is_auto" BOOLEAN NOT NULL,
    "invitation_link" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_user_id_key" ON "Preferences"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_user_id_key" ON "Session"("user_id");

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
