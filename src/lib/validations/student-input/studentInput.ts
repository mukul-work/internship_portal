import { z } from "zod";

export const studentInputSchema = z.object({
  studentName: z.string().min(1).optional(),
  studentUniversityRollNo: z.string().min(1).optional(),
  studentContact: z.string().min(1).optional(),
  studentGender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  studentSession: z.enum(["2027", "2028", "2029"]).optional(),
  studentSemester: z.enum(["2", "4", "6"]).optional(),
  studentSection: z.enum(["A", "B", "C", "D", "E"]).optional(),
});

export type StudentInput = z.infer<typeof studentInputSchema>;
