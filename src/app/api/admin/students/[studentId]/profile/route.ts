import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateStudentSession } from "@/lib/validations/sessions/studentSessionValidation";
import { validateStudentRequest } from "@/lib/validations/student-input/validateStudentRequest";
import { prisma } from "@/lib/prisma";
import { studentProfileSelect } from "@/lib/student-internship-query/studentSelect";
import { validateAdminSession } from "@/lib/validations/sessions/adminSessionValidation";
import { success } from "zod";

export async function GET(
  request: Request,
  { params }: { params: { studentId: string } },
) {
  try {
    // Session Validation
    const adminValidationResult = await validateAdminSession();

    if (!adminValidationResult.success) {
      return NextResponse.json(
        {
          success: adminValidationResult.success,
          message: adminValidationResult.message,
          data: adminValidationResult.data,
        },
        { status: adminValidationResult.status },
      );
    }

    //Fetching data and studentId validation
    const { studentId } = await params;
    const id = Number(studentId);

    const student = await prisma.student.findUnique({
      where: {
        studentId: id,
      },
      select: studentProfileSelect,
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Student Id",
          data: undefined,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Student Profile found",
        data: student,
      },
      {
        status: 200,
      },
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

export async function PATCH(
  request: Request,
  { params }: { params: { studentId: string } },
) {
  try {
    // Session validation
    const adminValidationResult = await validateAdminSession();

    if (!adminValidationResult.success) {
      return NextResponse.json(
        {
          success: adminValidationResult.success,
          message: adminValidationResult.message,
          data: adminValidationResult.data,
        },
        { status: adminValidationResult.status },
      );
    }

    //Fetching data and studentId validation
    const { studentId } = await params;
    const id = Number(studentId);

    const student = await prisma.student.findUnique({
      where: {
        studentId: id,
      },
      select: studentProfileSelect,
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Student Id",
          data: undefined,
        },
        { status: 404 },
      );
    }

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
        studentId: studentValidationResult.data.studentId,
      },
      data: {
        ...result.data,
      },
      select: {
        studentId: true,
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
