import {
  internshipInputSchemaPATCH,
  internshipInputSchemaPOST,
} from "@/lib/validations//internship-input/internshipInput";
import { InternshipInputPOST, InternshipInputPATCH } from "./internshipInput";

type internshipValidationResult<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
};

export async function validateInternshipPOSTRequest(
  request: Request,
): Promise<internshipValidationResult<InternshipInputPOST>> {
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
): Promise<internshipValidationResult<InternshipInputPATCH>> {
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

  return {
    success: true,
    status: 200,
    data: result.data,
    message: "Internship Validated",
  };
}
