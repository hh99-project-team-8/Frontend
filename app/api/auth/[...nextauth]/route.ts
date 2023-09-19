import NextAuth from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prismadb";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  projects: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "dribble-clone",
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 day
        },
        secret,
        { algorithm: "HS256" }
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret, {
        algorithms: ["HS256"],
      }) as JWT;
      return decodedToken;
    },
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = (await prisma.user.findUnique({
          where: { email: email as string },
        })) as { user?: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data,
          },
        };

        return newSession;
      } catch (err: any) {
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExists = (await prisma.user.findFirst({
          where: { email: user?.email as string },
        })) as { user?: UserProfile };

        if (!userExists) {
          await prisma.user.create({
            data: {
              email: user?.email as string,
              name: user?.name as string,
              avatarUrl: user?.image as string,
            },
          });
        }

        return true;
      } catch (err) {
        return false;
      }
    },
  },
  pages: { signIn: "/" },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
