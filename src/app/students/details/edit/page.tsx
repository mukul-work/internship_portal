import { fetchStudentProfileForStudent } from "@/app/data/students.service";
import { StudentDataError } from "@/app/students/_components/error/StudentError";
import StudentEditForm from "./_components/StudentEditForm";

export default async function StudentProfileEditPage() {
  const response = await fetchStudentProfileForStudent();
  if (!response.success) {
    return <StudentDataError />;
  }
  console.log("student edit response: ", response);
  return (
    <div>
      <StudentEditForm initialData={response.data} />
    </div>
  );
}
