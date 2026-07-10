import {
  internshipInputSchemaPATCH,
  internshipInputSchemaPOST,
} from "@/lib/validations//internship-input/internshipInput";
import { prisma } from "@/lib/prisma";
import { InternshipInputPOST, InternshipInputPATCH } from "./internshipInput";

type internshipValidationResult = {
  success: boolean;
  status: number;
  message: string;
  data: InternshipInputPOST | InternshipInputPATCH | null;
};

export async function validateInternshipPOSTRequest(
  request: Request,
  studentId: number,
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

  if (result.data.studentId !== studentId) {
    return {
      success: false,
      message: "Invalid internship Id",
      data: null,
      status: 400,
    };
  }

  const student = await prisma.student.findUnique({
    where: {
      studentId: result.data.studentId,
    },
  });

  if (!student) {
    return {
      success: false,
      status: 404,
      message: "Student not found",
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
  studentId: number,
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

  if (result.data.studentId !== studentId) {
    return {
      success: false,
      message: "Invalid student Id",
      data: null,
      status: 400,
    };
  }
  if (result.data.internshpiId !== internshipId) {
    return {
      success: false,
      message: "Invalid student Id",
      data: null,
      status: 400,
    };
  }

  const student = await prisma.student.findUnique({
    where: {
      studentId: result.data.studentId,
    },
  });

  if (!student) {
    return {
      success: false,
      status: 404,
      message: "Student not found",
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
