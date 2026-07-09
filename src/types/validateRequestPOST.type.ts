import { InternshipInput } from "@/lib/validations/internship-input/internshipInput";
import { StudentInput } from "@/lib/validations/student-input/studentInput";

export type ValidateInternshipPOST =
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

export type ValidateStudentPOST =
  | {
      success: true;
      status: 200;
      data: StudentInput;
    }
  | {
      success: false;
      status: number;
      message: string;
    };
