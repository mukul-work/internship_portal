import { Prisma } from "@/generated/prisma/client";

export const studentSelect = {
  studentId: true,
  studentName: true,
  studentUniversityRollNo: true,
  studentEmail: true,
  studentContact: true,
  studentGender: true,
  studentSession: true,
  studentSemester: true,
  studentSection: true,
  studentInternships: {
    select: {
      internshipId: true,
      studentId: true,
      sourceOfInternship: true,
      internshipType: true,
      role: true,
      startDate: true,
      endDate: true,
      stipend: true,
      stipendAmount: true,
      ppo: true,
      ppoProof: true,
      organisationName: true,
      organisationAddress: true,
      status: true,
      completionProof: true,
    },
  },
} satisfies Prisma.StudentSelect;
