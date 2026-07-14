import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function validateStudentSession() {
  const session = await getServerSession(authOptions);

  if (!(session?.user?.role === "STUDENT")) {
    return {
      success: false,
      message: "Unauthorised",
      status: 401,
      data: undefined,
    };
  }

  if (!session?.user?.email) {
    return { message: "Email not found", status: 400, data: undefined };
  }

  return {
    success: true,
    message: "Student authorised",
    status: 200,
    data: {
      email: session.user.email,
    },
  };
}
