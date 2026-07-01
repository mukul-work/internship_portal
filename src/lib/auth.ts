import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

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
              email: email,
            },
          });
          console.log("Admin: ", admin);
          if (!admin) {
            throw new Error("Email not found");
          }

          const isPasswordCorrect = password === admin.password ? true : false;
          if (isPasswordCorrect) {
            return admin;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw error;
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
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
