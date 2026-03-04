import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/spinner";
import MovieCard from "./components/MovieCard";
import { MovieDetails } from "./components/MovieDetails";

const API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2ZhYzE4MmI5ODYyYjEzYTMxOGMwMzA1YmQwM2ZmNCIsIm5iZiI6MTc0OTM4NjA1Ni4zOCwic3ViIjoiNjg0NTgzNDg0NDkwMTI4YzEzM2ZjM2YxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.RTis8kVIWBkSh7JEFpLcxVNrdbNy0HZOmNF56b1LczM";

console.log(API_KEY);

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState("");

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useDebounce(() => setdebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed To Fetch Movies");
      }

      const data = await response.json();
      console.log(data);

      if (data.response === false) {
        setErrorMessage("Failed to Fetch Movies");
        setMovieList([]);
        return;
      } else {
        setMovieList(data.results || []);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const onClick = (movie) => {
    alert(`You clicked on ${movie.title}`);
  };

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        {selectedMovieId ? (
          <MovieDetails
            movieId={selectedMovieId}
            onBack={() => setSelectedMovieId(null)}
          />
        ) : (
          <>
            <header>
              <img src="/hero.png" alt="Hero Banner" />
              <h1>
                Your Favourite <strong className="text-gradient">Movies</strong>{" "}
                Are One Click Away
              </h1>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </header>

            <section className="all-movies">
              <h2 className="mt-[40px]">All Movies</h2>
              {isLoading ? (
                <Spinner />
              ) : (
                <ul className="w-full">
                  {movieList.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => setSelectedMovieId(movie.id)}
                    />
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default App;
