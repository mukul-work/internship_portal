import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import parseQuery from "@/lib/student-internship-query/parseQuery";
import { StudentQuery } from "@/types/studentQuery.type";
import { studentQuerySchema } from "@/types/studentQuery.type";
import { studentSelect } from "@/lib/student-internship-query/studentSelect";
import { buildStudentOrderBy } from "@/lib/student-internship-query/buildStudentSortBy";
import { buildStudentWhere } from "@/lib/student-internship-query/buildStudentWhere";
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const query: StudentQuery = parseQuery(searchParams);
    const where = buildStudentWhere(query);
    const orderBy = buildStudentOrderBy(query);
    const skip = (Number(query.page) - 1) * Number(query.pageSize);
    const take = Number(query.pageSize);

    const [students, total] = await prisma.$transaction([
      prisma.student.findMany({
        where,
        orderBy,
        skip,
        take,
        select: studentSelect,
      }),
      prisma.student.count({ where }),
    ]);
    const response = {
      data: students,
      total,
      page: query.page,
      pageSize: query.pageSize,
      totalPages: Math.ceil(total / Number(query.pageSize)),
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    throw error;
  }
};
