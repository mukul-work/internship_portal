import { z } from "zod";

export const studentQuerySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("asc"),
  sort: z
    .enum(["duration", "startDate", "endDate", "stipendAmount"])
    .optional(),
  name: z.string().optional(),
  universityRollNo: z.string().optional(),
  email: z.string().optional(),
  contactNo: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  session: z.enum(["2027", "2028", "2029"]).optional(),
  semester: z.enum(["2", "4", "6"]).optional(),
  section: z.enum(["A", "B", "C", "D", "E"]).optional(),
  source: z.enum(["self", "iipc", "dept"]).optional(),
  stipend: z.enum(["yes", "no"]).optional(),
  ppo: z.enum(["yes", "no"]).optional(),
  status: z.enum(["completed", "inProgress"]).optional(),
});

export type StudentQuery = z.infer<typeof studentQuerySchema>;
