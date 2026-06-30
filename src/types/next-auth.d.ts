import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    admin: {
      id?: string;
    } & DefaultSession["user"];
  }
}
