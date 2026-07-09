import { fetchStudentInternshipDataUsingSession } from "../data/students.service";

export default async function Page() {
  const result = await fetchStudentInternshipDataUsingSession();
  console.log("Fetched Data: ", JSON.stringify(result, null, 2));
  return <div>Hello There</div>;
}
