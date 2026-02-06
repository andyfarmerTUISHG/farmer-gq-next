// Base types for film data across different providers
export type FilmSearchResult = {
  imdbId: string;
  title: string;
  year: number;
  poster?: string;
  type: string;
};

export type FilmDetails = {
  imdbId: string;
  title: string;
  year: number;
  director?: string;
  cast?: string[];
  runtime?: number;
  genre?: string[];
  plot?: string;
  poster?: string;
  imdbRating?: number;
  certificate?: string;
};

export type FilmSearchResponse = {
  results: FilmSearchResult[];
  totalResults: number;
  error?: string;
};

export type FilmDetailsResponse = {
  film: FilmDetails | null;
  error?: string;
};
