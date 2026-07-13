import { ApiResponse } from "@/types/apiResponse.type";
import { cookies } from "next/headers";

export async function apiRequest<T>(
  url: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const cookieStore = await cookies();

  const response = await fetch(url, {
    ...init,
    headers: {
      Cookie: cookieStore.toString(),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Request failed",
      error: await response.text(),
    };
  }

  return response.json();
}
