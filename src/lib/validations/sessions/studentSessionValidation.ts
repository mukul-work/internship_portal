import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function validateStudentSession({
  select,
  include,
}: {
  select?: Prisma.StudentSelect;
  include?: Prisma.StudentInclude;
} = {}) {
  const session = await getServerSession(authOptions);

  if (!(session?.user?.role === "STUDENT")) {
    return { success: false, message: "Unauthorised", status: 401, data: null };
  }

  if (!session?.user?.email) {
    return { message: "Email not found", status: 400, data: null };
  }

  const student = await prisma.student.findUnique({
    where: {
      studentEmail: session.user.email,
    },
    ...(select ? { select } : {}),
    ...(include ? { include } : {}),
  });
  if (!student) {
    return {
      success: false,
      message: "Student not found",
      status: 404,
      data: undefined,
    };
  }

  return {
    success: true,
    message: "Student authorised and found",
    status: 200,
    data: student,
  };
}
