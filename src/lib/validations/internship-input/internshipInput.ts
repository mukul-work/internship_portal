import { z } from "zod";

export const internshipInputSchemaPOST = z.object({
  internshipSemester: z.enum(["1", "2", "3", "4", "5", "6", "7", "8"]),
  sourceOfInternship: z.enum(["SELF", "IIPC", "DEPT"]),
  internshipType: z.enum(["REMOTE", "ONSITE", "HYBRID"]),
  role: z.string().min(1),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  stipend: z.boolean(),
  stipendAmount: z.number().optional(),
  ppo: z.boolean(),
  ppoProof: z.string().optional(),
  organisationName: z.string().min(1),
  organisationAddress: z.string().min(1),
  status: z.enum(["ONGOING", "COMPLETED"]),
  completionProof: z.string().optional(),
});

export type InternshipInputPOST = z.infer<typeof internshipInputSchemaPOST>;

export const internshipInputSchemaPATCH = z.object({
  internshipSemester: z
    .enum(["1", "2", "3", "4", "5", "6", "7", "8"])
    .optional(),
  sourceOfInternship: z.enum(["SELF", "IIPC", "DEPT"]).optional(),
  internshipType: z.enum(["REMOTE", "ONSITE", "HYBRID"]).optional(),
  role: z.string().min(1).optional(),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  stipend: z.boolean().optional(),
  stipendAmount: z.number().optional(),
  ppo: z.boolean().optional(),
  ppoProof: z.string().optional(),
  organisationName: z.string().min(1).optional(),
  organisationAddress: z.string().min(1).optional(),
  status: z.enum(["ONGOING", "COMPLETED"]).optional(),
  completionProof: z.string().optional().optional(),
});

export type InternshipInputPATCH = z.infer<typeof internshipInputSchemaPATCH>;
