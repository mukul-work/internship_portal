import { InternshipInput } from "@/lib/validations/internshipInput";

export type ValidateInternshipResult =
  | {
      success: true;
      status: 200;
      data: InternshipInput;
    }
  | {
      success: false;
      status: number;
      message: string;
    };
