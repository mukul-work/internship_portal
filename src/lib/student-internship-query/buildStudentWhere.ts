import { Prisma } from "@/generated/prisma/client";
import { StudentQuery } from "@/lib/validations/studentQuery.type";

export function buildStudentWhere(
  query: StudentQuery,
): Prisma.StudentWhereInput {
  const where: Prisma.StudentWhereInput = {};
  const internshipWhere: Prisma.InternshipWhereInput = {};

  if (query.name) {
    where.studentName = {
      contains: query.name,
      mode: "insensitive",
    };
  }
  if (query.universityRollNo) {
    where.studentUniversityRollNo = {
      contains: query.universityRollNo,
      mode: "insensitive",
    };
  }
  if (query.email) {
    where.studentEmail = {
      contains: query.email,
      mode: "insensitive",
    };
  }
  if (query.contactNo) {
    where.studentContact = {
      contains: query.contactNo,
      mode: "insensitive",
    };
  }
  if (query.gender) {
    where.studentGender = {
      contains: query.gender,
      mode: "insensitive",
    };
  }
  if (query.session) {
    where.studentSession = {
      contains: query.session,
      mode: "insensitive",
    };
  }
  if (query.semester) {
    where.studentSemester = {
      contains: query.semester,
      mode: "insensitive",
    };
  }
  if (query.section) {
    where.studentSection = {
      contains: query.section,
      mode: "insensitive",
    };
  }
  if (query.source) {
    internshipWhere.sourceOfInternship = {
      contains: query.source,
      mode: "insensitive",
    };
  }
  if (query.stipend) {
    internshipWhere.stipend = query.stipend === "yes";
  }
  if (query.ppo) {
    internshipWhere.ppo = query.ppo === "yes";
  }
  if (query.status) {
    internshipWhere.status = {
      contains: query.status,
      mode: "insensitive",
    };
  }
  if (Object.keys(internshipWhere).length > 0) {
    where.studentInternships = { some: internshipWhere };
  }
  return where;
}
