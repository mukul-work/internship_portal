import { studentInternshipDTO } from "@/types/student-internship.dto";
import { studentPATCH } from "@/types/student.PATCH";
import { cookies } from "next/headers";

interface allStudentResponse {
  success: boolean;
  message: string;
  data?: studentInternshipDTO[];
  error?: string;
}

interface indivisualStudentReponse {
  success: boolean;
  message: string;
  data?: studentInternshipDTO;
  error?: string;
}

export async function getAllStudentsDataForAdmin(): Promise<allStudentResponse> {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/admin/students`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return response.json();
}

export async function getStudentDataForStudent(): Promise<indivisualStudentReponse> {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/students/student`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    return {
      success: false,
      message: "Error while fetching student data",
      data: undefined,
      error: errorText,
    };
  }
  return response.json();
}

export async function patchStudentDataForStudent(
  data: studentPATCH,
): Promise<Response> {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/students/${data.studentId}`,
    {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return response.json();
}
