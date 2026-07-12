import { internshipPOST } from "@/types/internship.POST";
import { cookies } from "next/headers";

export async function postStudentDataForStudent(
  data: internshipPOST,
): Promise<Response> {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/students/internships`,
    {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return response.json();
}
