import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateAdminSessionAndFetchStudentById } from "@/lib/validations/adminSessionValidation";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ studentId: string }> },
) {
  try {
    const { studentId } = await params;

    if (!studentId) {
      return NextResponse.json(
        { success: false, message: "studentId is required" },
        { status: 400 },
      );
    }

    // Session Validation
    const id = Number(studentId);
    const adminValidationResult =
      await validateAdminSessionAndFetchStudentById(id);

    return NextResponse.json(
      {
        success: adminValidationResult.success,
        message: adminValidationResult.message,
        data: adminValidationResult.data,
      },
      { status: adminValidationResult.status },
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
