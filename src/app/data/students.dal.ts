import { studentInternshipDTO } from "@/types/student-internship.dto";

export async function getStudentInternshipData(): Promise<
  studentInternshipDTO[]
> {
  const response = await fetch("/api/students");

  if (!response.ok) {
    throw new Error("Failed to fetch Student Internship Data");
  }

  return response.json();
}
