import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@/lib/prisma";

export async function validateSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { message: "Unauthorised", status: 401, data: null };
  }
  const student = await prisma.student.findUnique({
    where: { studentEmail: session.user.email },

    include: {
      studentInternships: true,
    },
  });

  if (!student) {
    return { message: "Student not found", status: 404, data: null };
  }

  return {
    message: "Student authorised and found",
    status: 200,
    data: student,
  };
}
