import { z } from "zod";

// Validation schemas for film-related inputs
export const markAsWatchedSchema = z.object({
  filmId: z.string().min(1, "Film ID is required").max(50, "Film ID too long"),
  dateWatched: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  cinemaLocation: z.string()
    .trim()
    .min(1, "Cinema location is required")
    .max(100, "Cinema location too long"),
  personalRating: z.number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  personalNotes: z.string()
    .trim()
    .max(1000, "Notes too long")
    .optional()
    .default(""),
  dateAddedToWishlist: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
});

export const searchFilmsSchema = z.object({
  query: z.string()
    .trim()
    .min(1, "Search query is required")
    .max(100, "Search query too long"),
});

export const addFilmSchema = z.object({
  imdbId: z.string()
    .regex(/^tt\d+$/, "Invalid IMDB ID format")
    .min(1, "IMDB ID is required")
    .max(20, "IMDB ID too long"),
  title: z.string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title too long"),
  year: z.number()
    .int("Year must be a whole number")
    .min(1900, "Year too old")
    .max(new Date().getFullYear() + 5, "Year too far in future")
    .optional(),
});

// Sanitization helper functions
export function sanitizeText(input: string): string {
  return input
    .trim()
    // Remove zero-width and invisible Unicode characters
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    // Remove other control characters
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocols
    .replace(/on\w+=/gi, "") // Remove event handlers
    .substring(0, 1000); // Limit length
}

export type MarkAsWatchedInput = z.infer<typeof markAsWatchedSchema>;
export type SearchFilmsInput = z.infer<typeof searchFilmsSchema>;
export type AddFilmInput = z.infer<typeof addFilmSchema>;
