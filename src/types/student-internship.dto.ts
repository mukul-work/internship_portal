import { DateTime } from "next-auth/providers/kakao";

export interface InternshipDTO {
  internshipId: number;
  studentId: number;
  sourceOfInternship: string;
  internshipType: string;
  role: string;
  duration: string;
  startDate: Date;
  endDate: Date;
  stipend: string;
  stipendAmount?: string;
  ppo: string;
  ppoProof?: string;
  organisationName: string;
  organisationAddress: string;
  status: string;
  completionProof?: string;
}

export interface studentInternshipDTO {
  studentId: number;
  studentName: string;
  studentContact: string;
  studentEmail: string;
  studentGender: string;
  studentSection: string;
  studentSemester: string;
  studentSession: string;
  studentUniversityRollNo: string;
  studentInternship?: InternshipDTO[];
}
