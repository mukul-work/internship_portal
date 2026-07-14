import { studentQuerySchema } from "@/lib/validations/student-input/studentQuery.type";

export default function (searchParams: URLSearchParams) {
  const result = studentQuerySchema.safeParse({
    page: searchParams.get("page") ?? "1",
    pageSize: searchParams.get("pageSize") ?? "20",
    order: searchParams.get("order"),
    sort: searchParams.get("sort"),
    name: searchParams.get("name"),
    universityRollNo: searchParams.get("universityRollNo"),
    email: searchParams.get("email"),
    contactNo: searchParams.get("contactNo"),
    gender: searchParams.get("gender"),
    session: searchParams.get("session"),
    semester: searchParams.get("semester"),
    section: searchParams.get("section"),
    source: searchParams.get("source"),
    stipend: searchParams.get("stipend"),
    ppo: searchParams.get("ppo"),
    status: searchParams.get("status"),
  });

  if (!result.success) {
    throw result.error;
  }

  return result.data;
}
