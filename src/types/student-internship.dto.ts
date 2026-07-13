export interface InternshipDTO {
  internshipId: number;
  studentId: number;
  sourceOfInternship: "SELF" | "IIPC" | "DEPT";
  internshipType: string;
  role: string;
  startDate: Date;
  endDate: Date;
  stipend: boolean;
  stipendAmount?: string;
  ppo: boolean;
  ppoProof?: string;
  organisationName: string;
  organisationAddress: string;
  status: "COMPLETED" | "ONGOING";
  completionProof?: string;
}

export interface studentInternshipDTO {
  studentId: number;
  studentName: string;
  studentContact: string;
  studentEmail: string;
  studentGender: "MALE" | "FEMALE" | "OTHER";
  studentSection: "A" | "B" | "C" | "D" | "E";
  studentSemester: "2" | "4" | "6";
  studentSession: "2027" | "2028" | "2029";
  studentUniversityRollNo: string;
  studentInternships?: InternshipDTO[];
}
