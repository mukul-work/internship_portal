import { prisma } from "@/lib/prisma";
import { studentInputSchema } from "./studentInput";

export async function validateStudentRequest(request: Request) {
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

  return {
    success: true,
    status: 200,
    message: "Student Validated",
    data: result.data,
  };
}
