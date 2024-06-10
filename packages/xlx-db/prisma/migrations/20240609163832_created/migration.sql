-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "is_asnwered" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "QuestionActions" (
    "id" SERIAL NOT NULL,
    "did_up_vote" BOOLEAN NOT NULL DEFAULT false,
    "did_down_vote" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "questions_id" INTEGER NOT NULL,

    CONSTRAINT "QuestionActions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionActions" ADD CONSTRAINT "QuestionActions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionActions" ADD CONSTRAINT "QuestionActions_questions_id_fkey" FOREIGN KEY ("questions_id") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
