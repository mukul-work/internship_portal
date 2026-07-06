import { internshipInputSchema } from "@/lib/validations/internshipInput";
import { ValidateInternshipPOST } from "@/types/validateInternshipRequestPOST.type";
import { prisma } from "@/lib/prisma";
export async function validateInternshipRequest(
  request: Request,
): Promise<ValidateInternshipPOST> {
  const body = await request.json();

  const result = internshipInputSchema.safeParse(body);

  if (!result.success) {
    return {
      success: false,
      status: 400,
      message: "Invalid Request",
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
