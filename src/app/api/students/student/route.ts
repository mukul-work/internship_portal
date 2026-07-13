import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateStudentSession } from "@/lib/validations/sessions/studentSessionValidation";
import { validateStudentRequest } from "@/lib/validations/student-input/validateStudentRequest";

export async function GET(request: Request) {
  try {
    // Session Validation
    const studentValidationResult = await validateStudentSession({
      include: {
        studentInternships: true,
      },
    });

    return NextResponse.json(
      {
        success: studentValidationResult.success,
        message: studentValidationResult.message,
        data: studentValidationResult.data,
      },
      { status: studentValidationResult.status },
    );
  } catch (error: any) {
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
