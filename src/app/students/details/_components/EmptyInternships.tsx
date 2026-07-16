"use client";

import { FileSearch, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmptyInternships() {
  const router = useRouter();
  return (
    <Card className="overflow-hidden rounded-3xl border border-dashed border-border/60 bg-card shadow-sm">
      <CardContent className="flex min-h-[420px] flex-col items-center justify-center px-8 py-16 text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border bg-muted/30">
          <FileSearch className="h-11 w-11 text-muted-foreground" />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
          Internship Records
        </p>

        <h3 className="text-3xl font-bold tracking-tight">
          No internships found
        </h3>

        <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
          This student hasn't added any internship records yet. Once an student
          submits an internship, it will appear here together with its details,
          current status, and supporting documents.
        </p>

        <Button
          onClick={() => {
            router.push("/internships/new");
          }}
          className="mt-10 rounded-xl px-6"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Internship
        </Button>
      </CardContent>
    </Card>
  );
}
