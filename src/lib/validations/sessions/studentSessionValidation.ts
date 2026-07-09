import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { prisma } from "@/lib/prisma";
import { studentInputSchema } from "../student-input/studentInput";

export async function validateStudentSession(request: Request) {
  const session = await getServerSession(authOptions);

  if (!(session?.user?.role === "STUDENT")) {
    return { success: false, message: "Unauthorised", status: 401, data: null };
  }

  if (!session?.user?.email) {
    return { message: "Email not found", status: 400, data: null };
  }

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

  const student = await prisma.student.findUnique({
    where: { studentEmail: session.user.email },

    include: {
      studentInternships: true,
    },
  });

  if (!student) {
    return {
      success: false,
      message: "Student not found",
      status: 404,
      data: null,
    };
  }
  if (result.data.studentId !== student.studentId) {
    return {
      success: false,
      message: "Invalid StudentId",
      status: 400,
      data: null,
    };
  }
  return {
    success: true,
    message: "Student authorised and found",
    status: 200,
    data: student,
  };
}
