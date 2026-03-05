import React, { useState, useMemo } from "react";
import Spinner from "./spinner";
import { CastList } from "./CastList";
import { useFetchMovieDetails } from "../hooks/useFetchMovieDetails";

export const MovieDetailsCast = ({ movieId }) => {
  console.log("Cast component rendered");
  const { data, isLoading } = useFetchMovieDetails(movieId);
  const [showAll, setShowAll] = useState(false);
  const cast = useMemo(() => {
    return data?.credits?.cast || [];
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );

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
        <CastList cast={cast} showAll={showAll} />
      </div>
    </div>
  );
};
