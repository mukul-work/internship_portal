"use client";

import { FileSearch, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmptyInternships() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border bg-muted">
          <FileSearch className="h-10 w-10 text-muted-foreground" />
        </div>

        <h3 className="text-xl font-semibold tracking-tight">
          No internships found
        </h3>

        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          This student hasn't added any internship records yet. Once an
          internship is submitted, it will appear here along with its details,
          status and supporting documents.
        </p>

        <Button className="mt-8" disabled>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Internship
        </Button>
      </CardContent>
    </Card>
  );
}
