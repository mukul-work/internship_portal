/*
  Warnings:

  - Added the required column `internshipSemester` to the `Internship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "internshipSemester" TEXT NOT NULL;
