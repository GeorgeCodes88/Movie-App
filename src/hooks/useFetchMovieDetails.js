import { API_OPTIONS } from "../App";
import { useState, useEffect } from "react";

export const useFetchMovieDetails = (movieId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!movieId) return;

    const fetchingMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`,
          API_OPTIONS,
        );

        if (!response.ok) {
          throw new Error("Failed To Fetch Movie Details");
        }

        const result = await response.json();

        console.log(result);
        setData(result);
      } catch (error) {
        console.error(`Error fetching movie details: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchingMovieDetails();
  }, [movieId]);
  return { data, isLoading };
};
