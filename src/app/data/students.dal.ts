import { studentInternshipDTO } from "@/types/student-internship.dto";
import { cookies } from "next/headers";

export async function getStudentInternshipData(): Promise<
  studentInternshipDTO[]
> {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/students`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return response.json();
}
