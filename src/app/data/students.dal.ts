import { studentProfileDTO } from "@/types/student-internship.dto";
import { cookies } from "next/headers";

export async function getAllStudentsDataForAdmin() {
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

export async function getStudentDataForStudent() {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/students/student`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return response.json();
}

export async function getStudentProfileForStudent() {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/students/student/profile`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return response.json();
}

export async function patchStudentProfileForStudent(data: studentProfileDTO) {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/students/student/profile`,
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
