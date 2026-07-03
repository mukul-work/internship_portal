import { fetchStudentInternshipData } from "@/app/data/students.service";

export default async function Page() {
  const studentInternshipData = await fetchStudentInternshipData();
  console.log("data:", studentInternshipData);
  return <div>Hello </div>;
}
