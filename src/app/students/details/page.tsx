import StudentDetails from "./_components/StudentDetails";
import { fetchStudentDataForStudent } from "@/app/data/students.service";
import { StudentDataError } from "../_components/error/StudentError";

export default async function StudentDetailsPage() {
  const response = await fetchStudentDataForStudent();
  if (!response.success) {
    return <StudentDataError />;
  }
  console.log("Student response: ", response);
  return <StudentDetails data={response.data} />;
}
