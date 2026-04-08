/**
 * Checks if an email is in the authorised whitelist
 * @param email - Email address to check
 * @param whitelist - Array of authorised email addresses
 * @returns true if email is authorised, false otherwise
 */
export function isEmailAuthorized(email: string, whitelist: string[]): boolean {
  if (!email || whitelist.length === 0) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedWhitelist = whitelist.map(e => e.trim().toLowerCase());

  return normalizedWhitelist.includes(normalizedEmail);
}

/**
 * Parses comma-separated email string into array
 * @param emailString - Comma-separated email addresses
 * @returns Array of normalised email addresses
 */
export function getAuthorizedEmails(emailString: string): string[] {
  if (!emailString) {
    return [];
  }

  return emailString
    .split(",")
    .map(email => email.trim().toLowerCase())
    .filter(email => email.length > 0);
}
