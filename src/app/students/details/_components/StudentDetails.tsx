"use client";

import { studentInternshipDTO } from "@/types/student-internship.dto";
import StudentProfile from "./StudentProfile";
import StudentInfoCard from "./StudentInfoCard";
import InternshipCard from "./InternshipCard";
import EmptyInternships from "./EmptyInternships";
import { Button } from "@base-ui/react/button";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  User,
  GraduationCap,
  School,
  CalendarRange,
} from "lucide-react";

interface Props {
  data: studentInternshipDTO | undefined;
}

export default function StudentDetails({ data }: Props) {
  const router = useRouter();
  if (!data) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-6">
        <div className="rounded-3xl border bg-card px-12 py-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">
            Student not found
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            We couldn't find any information for this student.
          </p>
        </div>
      </div>
    );
  }

  const internships = data.studentInternships ?? [];

  return (
    <main className="container mx-auto max-w-7xl space-y-14 px-6 py-10">
      <StudentProfile student={data} />
      <Button
        onClick={() => {
          router.push(`/students/details/edit`);
        }}
      >
        Click me
      </Button>
      <section className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            Student Details
          </p>

          <h2 className="text-3xl font-bold tracking-tight">
            Student Information
          </h2>

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Academic details and contact information associated with this
            student.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <StudentInfoCard
            icon={Mail}
            title="Email Address"
            value={data.studentEmail}
          />

          <StudentInfoCard
            icon={Phone}
            title="Contact Number"
            value={data.studentContact}
          />

          <StudentInfoCard
            icon={User}
            title="Gender"
            value={data.studentGender}
          />

          <StudentInfoCard
            icon={GraduationCap}
            title="Semester"
            value={data.studentSemester}
          />

          <StudentInfoCard
            icon={School}
            title="Section"
            value={data.studentSection}
          />

          <StudentInfoCard
            icon={CalendarRange}
            title="Academic Session"
            value={data.studentSession}
          />
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              Internship Records
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              Internship History
            </h2>

            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              {internships.length} internship
              {internships.length !== 1 ? "s" : ""} associated with this
              student.
            </p>
          </div>
        </div>

        {internships.length === 0 ? (
          <EmptyInternships />
        ) : (
          <div className="grid gap-6 lg:grid-cols-1">
            {internships.map((internship) => (
              <InternshipCard
                key={internship.internshipId}
                internship={internship}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
