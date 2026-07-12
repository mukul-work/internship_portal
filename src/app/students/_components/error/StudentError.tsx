"use client";

import { signIn } from "next-auth/react";

export function StudentAuthError() {
  return (
    <div>
      You're not a student
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "/students/details",
          })
        }
      >
        <h1 className="text-2xl font-semibold cursor-pointer">Student Login</h1>
      </button>
    </div>
  );
}

export function StudentDataError() {
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
