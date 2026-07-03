import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { studentInternshipDTO } from "@/types/student-internship.dto";
export const GET = async (request: Request) => {
  try {
    const students = await prisma.student.findMany({
      select: {
        studentId: true,
        studentName: true,
        studentContact: true,
        studentEmail: true,
        studentGender: true,
        studentSection: true,
        studentSemester: true,
        studentSession: true,
        studentUniversityRollNo: true,
        studentInternships: {
          select: {
            internshipId: true,
            studentId: true,
            sourceOfInternship: true,
            internshipType: true,
            role: true,
            duration: true,
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
      },
    });
    const response: studentInternshipDTO[] = students;
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    throw error;
  }
};
