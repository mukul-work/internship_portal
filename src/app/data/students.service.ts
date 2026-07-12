import {
  getAllStudentsDataForAdmin,
  getStudentDataForStudent,
} from "./students.dal";
import { studentInternshipDTO } from "@/types/student-internship.dto";

interface allStudentResponse {
  success: boolean;
  message: string;
  data?: studentInternshipDTO[];
}

interface indivisualStudentReponse {
  success: boolean;
  message: string;
  data?: studentInternshipDTO;
}

export async function fetchAllStudentsDataForAdmin(): Promise<allStudentResponse> {
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
      data: undefined,
    };
  }
}

export async function fetchStudentDataForStudent(): Promise<indivisualStudentReponse> {
  try {
    const response = await getStudentDataForStudent();
    if (response.success) {
      return {
        success: response.success,
        message: response.message,
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.message,
      data: response.data,
    };
  } catch (err) {
    console.error("Error: ", err);
    return {
      success: false,
      message: "Failed to fetch student internship data by ID",
      data: undefined,
    };
  }
}
