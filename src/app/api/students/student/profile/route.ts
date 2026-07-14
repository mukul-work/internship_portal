import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateStudentSession } from "@/lib/validations/sessions/studentSessionValidation";
import { validateStudentRequest } from "@/lib/validations/student-input/validateStudentRequest";
import { prisma } from "@/lib/prisma";
import { studentProfileSelect } from "@/lib/student-internship-query/studentSelect";
import { getStudentDataByEmail } from "@/lib/getData/getStudentDataByEmail";

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
      select: studentProfileSelect,
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

export async function PATCH(request: Request) {
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

    // Request Validation
    const result = await validateStudentRequest(request);

    if (!result.success) {
      return NextResponse.json(
        { success: result.success, message: result.message, data: result.data },
        { status: result.status },
      );
    }

    // Update Student
    const updated = await prisma.student.update({
      where: {
        studentEmail: studentValidationResult.data?.email,
      },
      data: {
        ...result.data,
      },
      select: {
        studentEmail: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student updated successfully",
        data: updated,
      },
      { status: 200 },
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
        success: true,
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
