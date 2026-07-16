import StudentDetails from "./_components/StudentDetails";
import { getStudentDataForStudentACTION } from "@/app/actions/students.action";
import { StudentDataError } from "../_components/error/StudentError";

export default async function StudentDetailsPage() {
  const response = await getStudentDataForStudentACTION();
  if (!response.success) {
    return <StudentDataError />;
  }
  console.log("Student response: ", response);
  return <StudentDetails data={response.data} />;
}
