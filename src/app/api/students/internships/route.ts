import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateInternshipPOSTRequest } from "@/lib/validations/internship-input/validateInternshipRequest";
import { validateStudentSession } from "@/lib/validations/sessions/studentSessionValidation";
import { success } from "zod";
export const POST = async (
  request: Request,
  // { params }: { params: Promise<{ studentId: string }> },
) => {
  try {
    // const { studentId } = await params;

    // Session Validation
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
    const result = await validateInternshipPOSTRequest(
      request,
      studentValidationResult.data.studentId,
    );

    if (!result.success) {
      return NextResponse.json(
        { success: result.success, message: result.message },
        { status: result.status },
      );
    }

    const internship = await prisma.internship.create({
      data: {
        ...result.data!,
        studentId: studentValidationResult.data.studentId,
      },
    });

    if (!internship) {
      return NextResponse.json(
        { success: false, message: "Failed to create internship" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Internship created successfully" },
      { status: 201 },
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
      { success: false, message: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
};
