import { prisma } from "@/lib/prisma";
import { studentInputSchema } from "./studentInput";

export async function validateStudentRequest(
  request: Request,
  studentId: number,
) {
  const body = await request.json();
  const result = studentInputSchema.safeParse(body);

  if (!result.success) {
    return {
      success: false,
      status: 400,
      message: "Invalid Request",
      data: null,
    };
  }

  if (result.data.studentId !== studentId) {
    return {
      success: false,
      message: "Invalid StudentId",
      data: null,
      status: 400,
    };
  }

  const student = await prisma.student.findUnique({
    where: {
      studentId: result.data.studentId,
    },
    include: {
      studentInternships: true,
    },
  });

  if (!student) {
    return {
      success: false,
      status: 404,
      message: "Student not found",
      data: null,
    };
  }

  return {
    success: true,
    status: 200,
    message: "Student Validated",
    data: result.data,
  };
}
