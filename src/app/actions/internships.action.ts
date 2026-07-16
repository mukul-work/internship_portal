"use server";

import * as internshipDAL from "@/app/data/internships.dal";
import { internshipPOST } from "@/types/internships/internship.POST";

export async function postInternshipForStudentACTION(data: internshipPOST) {
  return internshipDAL.postInternshipForStudent(data);
}
