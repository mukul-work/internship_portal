"use client";

import { LucideIcon } from "lucide-react";
import InfoItem from "./InfoItem";

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
    <div className="group rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-full items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border bg-muted transition-colors group-hover:bg-secondary">
          <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
        </div>

        <InfoItem title={title} value={value} />
      </div>
    </div>
  );
}
