import React from "react";

export const CastCard = ({ name, character, profile_path }) => {
  const imageUrl = profile_path
    ? `https://image.tmdb.org/t/p/w200${profile_path}`
    : "https://placehold.co/200x300?text=No+Image";

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="text-sm font-bold mt-3 text-white line-clamp-1 w-full px-2">
        {name}
      </h3>
      <p className="text-gray-400 text-xs line-clamp-1 w-full px-2">
        {character}
      </p>
    </div>
  );
};
