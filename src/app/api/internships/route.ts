import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { validateInternshipRequest } from "@/lib/internship-input.ts/validateInternshipRequest";

export const POST = async (request: Request) => {
  try {
    const result = await validateInternshipRequest(request);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status },
      );
    }

    const internship = await prisma.internship.create({
      data: result.data,
    });

    return NextResponse.json(internship, { status: 201 });
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
};
