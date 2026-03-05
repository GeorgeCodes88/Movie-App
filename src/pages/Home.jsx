import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/spinner";
import MovieCard from "../components/MovieCard";

const API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);

  // Debounce the search term to prevent API spam on every keystroke
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovies = async (query = "") => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const adultParam = `&include_adult=${includeAdult}`;
        const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}${adultParam}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc${adultParam}`;

        const response = await fetch(endpoint, { ...API_OPTIONS, signal });

        if (!response.ok) throw new Error("Failed To Fetch Movies");

        const data = await response.json();
        setMovieList(data.results || []);
      } catch (error) {
        // If the fetch was aborted, don't update state with an error
        if (error.name === "AbortError") return;

        console.error(`Error fetching movies: ${error}`);
        setErrorMessage("Failed to fetch movies.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies(debouncedSearchTerm);

    return () => {
      controller.abort(); // Cancel the fetch if user types again or unmounts
    };
  }, [debouncedSearchTerm, includeAdult]);

  return (
    <>
      <header>
        <img src="/hero.png" alt="Hero Banner" />
        <h1>
          Your Favourite <strong className="text-gradient">Movies</strong> Are
          One Click Away
        </h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          includeAdult={includeAdult}
          setIncludeAdult={setIncludeAdult}
        />
      </header>

      <section className="all-movies">
        <h2 className="mt-[40px]">
          {searchTerm ? `Search results for "${searchTerm}"` : "All Movies"}
        </h2>

        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : movieList.length > 0 ? (
          <ul className="w-full">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-white text-xl font-semibold">No Movies Found</p>
            <p className="text-gray-400 mt-2">
              Try searching for something else, or check your network
              connection.
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
