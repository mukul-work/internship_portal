"use client";

import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button onClick={() => signIn("google")}>
        <h1 className="text-2xl font-semibold cursor-pointer">Student Login</h1>
      </button>
    </div>
  );
}
