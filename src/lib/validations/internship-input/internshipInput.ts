import { z } from "zod";

export const internshipInputSchema = z.object({
  studentId: z.number().int().positive(),
  sourceOfInternship: z.string().min(1),
  internshipType: z.string().min(1),
  role: z.string().min(1),
  duration: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  stipend: z.boolean(),
  stipendAmount: z.string().optional(),
  ppo: z.boolean(),
  ppoProof: z.string().optional(),
  organisationName: z.string().min(1),
  organisationAddress: z.string().min(1),
  status: z.string().min(1),
  completionProof: z.string().optional(),
});

export type InternshipInput = z.infer<typeof internshipInputSchema>;
