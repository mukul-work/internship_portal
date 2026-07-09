import { internshipInputSchema } from "@/lib/validations//internship-input/internshipInput";
import { prisma } from "@/lib/prisma";
import { InternshipInput } from "./internshipInput";

type internshipValidationResult =
  | {
      success: true;
      status: 200;
      message: string;
      data: InternshipInput;
    }
  | {
      success: false;
      status: number;
      message: string;
      data: null;
    };

export async function validateInternshipRequest(
  request: Request,
  studentId: number,
): Promise<internshipValidationResult> {
  const body = await request.json();

  const result = internshipInputSchema.safeParse(body);

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
      message: "Invalid internship Id",
      data: null,
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
      data: null,
    };
  }

  return {
    success: true,
    status: 200,
    data: result.data,
    message: "Internship Validated",
  };
}
