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

export async function fetchAllStudentsInternshipData(): Promise<Response> {
  try {
    const response = await getAllStudentsDataForAdmin();
    return {
      success: true,
      message: "Student Internship Data fetched successfully",
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

export async function fetchStudentInternshipDataUsingSession(): Promise<Response> {
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
