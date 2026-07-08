import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) {
          console.log("Error fetching credentials");
          return null;
        }

        const { email, password } = credentials;
        console.log("Email: ", email);
        console.log("Credentials: ", credentials);
        if (!email || !password) {
          return null;
        }
        try {
          const admin = await prisma.admin.findUnique({
            where: {
              adminEmail: email,
            },
          });
          console.log("Admin: ", admin);
          if (!admin) {
            throw new Error("Email not found");
          }

          const isPasswordCorrect =
            password === admin.adminPassword ? true : false;
          if (isPasswordCorrect) {
            return {
              adminId: admin.adminId.toString(),
              studentId: undefined,
              email: admin.adminEmail,
              name: admin.adminName,
              role: "ADMIN",
            };
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 25000,
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email?.endsWith("@kiet.edu")) {
          return false;
        }
        const student = await prisma.student.findUnique({
          where: {
            studentEmail: user.email,
          },
        });

        return !!student;
      }
      return true;
    },

    async session({ session, token }) {
      if (token) {
        session.user.adminId = token.adminId?.toString();
        session.user.studentId = token.studentId?.toString();
        session.user.email = token.email?.toString();
        session.user.name = token.name?.toString();
        session.user.role = token.role?.toString();
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user.email) {
        const student = await prisma.student.findUnique({
          where: {
            studentEmail: user.email,
          },
        });

        if (student) {
          token.studentId = student.studentId.toString();
          token.adminId = undefined;
          token.name = student.studentName;
          token.email = student.studentEmail;
          token.role = "STUDENT";
        }
      }

      if (account?.provider === "credentials" && user) {
        token.adminId = user.adminId;
        token.studentId = user.studentId;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
  },
};
