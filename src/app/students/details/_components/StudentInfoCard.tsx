"use client";

import { LucideIcon } from "lucide-react";

interface StudentInfoCardProps {
  icon: LucideIcon;
  title: string;
  value?: string | number | null;
}

export default function StudentInfoCard({
  icon: Icon,
  title,
  value,
}: StudentInfoCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl">
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-amber-100 opacity-70 transition-transform duration-300 group-hover:scale-125" />

      <div className="relative">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
          <Icon className="h-6 w-6 text-white" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {title}
        </p>

        <p
          className="mt-3 break-words text-lg font-bold leading-7 text-slate-900"
          title={value?.toString()}
        >
          {value && value.toString().trim().length > 0
            ? value
            : "Not Available"}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}
