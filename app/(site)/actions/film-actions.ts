"use server";

import { revalidatePath } from "next/cache";

import { filmService } from "@/lib/film-api/film-service";
import { generateFilmSlug } from "@/lib/film-utils";
import {
  addFilmSchema,
  markAsWatchedSchema,
  sanitizeText,
  searchFilmsSchema,
} from "@/lib/validation";
import { writeClient } from "@/sanity/lib/write-client";

export async function searchFilmsAction(query: string) {
  if (!filmService) {
    return {
      results: [],
      totalResults: 0,
      error: "Film service not available - OMDB_API_KEY not configured",
    };
  }

  try {
    // Validate and sanitize input
    const validatedInput = searchFilmsSchema.parse({ query });
    const sanitizedQuery = sanitizeText(validatedInput.query);

    // Check if query is an IMDB ID (starts with tt followed by digits)
    if (sanitizedQuery.match(/^tt\d+$/)) {
      const result = await filmService.getFilmDetails(sanitizedQuery);
      if (result.film) {
        return {
          results: [{
            imdbId: result.film.imdbId,
            title: result.film.title,
            year: result.film.year,
            type: "movie",
            poster: result.film.poster,
          }],
          totalResults: 1,
        };
      }
      else {
        return {
          results: [],
          totalResults: 0,
          error: result.error || "Film not found",
        };
      }
    }

    // Extract year from query if present (e.g., "Inception 2010" -> title: "Inception", year: 2010)
    const yearMatch = sanitizedQuery.match(/\b(19|20)\d{2}\b/);
    let searchTitle = sanitizedQuery;
    let searchYear: number | undefined;

    if (yearMatch) {
      searchYear = Number.parseInt(yearMatch[0]);
      searchTitle = sanitizedQuery.replace(yearMatch[0], "").trim();
    }

    // Use getFilmDetailsByTitle if we have a year, otherwise use searchFilms
    if (searchYear && searchTitle) {
      const result = await filmService.getFilmDetailsByTitle(searchTitle, searchYear);
      if (result.film) {
        return {
          results: [{
            imdbId: result.film.imdbId,
            title: result.film.title,
            year: result.film.year,
            type: "movie",
            poster: result.film.poster,
          }],
          totalResults: 1,
        };
      }
    }

    // Fallback to regular search
    const result = await filmService.searchFilms(searchTitle);
    return result;
  }
  catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return {
        results: [],
        totalResults: 0,
        error: "Invalid search query",
      };
    }
    return {
      results: [],
      totalResults: 0,
      error: error instanceof Error ? error.message : "Search failed",
    };
  }
}

export async function getFilmDetailsAction(imdbId: string) {
  if (!filmService) {
    return {
      film: null,
      error: "Film service not available - OMDB_API_KEY not configured",
    };
  }
  if (!imdbId.trim()) {
    return {
      film: null,
      error: "IMDB ID is required",
    };
  }

  try {
    const result = await filmService.getFilmDetails(imdbId.trim());
    return result;
  }
  catch (error) {
    return {
      film: null,
      error: error instanceof Error ? error.message : "Failed to fetch film details",
    };
  }
}

export async function getFilmDetailsByTitleAction(title: string, year?: number) {
  if (!filmService) {
    return {
      film: null,
      error: "Film service not available - OMDB_API_KEY not configured",
    };
  }

  if (!title.trim()) {
    return {
      film: null,
      error: "Film title is required",
    };
  }

  try {
    const result = await filmService.getFilmDetailsByTitle(title.trim(), year);
    return result;
  }
  catch (error) {
    return {
      film: null,
      error: error instanceof Error ? error.message : "Failed to fetch film details",
    };
  }
}

export async function addFilmToWishlistAction(imdbId: string, _title: string, _year?: number) {
  if (!filmService) {
    return {
      success: false,
      error: "Film service not available - OMDB_API_KEY not configured",
    };
  }

  try {
    // Validate IMDB ID format
    const validatedInput = addFilmSchema.parse({
      imdbId,
      title: _title,
      year: _year,
    });

    // Get film details from OMDb
    const filmResult = await filmService.getFilmDetails(validatedInput.imdbId);

    if (filmResult.error || !filmResult.film) {
      return {
        success: false,
        error: filmResult.error || "Failed to fetch film details",
      };
    }

    const film = filmResult.film;
    const slug = generateFilmSlug(film.title, film.year);

    // Sanitize film data from OMDb
    const sanitizedTitle = sanitizeText(film.title);
    const sanitizedPlot = film.plot ? sanitizeText(film.plot) : null;

    // Create film document in Sanity
    const filmDoc = {
      _type: "film", // Security: Only allow film document creation
      title: sanitizedTitle,
      slug: { current: slug },
      status: "wishlist",
      isSecretScreening: false,
      imdbId: film.imdbId,
      posterUrl: film.poster && film.poster !== "N/A" ? film.poster : null,
      year: film.year,
      runtime: film.runtime ? (typeof film.runtime === "string" ? Number.parseInt((film.runtime as string).replace(/\D/g, "")) : film.runtime) : null,
      plot: sanitizedPlot,
      dateAddedToWishlist: new Date().toISOString().split("T")[0], // Today's date
    };

    // Security: Verify document type before creation
    if (filmDoc._type !== "film") {
      return {
        success: false,
        error: "Unauthorized: Can only create film documents",
      };
    }

    const result = await writeClient.create(filmDoc);

    // Revalidate the films pages
    revalidatePath("/films");
    revalidatePath("/films/wishlist");

    return {
      success: true,
      filmId: result._id,
      message: `Added "${sanitizedTitle}" to wishlist`,
    };
  }
  catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return {
        success: false,
        error: "Invalid film data",
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add film to wishlist",
    };
  }
}

