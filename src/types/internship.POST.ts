export interface internshipPOST {
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
}
