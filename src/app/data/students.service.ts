import { getStudentInternshipData } from "./students.dal";
import { studentInternshipDTO } from "@/types/student-internship.dto";
interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}
export async function fetchStudentInternshipData(): Promise<
  ServiceResponse<studentInternshipDTO[]>
> {
  try {
    const response = await getStudentInternshipData();
    return {
      success: true,
      message: "Student Internship Data fetched successfully",
      data: response,
    };
  } catch (err) {
    console.error("Error: ", err);
    return {
      success: true,
      message: "Failed to fetch student internship data",
      data: null,
    };
  }
}
