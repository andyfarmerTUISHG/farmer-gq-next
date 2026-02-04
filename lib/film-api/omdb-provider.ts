import { env } from "@/app/(site)/env";

import type { FilmDetails, FilmDetailsResponse, FilmSearchResponse, FilmSearchResult } from "./types";

import { BaseFilmProvider } from "./base-provider";

// OMDb API response types
type OMDbSearchResult = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type OMDbSearchResponse = {
  Search?: OMDbSearchResult[];
  totalResults?: string;
  Response: string;
  Error?: string;
};

type OMDbDetailsResponse = {
  Title?: string;
  Year?: string;
  Director?: string;
  Actors?: string;
  Runtime?: string;
  Genre?: string;
  Plot?: string;
  Poster?: string;
  imdbRating?: string;
  Rated?: string;
  imdbID?: string;
  Response: string;
  Error?: string;
};

export class OMDbProvider extends BaseFilmProvider {
  private apiKey: string;
  private baseUrl = "https://www.omdbapi.com/";

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  private validatePosterUrl(poster: string): string | undefined {
    if (!poster || poster === "N/A" || !poster.startsWith("http")) {
      return undefined;
    }
    return poster;
  }

  async searchFilms(query: string): Promise<FilmSearchResponse> {
    try {
      const url = new URL(this.baseUrl);
      url.searchParams.set("apikey", this.apiKey);
      url.searchParams.set("s", query);

      // Log API request in development
      if (env.NODE_ENV !== "production") {
        console.warn(`[OMDb API] Search request: ${url.toString()}`);
      }
      url.searchParams.set("type", "movie");

      const response = await fetch(url.toString());
      const data: OMDbSearchResponse = await response.json();

      if (data.Response === "False") {
        return {
          results: [],
          totalResults: 0,
          error: data.Error || "No results found",
        };
      }

      const results: FilmSearchResult[] = (data.Search || []).map(item => ({
        imdbId: item.imdbID,
        title: item.Title,
        year: Number.parseInt(item.Year, 10),
        poster: this.validatePosterUrl(item.Poster),
        type: item.Type,
      }));

      return {
        results,
        totalResults: Number.parseInt(data.totalResults || "0", 10),
      };
    }
    catch (error) {
      return {
        results: [],
        totalResults: 0,
        error: error instanceof Error ? error.message : "Search failed",
      };
    }
  }

  async getFilmDetails(imdbId: string): Promise<FilmDetailsResponse> {
    try {
      const url = new URL(this.baseUrl);
      url.searchParams.set("apikey", this.apiKey);
      url.searchParams.set("i", imdbId);
      url.searchParams.set("plot", "full");

      // Log API request in development
      if (env.NODE_ENV !== "production") {
        console.warn(`[OMDb API] Details request: ${url.toString()}`);
      }

      const response = await fetch(url.toString());
      const data: OMDbDetailsResponse = await response.json();

      if (data.Response === "False") {
        return {
          film: null,
          error: data.Error || "Film not found",
        };
      }

      const film: FilmDetails = {
        imdbId: data.imdbID || imdbId,
        title: data.Title || "",
        year: Number.parseInt(data.Year || "0", 10),
        director: data.Director !== "N/A" ? data.Director : undefined,
        cast: data.Actors !== "N/A" ? data.Actors?.split(", ") : undefined,
        runtime: data.Runtime !== "N/A" ? Number.parseInt(data.Runtime || "0", 10) : undefined,
        genre: data.Genre !== "N/A" ? data.Genre?.split(", ") : undefined,
        plot: data.Plot !== "N/A" ? data.Plot : undefined,
        poster: data.Poster !== "N/A" ? data.Poster : undefined,
        imdbRating: data.imdbRating !== "N/A" ? Number.parseFloat(data.imdbRating || "0") : undefined,
        certificate: data.Rated !== "N/A" ? data.Rated : undefined,
      };

      return { film };
    }
    catch (error) {
      return {
        film: null,
        error: error instanceof Error ? error.message : "Failed to fetch film details",
      };
    }
  }

  async getFilmDetailsByTitle(title: string, year?: number): Promise<FilmDetailsResponse> {
    try {
      const url = new URL(this.baseUrl);
      url.searchParams.set("apikey", this.apiKey);
      url.searchParams.set("t", title);
      if (year) {
        url.searchParams.set("y", year.toString());
      }
      url.searchParams.set("plot", "full");

      // Log API request in development
      if (env.NODE_ENV !== "production") {
        console.warn(`[OMDb API] Title lookup request: ${url.toString()}`);
      }

      const response = await fetch(url.toString());
      const data: OMDbDetailsResponse = await response.json();

      if (data.Response === "False") {
        return {
          film: null,
          error: data.Error || "Film not found",
        };
      }

      const film: FilmDetails = {
        imdbId: data.imdbID || "",
        title: data.Title || title,
        year: Number.parseInt(data.Year || year?.toString() || "0", 10),
        director: data.Director !== "N/A" ? data.Director : undefined,
        cast: data.Actors !== "N/A" ? data.Actors?.split(", ") : undefined,
        runtime: data.Runtime !== "N/A" ? Number.parseInt(data.Runtime || "0", 10) : undefined,
        genre: data.Genre !== "N/A" ? data.Genre?.split(", ") : undefined,
        plot: data.Plot !== "N/A" ? data.Plot : undefined,
        poster: data.Poster !== "N/A" ? data.Poster : undefined,
        imdbRating: data.imdbRating !== "N/A" ? Number.parseFloat(data.imdbRating || "0") : undefined,
        certificate: data.Rated !== "N/A" ? data.Rated : undefined,
      };

      return { film };
    }
    catch (error) {
      return {
        film: null,
        error: error instanceof Error ? error.message : "Failed to fetch film details",
      };
    }
  }
}
