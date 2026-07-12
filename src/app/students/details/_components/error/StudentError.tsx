"use client";

import { signIn } from "next-auth/react";

export function StudentDetailsError() {
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
