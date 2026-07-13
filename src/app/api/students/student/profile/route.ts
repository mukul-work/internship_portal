import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateStudentSession } from "@/lib/validations/sessions/studentSessionValidation";
import { validateStudentRequest } from "@/lib/validations/student-input/validateStudentRequest";
import { prisma } from "@/lib/prisma";

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

export async function PATCH(request: Request) {
  try {
    // Session validation
    const studentValidationResult = await validateStudentSession({
      select: {
        studentId: true,
      },
    });

    if (!studentValidationResult.data) {
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
    const result = await validateStudentRequest(
      request,
      studentValidationResult.data.studentId,
    );

    if (!result.success) {
      return NextResponse.json(
        { success: result.success, message: result.message, data: result.data },
        { status: result.status },
      );
    }

    // Update Student
    const updated = await prisma.student.update({
      where: {
        studentId: studentValidationResult.data.studentId,
      },
      data: {
        ...result.data,
        studentId: studentValidationResult.data.studentId,
      },
      include: {
        studentInternships: true,
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
        { success: false, message: error.message, data: null },
        {
          status: 400,
        },
      );
    }

    console.error(error);

    return NextResponse.json(
      { success: true, message: "Internal Server Error", data: null },
      {
        status: 500,
      },
    );
  }
}
