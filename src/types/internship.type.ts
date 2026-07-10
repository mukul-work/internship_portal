import { Student } from "./student.type";

export interface Internship {
  internshipId: number;
  studentId: number;
  sourceOfInternship: string;
  internshipType: string;
  role: string;
  duration: number;
  startDate: string;
  endDate: string;
  stipend: boolean;
  stipendAmount?: string;
  ppo: boolean;
  ppoProof?: string;
  organisationName: string;
  organisationAddress: string;
  status: "completed" | "inProgress";
  completionProof?: string;
  student: Student;
}
