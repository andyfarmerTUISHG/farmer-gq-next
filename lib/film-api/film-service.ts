import { env } from "@/app/(site)/env";

import type { BaseFilmProvider } from "./base-provider";

import { OMDbProvider } from "./omdb-provider";

// Main service that uses the current provider
class FilmService {
  private provider: BaseFilmProvider;

  constructor(provider: BaseFilmProvider) {
    this.provider = provider;
  }

  // Switch provider if needed (for future flexibility)
  setProvider(provider: BaseFilmProvider) {
    this.provider = provider;
  }

  async searchFilms(query: string) {
    return this.provider.searchFilms(query);
  }

  async getFilmDetails(imdbId: string) {
    return this.provider.getFilmDetails(imdbId);
  }

  async getFilmDetailsByTitle(title: string, year?: number) {
    return this.provider.getFilmDetailsByTitle(title, year);
  }
}

// Create and export the service instance
function createFilmService(): FilmService | null {
  // Check if OMDb API key is available
  if (!env.OMDB_API_KEY) {
    console.warn("OMDB_API_KEY not available - film service disabled");
    return null;
  }
  
  const omdbProvider = new OMDbProvider(env.OMDB_API_KEY);
  return new FilmService(omdbProvider);
}

export const filmService = createFilmService();
