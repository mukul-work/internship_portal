"use server";

import * as studentDAL from "@/app/data/students.dal";
import { studentProfilePATCH } from "@/types/students/student.PATCH";

export async function getAllStudentsDataForAdminACTION() {
  return studentDAL.getAllStudentsDataForAdmin();
}

export async function getStudentDataForStudentACTION() {
  return studentDAL.getStudentDataForStudent();
}

export async function getStudentProfileForStudentACTION() {
  return studentDAL.getStudentProfileForStudent();
}

export async function patchStudentProfileForStudentACTION(
  data: studentProfilePATCH,
) {
  return studentDAL.patchStudentProfileForStudent(data);
}
