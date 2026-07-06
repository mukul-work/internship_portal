import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateSession } from "@/lib/validations/sessionValidation";

export async function GET() {
  try {
    const result = await validateSession();
    return NextResponse.json(
      { message: result.message, data: result.data },
      { status: result.status },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        },
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
