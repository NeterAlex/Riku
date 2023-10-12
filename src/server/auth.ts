import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  type DefaultSession,
  type DefaultUser,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role: string;
    };
  }
  interface User extends DefaultUser {
    role: string;
  }
}

// @see https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
  },
  providers: [
    GitHubProvider({
      //@ts-expect-error error
      clientId: process.env.GITHUB_ID,
      //@ts-expect-error error
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
