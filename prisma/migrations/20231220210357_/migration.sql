/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Author` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Author_user_id_key" ON "Author"("user_id");
