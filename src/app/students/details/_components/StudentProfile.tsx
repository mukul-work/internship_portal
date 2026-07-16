"use client";

import { studentInternshipDTO } from "@/types/student-internship.dto";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  GraduationCap,
  Hash,
  Mail,
  Phone,
  School,
  Sparkles,
} from "lucide-react";

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
    <section className="relative overflow-hidden rounded-[32px] border bg-gradient-to-br from-amber-50 via-background to-orange-50 shadow-xl">
      {/* Decorative Background */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="relative p-8 md:p-12">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                    {student.studentName}
                  </h1>

                  <p className="mt-2 text-base text-muted-foreground">
                    KIET Group of Institutions
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
                  <GraduationCap className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">
                    Semester {student.studentSemester}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
                  <School className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">
                    Section {student.studentSection}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
                  <Hash className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">
                    {student.studentUniversityRollNo}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:w-[500px]">
            <div className="rounded-3xl border bg-white/90 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Email Address
              </p>

              <p className="mt-3 break-all text-sm font-semibold leading-6 text-slate-900">
                {student.studentEmail}
              </p>
            </div>

            <div className="rounded-3xl border bg-white/90 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <Phone className="h-6 w-6 text-emerald-600" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Contact Number
              </p>

              <p className="mt-3 text-sm font-semibold leading-6 text-slate-900">
                {student.studentContact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
