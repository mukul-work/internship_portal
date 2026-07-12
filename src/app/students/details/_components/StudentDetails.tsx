"use client";

import { studentInternshipDTO } from "@/types/student-internship.dto";

interface Props {
  data: studentInternshipDTO | undefined;
}

export default function StudentDetails({ data }: Props) {
  return (
    <div>
      route reached successfully
      <p>Student Contact: {data?.studentContact}</p>
      <button onClick={() => console.log("Nothing")}></button>
    </div>
  );
}
