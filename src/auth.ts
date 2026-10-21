import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getMongoClient } from "@/lib/db";
import { isAllowedEmail, normalizeEmail } from "@/lib/allowed-email";
import { sendMagicLinkEmail } from "@/lib/magic-link-email";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(() => getMongoClient(), {
    databaseName: process.env.MONGODB_DB || "aisystem",
  }),
  // Sessions live in MongoDB, so removing a session document signs that device out at once.
  session: { strategy: "database", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    Resend({
      from: process.env.EMAIL_FROM,
      normalizeIdentifier: normalizeEmail,
      sendVerificationRequest: ({ identifier, url }) => sendMagicLinkEmail({ to: identifier, url }),
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/check-email",
    error: "/auth-error",
  },
  callbacks: {
    // Runs before a link is emailed and again when the link is opened.
    // Anyone outside the allowed domains is refused, and never receives an email.
    signIn({ user }) {
      return isAllowedEmail(user.email);
    },
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
