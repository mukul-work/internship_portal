import {
  getAllStudentsDataForAdmin,
  getStudentDataForStudent,
} from "./students.dal";
import { studentInternshipDTO } from "@/types/student-internship.dto";

interface Response {
  success: boolean;
  message: string;
  data: studentInternshipDTO | studentInternshipDTO[] | null;
}

export async function fetchAllStudentsDataForAdmin(): Promise<Response> {
  try {
    const response = await getAllStudentsDataForAdmin();
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (err) {
    console.error("Error: ", err);
    return {
      success: false,
      message: "Failed to fetch student internship data",
      data: null,
    };
  }
}

export async function fetchStudentDataForStudent(): Promise<Response> {
  try {
    const response = await getStudentDataForStudent();
    return {
      success: true,
      message: "Student Internship Data fetched successfully by ID",
      data: response.data,
    };
  } catch (err) {
    console.error("Error: ", err);
    return {
      success: false,
      message: "Failed to fetch student internship data by ID",
      data: null,
    };
  }
}
