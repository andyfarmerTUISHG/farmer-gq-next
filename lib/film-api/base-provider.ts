import type { FilmDetailsResponse, FilmSearchResponse } from "./types";

// Abstract base class for film data providers
export abstract class BaseFilmProvider {
  abstract searchFilms(query: string): Promise<FilmSearchResponse>;
  abstract getFilmDetails(imdbId: string): Promise<FilmDetailsResponse>;
  abstract getFilmDetailsByTitle(title: string, year?: number): Promise<FilmDetailsResponse>;
}
