/*
  Warnings:

  - You are about to drop the column `active` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `edited` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `flagged` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "active",
DROP COLUMN "edited",
DROP COLUMN "flagged";
