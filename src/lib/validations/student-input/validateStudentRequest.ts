import { ValidateStudentPOST } from "@/types/validateInternshipRequestPOST.type";
import { prisma } from "@/lib/prisma";
import { studentInputSchema } from "./studentInput";

export async function validateStudentRequest(
  request: Request,
  studentId: number,
): Promise<ValidateStudentPOST> {
  const body = await request.json();
  const result = studentInputSchema.safeParse(body);

  if (!result.success) {
    return {
      success: false,
      status: 400,
      message: "Invalid Request",
    };
  }
  if (result.data.studentId !== studentId) {
    return {
      success: false,
      message: "Invalid StudentId",
      status: 400,
    };
  }
  const student = await prisma.student.findUnique({
    where: {
      studentId: result.data.studentId,
    },
  });

  if (!student) {
    return {
      success: false,
      status: 404,
      message: "Student not found",
    };
  }

  return {
    success: true,
    status: 200,
    data: result.data,
  };
}
