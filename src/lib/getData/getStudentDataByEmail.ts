import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function getStudentDataByEmail({
  email,
  select,
  include,
}: {
  email: string;
  select?: Prisma.StudentSelect;
  include?: Prisma.StudentInclude;
}) {
  const student = await prisma.student.findUnique({
    where: {
      studentEmail: email,
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
    message: "Student found",
    status: 200,
    data: student,
  };
}
