import type { FilmDetails } from "@/lib/film-api/types";

// Transform OMDb film details to match our Sanity schema
export function transformFilmDetailsForSanity(filmDetails: FilmDetails) {
  return {
    title: filmDetails.title,
    year: filmDetails.year,
    imdbId: filmDetails.imdbId,
    // Additional fields will be added in later phases when we expand the schema
    // director: filmDetails.director,
    // cast: filmDetails.cast,
    // runtime: filmDetails.runtime,
    // genre: filmDetails.genre,
    // plot: filmDetails.plot,
    // poster: filmDetails.poster,
    // certificate: filmDetails.certificate,
  };
}

// Generate a slug from film title
export function generateFilmSlug(title: string, year?: number): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();

  return year ? `${baseSlug}-${year}` : baseSlug;
}

// Format film display title with year
export function formatFilmTitle(title: string, year?: number): string {
  return year ? `${title} (${year})` : title;
}
