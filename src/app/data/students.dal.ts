import { studentInternshipDTO } from "@/types/student-internship.dto";
import { studentPATCH } from "@/types/student.PATCH";
import { cookies } from "next/headers";

interface Response {
  success: boolean;
  message: string;
  data: studentInternshipDTO | studentInternshipDTO[];
}

export async function getAllStudentsDataForAdmin(): Promise<Response> {
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

export async function getStudentDataForStudent(): Promise<Response> {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/student`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.json();
}

export async function patchStudentDataForStudent(
  data: studentPATCH,
): Promise<Response> {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/student`, {
    method: "PATCH",
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
