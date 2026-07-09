import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { prisma } from "@/lib/prisma";
import { studentInputSchema } from "../student-input/studentInput";

export async function validateStudentSession(studentId: string) {
  const session = await getServerSession(authOptions);

  if (!(session?.user?.role === "STUDENT")) {
    return { success: false, message: "Unauthorised", status: 401, data: null };
  }

  if (!session?.user?.email) {
    return { message: "Email not found", status: 400, data: null };
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

  const id = Number(studentId);

  if (id !== student.studentId) {
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
