import { prisma } from "@/lib/prisma";

export async function validateInternship(
  internshipId: number,
  studentId: number,
) {
  if (Number.isNaN(internshipId)) {
    return {
      message: "Invalid internship id",
      status: 400,
      success: false,
      data: undefined,
    };
  }

  const internship = await prisma.internship.findFirst({
    where: {
      internshipId,
      studentId,
    },
  });

  if (!internship) {
    return {
      message: "No internship found or access denied",
      status: 404,
      success: false,
      data: undefined,
    };
  }

  return {
    mesage: "Internship is valid",
    status: 200,
    success: true,
    data: internship,
  };
}
