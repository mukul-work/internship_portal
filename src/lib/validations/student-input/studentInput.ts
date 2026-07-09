import { z } from "zod";

export const studentInputSchema = z.object({
  studentName: z.string().min(1),
  studentUniversityRollNo: z.string().min(1),
  studentEmail: z.string().min(1),
  studentContact: z.string().min(1),
  studentGender: z.enum(["Male", "Female", "Other"]),
  studentSession: z.enum(["2027", "2028", "2029"]),
  studentSemester: z.enum(["2", "4", "6"]),
  studentSection: z.enum(["A", "B", "C", "D", "E"]),
});

export type StudentInput = z.infer<typeof studentInputSchema>;
