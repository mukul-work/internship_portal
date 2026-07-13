"use server";

import { patchStudentProfileForStudent } from "../data/students.dal";
import { studentProfileDTO } from "@/types/student-internship.dto";

interface StudentResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export async function updateStudentDataForStudent(
  data: studentProfileDTO,
): Promise<StudentResponse<studentProfileDTO>> {
  try {
    const response = await patchStudentProfileForStudent(data);
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (err: any) {
    console.error("Error: ", err);
    return {
      success: false,
      message: "Failed to update student data",
      data: undefined,
      error: err,
    };
  }
}
