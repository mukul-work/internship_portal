import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateInternshipPOSTRequest } from "@/lib/validations/internship-input/validateInternshipRequest";
import { validateStudentSession } from "@/lib/validations/sessions/studentSessionValidation";
export const POST = async (request: Request) => {
  try {
    // Session Validation
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
    const result = await validateInternshipPOSTRequest(request);

    if (!result.success) {
      return NextResponse.json(
        { success: result.success, message: result.message, data: result.data },
        { status: result.status },
      );
    }

    const internship = await prisma.internship.create({
      data: {
        ...result.data!,
        studentId: studentValidationResult.data.studentId,
        startDate: new Date(result.data!.startDate),
        endDate: new Date(result.data!.endDate),
      },
      select: {
        internshipId: true,
      },
    });

    if (!internship) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create internship",
          data: null,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Internship created successfully",
        data: internship,
      },
      { status: 201 },
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
};
