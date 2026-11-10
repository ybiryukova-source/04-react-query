import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";

interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<MovieSearchResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error("TMDB token is missing. Check your .env file.");
  }

  const response = await axios.get<MovieSearchResponse>(API_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}