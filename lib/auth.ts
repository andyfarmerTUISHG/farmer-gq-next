import { betterAuth } from "better-auth";
import { getAuthorizedEmails, isEmailAuthorized } from "./auth-helpers";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Refresh session if older than 1 day
  },
  hooks: {
    after: [
      {
        matcher: path => path === "/sign-in/social",
        handler: async (ctx) => {
          const email = ctx.context?.session?.user?.email;
          if (!email) return;

          const authorizedEmails = getAuthorizedEmails(
            process.env.AUTHORIZED_EMAILS || "",
          );

          if (!isEmailAuthorized(email, authorizedEmails)) {
            throw new Error("Unauthorised: email not in whitelist");
          }
        },
      },
    ],
  },
});
