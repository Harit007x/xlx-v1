/*
  Warnings:

  - A unique constraint covering the columns `[user_id,questions_id]` on the table `QuestionActions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuestionActions_user_id_questions_id_key" ON "QuestionActions"("user_id", "questions_id");
