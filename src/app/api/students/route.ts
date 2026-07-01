import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const students = await prisma.student.findMany();
    return new NextResponse(JSON.stringify(students), { status: 200 });
  } catch (error) {
    throw error;
  }
};
