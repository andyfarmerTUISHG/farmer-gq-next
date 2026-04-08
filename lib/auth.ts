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
    expiresIn: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const authorizedEmails = getAuthorizedEmails(
            process.env.AUTHORIZED_EMAILS || "",
          );
          if (!isEmailAuthorized(user.email, authorizedEmails)) {
            return false;
          }
        },
      },
    },
  },
});
