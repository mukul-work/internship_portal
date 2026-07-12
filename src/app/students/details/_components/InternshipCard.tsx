"use client";

import { InternshipDTO } from "@/types/student-internship.dto";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Building2,
  Calendar,
  Clock3,
  BriefcaseBusiness,
  IndianRupee,
  MapPin,
  GraduationCap,
  BadgeCheck,
  ExternalLink,
  FileText,
} from "lucide-react";

import { format } from "date-fns";

interface Props {
  internship: InternshipDTO;
}

export default function InternshipCard({ internship }: Props) {
  const formatDate = (date: Date) => {
    try {
      return format(new Date(date), "dd MMM yyyy");
    } catch {
      return "-";
    }
  };
  const getDuration = (start: Date, end: Date) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    return `${months + 1} Month${months > 0 ? "s" : ""}`;
  };
  const statusVariant = () => {
    switch (internship.status.toLowerCase()) {
      case "completed":
        return "default";

      case "ongoing":
      case "active":
        return "secondary";

      default:
        return "outline";
    }
  };

  const stipend = internship.stipend
    ? internship.stipendAmount
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 2,
        }).format(Number(internship.stipendAmount))
      : "Paid"
    : "Unpaid";

  return (
    <div className="group rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />

            <h3 className="text-xl font-semibold tracking-tight">
              {internship.organisationName}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <BriefcaseBusiness className="h-4 w-4" />

            <p className="text-sm">{internship.role}</p>
          </div>
        </div>

        <Badge variant={statusVariant()}>{internship.status}</Badge>
      </div>

      <Separator />

      {/* Body */}
      <div className="grid gap-5 p-6 sm:grid-cols-2">
        <Info
          icon={Building2}
          title="Internship Type"
          value={internship.internshipType}
        />

        <Info
          icon={GraduationCap}
          title="Source"
          value={internship.sourceOfInternship}
        />

        <Info
          icon={Clock3}
          title="Duration"
          value={getDuration(internship.startDate, internship.endDate)}
        />

        <Info icon={IndianRupee} title="Stipend" value={stipend} />

        <Info
          icon={Calendar}
          title="Start Date"
          value={formatDate(internship.startDate)}
        />

        <Info
          icon={Calendar}
          title="End Date"
          value={formatDate(internship.endDate)}
        />

        <div className="sm:col-span-2">
          <Info
            icon={MapPin}
            title="Organization Address"
            value={internship.organisationAddress}
          />
        </div>
      </div>

      <Separator />

      {/* Footer */}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant={internship.ppo ? "default" : "outline"}
            className="gap-1"
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            PPO : {internship.ppo ? "Yes" : "No"}
          </Badge>
        </div>

        {(internship.completionProof || internship.ppoProof) && (
          <div className="flex flex-wrap gap-3">
            {internship.completionProof && (
              <Button variant="outline" size="sm">
                <a
                  href={internship.completionProof}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Completion Proof
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </a>
              </Button>
            )}

            {internship.ppoProof && (
              <Button variant="outline" size="sm">
                <a
                  href={internship.ppoProof}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  PPO Proof
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface InfoProps {
  icon: React.ElementType;
  title: string;
  value: string;
}

function Info({ icon: Icon, title, value }: InfoProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 rounded-lg border bg-muted p-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {title}
        </p>

        <p className="break-words font-medium">{value || "-"}</p>
      </div>
    </div>
  );
}
