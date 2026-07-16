"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function AdminLoginPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <button
        onClick={() =>
          router.push("auth/login/admin?callbackUrl=/Admin-Module/dashboard")
        }
      >
        <h1 className="text-2xl font-semibold cursor-pointer">Admin Login</h1>
      </button>
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
