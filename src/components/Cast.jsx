import React, { useState } from "react";
import Spinner from "./spinner";
import { CastCard } from "./CastCard";
import { useFetchMovieDetails } from "../hooks/useFetchMovieDetails";

export const MovieDetailsCast = ({ movieId }) => {
  const { data, isLoading } = useFetchMovieDetails(movieId);
  const [showAll, setShowAll] = useState(false);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );

  const cast = data?.credits?.cast?.slice() || [];
  console.log(cast);

  if (cast.length === 0) return null;

  return (
    <div className="mt-10 w-full overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Top Cast</h3>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm bg-white/10 px-3 py-1 rounded-lg"
        >
          {showAll ? "Show Less" : `View All (${cast.length})`}
        </button>
      </div>
      <div
        className={`
    ${
      showAll
        ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8"
        : "flex flex-nowrap overflow-x-auto gap-6 pb-6 hide-scrollbar"
    }
  `}
      >
        {cast.map((actor) => (
          <div
            key={actor.id}
            className={showAll ? "w-full" : "flex-shrink-0 w-24 sm:w-32"}
          >
            <CastCard
              name={actor.name}
              character={actor.character}
              profile_path={actor.profile_path}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
