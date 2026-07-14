export interface internshipGET {
  internshipId: number;
  studentId: number;
  internshipSemester: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
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
