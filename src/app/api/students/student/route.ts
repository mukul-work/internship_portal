import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateStudentSession } from "@/lib/validations/sessions/studentSessionValidation";
import { getStudentDataByEmail } from "@/lib/getData/getStudentDataByEmail";
import { studentSelect } from "@/lib/student-internship-query/studentSelect";

export async function GET(request: Request) {
  try {
    // Session Validation
    const studentValidationResult = await validateStudentSession();
    if (!studentValidationResult.success) {
      return NextResponse.json(
        {
          success: studentValidationResult.success,
          message: studentValidationResult.message,
          data: studentValidationResult.data,
        },
        { status: studentValidationResult.status },
      );
    }

    //Fetch Data
    const response = await getStudentDataByEmail({
      email: studentValidationResult.data?.email!,
      select: studentSelect,
    });

    return NextResponse.json(
      {
        success: response.success,
        message: response.message,
        data: response.data,
      },
      { status: response.status },
    );
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { success: false, message: error.message, data: null, error: error },
        {
          status: 400,
        },
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        data: null,
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}
