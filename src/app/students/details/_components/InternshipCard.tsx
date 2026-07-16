"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { InternshipDTO } from "@/types/student-internship.dto";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ExternalLink } from "lucide-react";

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
  const router = useRouter();
  const duration = (() => {
    const start = new Date(internship.startDate);
    const end = new Date(internship.endDate);

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;

    return `${months} Month${months > 1 ? "s" : ""}`;
  })();

  const stipend = internship.stipend
    ? internship.stipendAmount
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(Number(internship.stipendAmount))
      : "Paid"
    : "Unpaid";

  const statusColor = () => {
    switch (internship.status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "ongoing":
      case "active":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          router.push("/internships/new");
        }}
      >
        Add New Internship
      </Button>
      <Card className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="flex items-start justify-between px-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {internship.organisationName}
            </h2>

            <p className="mt-1 text-sm text-gray-500">{internship.role}</p>
          </div>

          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              statusColor(),
            )}
          >
            {internship.status}
          </span>
        </div>

        <Separator />

        <div className="grid gap-x-10 gap-y-4 px-6  md:grid-cols-3">
          <Detail title="Organization" value={internship.organisationName} />

          <Detail title="Internship Type" value={internship.internshipType} />

          <Detail title="Source" value={internship.sourceOfInternship} />

          <Detail title="Stipend" value={stipend} />

          <Detail title="Start Date" value={formatDate(internship.startDate)} />

          <Detail title="End Date" value={formatDate(internship.endDate)} />

          <Detail title="Duration" value={duration} />

          <Detail title="PPO" value={internship.ppo ? "Yes" : "No"} />
        </div>

        <Separator />

        <div className="px-6">
          <Detail
            title="Organization Address"
            value={internship.organisationAddress}
          />
        </div>

        {(internship.completionProof || internship.ppoProof) && (
          <>
            <Separator />

            <div className="flex flex-wrap gap-3 px-6">
              {internship.completionProof && (
                <Button variant="outline">
                  <a
                    href={internship.completionProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Completion Proof
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}

              {internship.ppoProof && (
                <Button variant="outline">
                  <a
                    href={internship.ppoProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    PPO Proof
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

interface DetailProps {
  title: string;
  value?: string | null;
}

function Detail({ title, value }: DetailProps) {
  return (
    <div className="flex gap-1">
      <p className="text-lg font-medium tracking-wider text-gray-400">
        {`${title}: `}
      </p>

      <p className="text-lg font-medium text-gray-900">{value || "-"}</p>
    </div>
  );
}
