import { Prisma } from "@/generated/prisma/client";
import { StudentQuery } from "@/types/studentQuery.type";

const studentSortFields = {
  name: "studentName",
  universityRollNo: "studentUniversityRollNo",
  semester: "studentSemester",
  section: "studentSection",
  session: "studentSession",
} as const;

export function buildStudentOrderBy(
  query: StudentQuery,
): Prisma.StudentOrderByWithRelationInput {
  if (!query.sort) {
    return {
      studentName: "asc",
    };
  }

  return {
    [studentSortFields[query.sort]]: query.order,
  };
}
