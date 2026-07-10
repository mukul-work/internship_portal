import { NextResponse } from "next/server";
import { validateStudentSession } from "@/lib/validations/sessions/studentSessionValidation";
import { prisma } from "@/lib/prisma";
import { validateInternshipPATCHRequest } from "@/lib/validations/internship-input/validateInternshipRequest";
import { Prisma } from "@/generated/prisma/client";
import { validateInternship } from "@/lib/validations/internship-input/internshipValidation";
import { success } from "zod";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ internshipId: string }> },
) {
  try {
    const { internshipId } = await params;

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

    // Internship Validation
    const id = Number(internshipId);
    const internshipValidationResult = await validateInternship(
      id,
      studentValidationResult.data.studentId,
    );

    if (!internshipValidationResult.success) {
      return NextResponse.json(
        {
          success: internshipValidationResult.success,
          message: internshipValidationResult.message,
        },
        {
          status: internshipValidationResult.status,
        },
      );
    }

    // Get Internship
    return NextResponse.json(
      {
        success: true,
        message: "Internship fetched successfully",
        data: internshipValidationResult.data,
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
      { success: false, message: "Internal Server Error" },
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
    const { internshipId } = await params;

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
    const id = Number(internshipId);
    const result = await validateInternshipPATCHRequest(
      request,
      id,
      studentValidationResult.data.studentId,
    );

    if (!result.success) {
      return NextResponse.json(
        { success: result.success, message: result.message },
        { status: result.status },
      );
    }

    // Internship Validation
    const internshipValidationResult = await validateInternship(
      id,
      studentValidationResult.data.studentId,
    );

    if (!internshipValidationResult.success) {
      return NextResponse.json(
        {
          success: internshipValidationResult.success,
          message: internshipValidationResult.message,
        },
        {
          status: internshipValidationResult.status,
        },
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ internshipId: string }> },
) {
  try {
    const { internshipId } = await params;

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

    // Internship Validation
    const id = Number(internshipId);
    const internshipValidationResult = await validateInternship(
      id,
      studentValidationResult.data.studentId,
    );

    if (!internshipValidationResult.success) {
      return NextResponse.json(
        {
          success: internshipValidationResult.success,
          message: internshipValidationResult.message,
        },
        {
          status: internshipValidationResult.status,
        },
      );
    }

    // Delete Internship
    await prisma.internship.delete({
      where: {
        internshipId: id,
      },
    });

    return NextResponse.json(
      { success: true, message: "Internship Deleted successfully" },
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
      { success: false, message: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
}
