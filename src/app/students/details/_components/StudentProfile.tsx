"use client";

import { studentInternshipDTO } from "@/types/student-internship.dto";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Hash, Mail, Phone, School } from "lucide-react";

interface Props {
  student: studentInternshipDTO;
}

export default function StudentProfile({ student }: Props) {
  const initials = student.studentName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <section className="rounded-2xl border bg-card shadow-sm">
      <div className="p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20 border">
              <AvatarFallback className="text-2xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">
                  {student.studentName}
                </h1>

                <Badge variant="secondary">Student</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>Semester {student.studentSemester}</span>

                <Separator orientation="vertical" className="h-4" />

                <School className="h-4 w-4" />
                <span>Section {student.studentSection}</span>

                <Separator orientation="vertical" className="h-4" />

                <Hash className="h-4 w-4" />
                <span>{student.studentUniversityRollNo}</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="grid gap-4 rounded-xl border bg-muted/40 p-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Email
                </p>

                <p className="break-all text-sm font-medium">
                  {student.studentEmail}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Contact
                </p>

                <p className="text-sm font-medium">{student.studentContact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
