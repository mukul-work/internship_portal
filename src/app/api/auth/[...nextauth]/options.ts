import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        if (email || password) {
          return null;
        }
        try {
          const admin = await prisma.admin.findUnique({
            where: {
              email: email,
            },
          });
          if (!admin) {
            throw new Error("Email not found");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            admin.password,
          );
          if (isPasswordCorrect) {
            return admin;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.admin.id = token._id?.toString();
        session.admin.email = token.email?.toString();
        session.admin.name = token.name?.toString();
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id?.toString();
        token.email = user.email?.toString();
        token.name = user.name?.toString();
      }
      return token;
    },
  },
};
