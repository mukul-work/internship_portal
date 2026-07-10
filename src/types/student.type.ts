import { Internship } from "./internship.type";

export interface Student {
  studentId: number;
  studentName: string;
  studentUniversityRollNo: string;
  studentEmail: string;
  studentContact: string;
  studentGender: string;
  studentSession: string;
  studentSemester: string;
  studentSection: string;
  studentInternships: Internship[];
}
