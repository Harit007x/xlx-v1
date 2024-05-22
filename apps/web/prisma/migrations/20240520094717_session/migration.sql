/*
  Warnings:

  - The `tags` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "tags",
ADD COLUMN     "tags" JSONB[];
