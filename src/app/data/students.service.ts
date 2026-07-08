import {
  getAllStudentInternshipData,
  getStudentInternshipDataUsingSession,
} from "./students.dal";
import { studentInternshipDTO } from "@/types/student-internship.dto";

interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export async function fetchAllStudentsInternshipData(): Promise<
  ServiceResponse<studentInternshipDTO[]>
> {
  try {
    const response = await getAllStudentInternshipData();
    return {
      success: true,
      message: "Student Internship Data fetched successfully",
      data: response,
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

export async function fetchStudentInternshipDataUsingSession(): Promise<
  ServiceResponse<studentInternshipDTO>
> {
  try {
    const response = await getStudentInternshipDataUsingSession();
    return {
      success: true,
      message: "Student Internship Data fetched successfully by ID",
      data: response,
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
