import { internshipPOST } from "@/types/internships/internship.POST";
import { internshipPATCH } from "@/types/internships/internship.PATCH";
import { internshipGET } from "@/types/internships/internship.GET";
import { apiRequest } from "@/lib/apiRequest";
import { ApiResponse } from "@/types/apiResponse.type";

export async function postInternshipForStudent(
  data: internshipPOST,
): Promise<ApiResponse<internshipPOST>> {
  return apiRequest<internshipPOST>(
    `${process.env.NEXTAUTH_URL}/api/students/internships`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
}

export async function patchInternshipForStudent(
  data: internshipPATCH,
): Promise<ApiResponse<internshipPATCH>> {
  return apiRequest<internshipPATCH>(
    `${process.env.NEXTAUTH_URL}/api/students/internships/${data.internshipId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
}

export async function getInternshipForStudent(
  data: internshipGET,
): Promise<ApiResponse<internshipGET>> {
  return apiRequest<internshipGET>(
    `${process.env.NEXTAUTH_URL}/api/students/internships/${data.internshipId}`,
  );
}
