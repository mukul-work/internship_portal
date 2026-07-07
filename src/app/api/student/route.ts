import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateStudentSession } from "@/lib/validations/studentSessionValidation";

export async function GET(request: Request) {
  try {
    // Session Validation
    const studentValidationResult = await validateStudentSession();

    return NextResponse.json(
      {
        success: studentValidationResult.success,
        message: studentValidationResult.message,
        data: studentValidationResult.data,
      },
      { status: studentValidationResult.status },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { success: false, message: error.message, data: null },
        {
          status: 400,
        },
      );
    }

    console.error(error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error", data: null },
      {
        status: 500,
      },
    );
  }
}
