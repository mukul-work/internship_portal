import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const internship = await prisma.internship.create({
      data: body,
    });
    return NextResponse.json(internship, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create internship", error: error },
      { status: 500 },
    );
  }
};
