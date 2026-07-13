import { apiRequest } from "@/lib/apiRequest";
import { ApiResponse } from "@/types/apiResponse.type";
import { studentInternshipDTO } from "@/types/student-internship.dto";
import { studentProfileGET } from "@/types/students/student.GET";
import { studentProfilePATCH } from "@/types/students/student.PATCH";

export function getAllStudentsDataForAdmin(): Promise<
  ApiResponse<studentInternshipDTO[]>
> {
  return apiRequest<studentInternshipDTO[]>(
    `${process.env.NEXTAUTH_URL}/api/admin/students`,
  );
}

export function getStudentDataForStudent(): Promise<
  ApiResponse<studentInternshipDTO>
> {
  return apiRequest<studentInternshipDTO>(
    `${process.env.NEXTAUTH_URL}/api/students/student`,
  );
}

export function getStudentProfileForStudent(): Promise<
  ApiResponse<studentProfileGET>
> {
  return apiRequest<studentProfileGET>(
    `${process.env.NEXTAUTH_URL}/api/students/student/profile`,
  );
}

export function patchStudentProfileForStudent(
  data: studentProfilePATCH,
): Promise<ApiResponse<studentProfilePATCH>> {
  return apiRequest<studentProfilePATCH>(
    `${process.env.NEXTAUTH_URL}/api/students/student/profile`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
}
