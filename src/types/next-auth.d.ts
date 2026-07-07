import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      adminId?: string;
      studentId?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    adminId?: string;
    studentId?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    adminId?: string;
    studentId?: string;
    role?: string;
  }
}
