import { Student } from "./student.type";

export interface Internship {
  id: number;
  studentId: number;
  sourceOfInternship: string;
  internshipType: string;
  role: string;
  duration: string;
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
