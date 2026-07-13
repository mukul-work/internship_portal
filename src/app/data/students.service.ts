"use server";

import {
  getAllStudentsDataForAdmin,
  getStudentDataForStudent,
  getStudentProfileForStudent,
} from "./students.dal";

import {
  studentInternshipDTO,
  studentProfileDTO,
} from "@/types/student-internship.dto";

interface StudentResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export async function fetchAllStudentsDataForAdmin(): Promise<
  StudentResponse<studentInternshipDTO[]>
> {
  try {
    const response = await getAllStudentsDataForAdmin();
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (err: any) {
    console.error("Error: ", err);
    return {
      success: false,
      message: "Failed to fetch student internship data",
      data: undefined,
      error: err,
    };
  }
}

export async function fetchStudentDataForStudent(): Promise<
  StudentResponse<studentInternshipDTO>
> {
  try {
    const response = await getStudentDataForStudent();
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (err: any) {
    console.error("Error: ", err);
    return {
      success: false,
      message: "Failed to fetch student internship data",
      data: undefined,
      error: err,
    };
  }
}

export async function fetchStudentProfileForStudent(): Promise<
  StudentResponse<studentProfileDTO>
> {
  try {
    const response = await getStudentProfileForStudent();
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (err: any) {
    console.error("Error: ", err);
    return {
      success: false,
      message: "Failed to fetch student profile data",
      data: undefined,
      error: err,
    };
  }
}
