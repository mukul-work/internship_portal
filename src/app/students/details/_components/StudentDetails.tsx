"use client";

import { studentInternshipDTO } from "@/types/student-internship.dto";
import StudentProfile from "./StudentProfile";
import StudentInfoCard from "./StudentInfoCard";
import InternshipCard from "./InternshipCard";
import EmptyInternships from "./EmptyInternships";

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
  if (!data) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-6">
        <div className="rounded-xl border bg-card p-10 text-center">
          <h2 className="text-xl font-semibold">Student not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find any information for this student.
          </p>
        </div>
      </div>
    );
  }

  const internships = data.studentInternships ?? [];

  return (
    <main className="container mx-auto max-w-7xl space-y-8 px-6 py-8">
      {/* ---------- Header ---------- */}
      <StudentProfile student={data} />

      {/* ---------- Student Information ---------- */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Student Information
          </h2>

          <p className="text-sm text-muted-foreground">
            Academic and contact information.
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

      {/* ---------- Internship Section ---------- */}
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Internship History
            </h2>

            <p className="text-sm text-muted-foreground">
              {internships.length} internship
              {internships.length !== 1 ? "s" : ""} associated with this
              student.
            </p>
          </div>
        </div>

        {internships.length === 0 ? (
          <EmptyInternships />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
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
