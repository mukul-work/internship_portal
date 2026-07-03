/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAT` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Internship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAT` on the `Internship` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contact` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `session` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `universityRollNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAT` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminEmail]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentUniversityRollNo]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminEmail` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminName` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminPassword` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `stipend` on the `Internship` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ppo` on the `Internship` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `studentContact` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentEmail` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentGender` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentSection` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentSemester` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentSession` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentUniversityRollNo` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Internship" DROP CONSTRAINT "Internship_studentId_fkey";

-- DropIndex
DROP INDEX "Admin_email_key";

-- DropIndex
DROP INDEX "Student_universityRollNo_key";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "updatedAT",
ADD COLUMN     "adminEmail" TEXT NOT NULL,
ADD COLUMN     "adminId" SERIAL NOT NULL,
ADD COLUMN     "adminName" TEXT NOT NULL,
ADD COLUMN     "adminPassword" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId");

-- AlterTable
ALTER TABLE "Internship" DROP CONSTRAINT "Internship_pkey",
DROP COLUMN "id",
DROP COLUMN "updatedAT",
ADD COLUMN     "internshipId" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "stipend",
ADD COLUMN     "stipend" BOOLEAN NOT NULL,
DROP COLUMN "ppo",
ADD COLUMN     "ppo" BOOLEAN NOT NULL,
ADD CONSTRAINT "Internship_pkey" PRIMARY KEY ("internshipId");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "contact",
DROP COLUMN "email",
DROP COLUMN "gender",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "section",
DROP COLUMN "semester",
DROP COLUMN "session",
DROP COLUMN "universityRollNo",
DROP COLUMN "updatedAT",
ADD COLUMN     "studentContact" TEXT NOT NULL,
ADD COLUMN     "studentEmail" TEXT NOT NULL,
ADD COLUMN     "studentGender" TEXT NOT NULL,
ADD COLUMN     "studentId" SERIAL NOT NULL,
ADD COLUMN     "studentName" TEXT NOT NULL,
ADD COLUMN     "studentSection" TEXT NOT NULL,
ADD COLUMN     "studentSemester" TEXT NOT NULL,
ADD COLUMN     "studentSession" TEXT NOT NULL,
ADD COLUMN     "studentUniversityRollNo" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminEmail_key" ON "Admin"("adminEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentUniversityRollNo_key" ON "Student"("studentUniversityRollNo");

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
