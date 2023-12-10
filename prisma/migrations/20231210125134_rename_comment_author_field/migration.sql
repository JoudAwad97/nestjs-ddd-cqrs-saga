/*
  Warnings:

  - You are about to drop the column `user_id` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "user_id",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
