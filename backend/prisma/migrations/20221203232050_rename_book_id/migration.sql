/*
  Warnings:

  - You are about to drop the column `bookd_id` on the `book_borrowings` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `book_borrowings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "book_borrowings" DROP CONSTRAINT "book_borrowings_bookd_id_fkey";

-- AlterTable
ALTER TABLE "book_borrowings" DROP COLUMN "bookd_id",
ADD COLUMN     "book_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "book_borrowings" ADD CONSTRAINT "book_borrowings_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