export async function addFilmAsWatchedAction(
  imdbId: string,
  _title: string,
  _year: number | undefined,
  dateWatched: string,
  cinemaLocation: string,
  personalRating: number,
  personalNotes?: string,
) {
  if (!filmService) {
    return {
      success: false,
      error: "Film service not available - OMDB_API_KEY not configured",
    };
  }

  try {
    // Pre-sanitize text inputs
    const cleanCinemaLocation = cinemaLocation
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, "");

    const cleanPersonalNotes = personalNotes
      ? personalNotes.trim().replace(/[\u200B-\u200D\uFEFF]/g, "")
      : "";

    // Validate inputs
    const validatedWatchData = markAsWatchedSchema.parse({
      filmId: "temp", // Will be replaced after creation
      dateWatched,
      cinemaLocation: cleanCinemaLocation,
      personalRating,
      personalNotes: cleanPersonalNotes,
    });

    const validatedFilmData = addFilmSchema.parse({
      imdbId,
      title: _title,
      year: _year,
    });

    // Get film details from OMDb
    const filmResult = await filmService.getFilmDetails(validatedFilmData.imdbId);

    if (filmResult.error || !filmResult.film) {
      return {
        success: false,
        error: filmResult.error || "Failed to fetch film details",
      };
    }

    const film = filmResult.film;
    const slug = generateFilmSlug(film.title, film.year);

    // Sanitize all text inputs
    const sanitizedTitle = sanitizeText(film.title);
    const sanitizedPlot = film.plot ? sanitizeText(film.plot) : null;
    const sanitizedCinema = sanitizeText(validatedWatchData.cinemaLocation);
    const sanitizedNotes = sanitizeText(validatedWatchData.personalNotes);

    // Create film document in Sanity with watched status
    const filmDoc = {
      _type: "film",
      title: sanitizedTitle,
      slug: { current: slug },
      status: "watched",
      isSecretScreening: false,
      imdbId: film.imdbId,
      posterUrl: film.poster && film.poster !== "N/A" ? film.poster : null,
      year: film.year,
      runtime: film.runtime ? (typeof film.runtime === "string" ? Number.parseInt((film.runtime as string).replace(/\D/g, "")) : film.runtime) : null,
      plot: sanitizedPlot,
      dateWatched: validatedWatchData.dateWatched,
      cinemaLocation: sanitizedCinema,
      personalRating: validatedWatchData.personalRating,
      personalNotes: sanitizedNotes,
    };

    const result = await writeClient.create(filmDoc);

    // Revalidate the films pages
    revalidatePath("/films");
    revalidatePath("/films/wrapped");

    return {
      success: true,
      filmId: result._id,
      message: `Added "${sanitizedTitle}" as watched`,
    };
  }
  catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return {
        success: false,
        error: "Invalid film data",
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add film",
    };
  }
}

export async function markFilmAsWatchedAction(
  filmId: string,
  dateWatched: string,
  cinemaLocation: string,
  personalRating: number,
  personalNotes?: string,
  dateAddedToWishlist?: string,
) {
  try {
    // Pre-sanitize text inputs to remove invisible characters before validation
    const cleanCinemaLocation = cinemaLocation
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, "");

    const cleanPersonalNotes = personalNotes
      ? personalNotes.trim().replace(/[\u200B-\u200D\uFEFF]/g, "")
      : "";

    // Validate and sanitize all inputs
    const validatedInput = markAsWatchedSchema.parse({
      filmId,
      dateWatched,
      cinemaLocation: cleanCinemaLocation,
      personalRating,
      personalNotes: cleanPersonalNotes,
      dateAddedToWishlist,
    });

    // Security: Verify we're only updating film documents
    const existingDoc = await writeClient.getDocument(validatedInput.filmId);
    if (!existingDoc || existingDoc._type !== "film") {
      return {
        success: false,
        error: "Unauthorized: Can only update film documents",
      };
    }

    // Sanitize text inputs
    const sanitizedCinema = sanitizeText(validatedInput.cinemaLocation);
    const sanitizedNotes = sanitizeText(validatedInput.personalNotes);

    // Update film document in Sanity
    const patchData: any = {
      status: "watched",
      dateWatched: validatedInput.dateWatched,
      cinemaLocation: sanitizedCinema,
      personalRating: validatedInput.personalRating,
      personalNotes: sanitizedNotes,
    };

    // Only update wishlist date if provided
    if (validatedInput.dateAddedToWishlist) {
      patchData.dateAddedToWishlist = validatedInput.dateAddedToWishlist;
    }

    await writeClient
      .patch(validatedInput.filmId)
      .set(patchData)
      .commit();

    // Revalidate the films pages
    revalidatePath("/films");
    revalidatePath("/films/wishlist");

    return {
      success: true,
      message: "Film marked as watched",
    };
  }
  catch (error) {
    // Handle Zod validation errors
    if (error && typeof error === "object" && "issues" in error) {
      const zodError = error as { issues: Array<{ path: string[]; message: string }> };
      const errorMessages = zodError.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
      return {
        success: false,
        error: `Validation failed: ${errorMessages}`,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update film",
    };
  }
}
