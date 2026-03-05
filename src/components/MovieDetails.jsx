import React from "react";
import { useFetchMovieDetails } from "../hooks/useFetchMovieDetails";
import Spinner from "./spinner";
import { MovieDetailsCast } from "./Cast";

export const MovieDetails = ({ movieId, onBack }) => {
  const { data, isLoading } = useFetchMovieDetails(movieId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  if (!data)
    return <div className="text-white text-center mt-20">Movie not found.</div>;

  return (
    <div className="relative h-auto text-white bg-[#030712]">
      <div className="absolute inset-0 z-0 h-[500px]">
        <img
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          className="w-full h-full object-cover opacity-20 blur-sm"
          alt="background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-11">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/10 cursor-pointer"
        >
          <span>←</span> Back to Search
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
              className="w-72 md:w-80 rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-black mb-2 text-gradient tracking-tight">
              {data.title}
            </h1>

            {data.tagline && (
              <p className="text-xl italic text-gray-400 mb-6">
                "{data.tagline}"
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/30">
                <span className="font-bold">
                  ⭐ {data.vote_average?.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300">{data.runtime} min</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300">
                {data.release_date?.split("-")[0]}
              </span>
              <span className="px-2 py-0.5 rounded border border-gray-600 text-xs uppercase text-gray-400">
                {data.status}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-3">Overview</h3>
            <p className="text-gray-300 leading-relaxed text-lg max-w-2xl mb-8">
              {data.overview}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-gray-200 border border-white/10 backdrop-blur-sm">
              <div>
                <p className="text-gray-500 text-sm uppercase font-bold tracking-widest">
                  Genres
                </p>
                <p className="text-gray-200">
                  {data.genres
                    ?.map((g) => g.name)
                    .slice(0, 3)
                    .join(", ")}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase font-bold tracking-widest">
                  Budget
                </p>
                <p className="text-gray-200">
                  {data.budget > 0 ? `$${data.budget.toLocaleString()}` : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase font-bold tracking-widest">
                  Popularity
                </p>
                <p className="text-gray-200">
                  {Math.round(data.popularity)} pts
                </p>
              </div>
            </div>
          </div>
        </div>
        <MovieDetailsCast movieId={movieId} className="mt-10" />
      </div>
    </div>
  );
};
