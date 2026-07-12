import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import StudentDetails from "./_components/StudentDetails";
import { fetchStudentDataForStudent } from "@/app/data/students.service";
import { StudentDetailsError } from "./_components/error/StudentError";

export default async function StudentDetailsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "STUDENT") {
    return <StudentDetailsError />;
  }
  const response = await fetchStudentDataForStudent();
  console.log("Student response: ", response);
  return <StudentDetails data={response.data} />;
}
