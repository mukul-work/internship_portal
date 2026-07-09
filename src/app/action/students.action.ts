import { patchStudentDataForStudent } from "../data/students.dal";
import { studentInternshipDTO } from "@/types/student-internship.dto";
import { studentPATCH } from "@/types/student.PATCH";

interface Response {
  success: boolean;
  message: string;
  data: studentInternshipDTO | studentInternshipDTO[] | null;
}

export async function updateStudentDataForStudent(
  data: studentPATCH,
): Promise<Response> {
  try {
    const response = await patchStudentDataForStudent(data);
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (err) {
    console.error("Error: ", err);
    return {
      success: false,
      message: "Failed to update student data",
      data: null,
    };
  }
}
