import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateStudentSession } from "@/lib/validations/sessions/studentSessionValidation";

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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ internshipId: string }> },
) {
  try {
    // Session validation
    const studentValidationResult = await validateStudentSession();

    if (!studentValidationResult.data) {
      return NextResponse.json(
        {
          success: studentValidationResult.success,
          message: studentValidationResult.message,
        },
        { status: studentValidationResult.status },
      );
    }

    // Request Validation
    const result = await validateInternshipRequest(request);

    if (!result.success) {
      return NextResponse.json(
        { success: result.success, message: result.message },
        { status: result.status },
      );
    }

    // Update Internship
    const updated = await prisma.internship.update({
      where: {
        internshipId: id,
      },
      data: {
        ...result.data,
        studentId: studentValidationResult.data.studentId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Internship updated successfully",
        data: updated,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { success: false, message: error.message },
        {
          status: 400,
        },
      );
    }

    console.error(error);

    return NextResponse.json(
      { success: true, message: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
}
