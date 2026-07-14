import {
  internshipInputSchemaPATCH,
  internshipInputSchemaPOST,
} from "@/lib/validations//internship-input/internshipInput";
import { InternshipInputPOST, InternshipInputPATCH } from "./internshipInput";

type internshipValidationResult = {
  success: boolean;
  status: number;
  message: string;
  data: InternshipInputPOST | InternshipInputPATCH | null;
};

export async function validateInternshipPOSTRequest(
  request: Request,
): Promise<internshipValidationResult> {
  const body = await request.json();

  const result = internshipInputSchemaPOST.safeParse(body);

  if (!result.success) {
    return {
      success: false,
      status: 400,
      message: "Invalid Request",
      data: null,
    };
  }

  return {
    success: true,
    status: 200,
    data: result.data,
    message: "Internship Validated",
  };
}

export async function validateInternshipPATCHRequest(
  request: Request,
  internshipId: number,
): Promise<internshipValidationResult> {
  const body = await request.json();

  const result = internshipInputSchemaPATCH.safeParse(body);

  if (!result.success) {
    return {
      success: false,
      status: 400,
      message: "Invalid Request",
      data: null,
    };
  }

  if (result.data.internshpiId !== internshipId) {
    return {
      success: false,
      message: "Invalid internship Id",
      data: null,
      status: 400,
    };
  }

  return {
    success: true,
    status: 200,
    data: result.data,
    message: "Internship Validated",
  };
}
