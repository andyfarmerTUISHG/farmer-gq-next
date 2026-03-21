import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getAuthorizedEmails, isEmailAuthorized } from "@/lib/auth-helpers";

/**
 * Get the current session on the server side using Better Auth.
 * Returns null if no session exists.
 */
export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

/**
 * Check if the current request is from an authorised user.
 */
export async function isAuthorisedUser(): Promise<boolean> {
  const session = await getServerSession();
  if (!session?.user?.email) return false;
  const authorisedEmails = getAuthorizedEmails(process.env.AUTHORIZED_EMAILS || "");
  return isEmailAuthorized(session.user.email, authorisedEmails);
}
