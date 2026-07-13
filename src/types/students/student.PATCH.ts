export interface studentProfilePATCH {
  studentId: number;
  studentName: string;
  studentContact: string;
  studentEmail: string;
  studentGender: "MALE" | "FEMALE" | "OTHER";
  studentSection: "A" | "B" | "C" | "D" | "E";
  studentSemester: "2" | "4" | "6";
  studentSession: "2027" | "2028" | "2029";
  studentUniversityRollNo: string;
}
