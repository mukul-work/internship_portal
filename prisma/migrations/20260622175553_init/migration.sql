-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "universityRollNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Internship" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "sourceOfInternship" TEXT NOT NULL,
    "internshipType" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "stipend" TEXT NOT NULL,
    "stipendAmount" TEXT,
    "ppo" TEXT NOT NULL,
    "ppoProof" TEXT,
    "organisationName" TEXT NOT NULL,
    "organisationAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "completionProof" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_universityRollNo_key" ON "Student"("universityRollNo");

-- CreateIndex
CREATE UNIQUE INDEX "Internship_studentId_key" ON "Internship"("studentId");

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
