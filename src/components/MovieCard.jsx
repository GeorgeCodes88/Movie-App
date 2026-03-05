import React, { memo } from "react";
import { Link } from "react-router";

const MovieCard = memo(
  ({
    movie: {
      title,
      vote_average,
      poster_path,
      release_date,
      original_language,
      id,
    },
  }) => {
    console.log(`MovieCard for "${title}" rendered`);
    const imgBase = "https://image.tmdb.org/t/p/";
    return (
      <Link to={`/movie/${id}`}>
        <div className="movie-card cursor-pointer">
          <img
            src={
              poster_path ? `${imgBase}w342/${poster_path}` : "/no-movie.png"
            }
            width="217"
            height="326"
            srcSet={
              poster_path
                ? `
            ${imgBase}w185${poster_path} 185w,
            ${imgBase}w342${poster_path} 342w,
            ${imgBase}w500${poster_path} 500w
          `
                : ""
            }
            sizes="(max-width: 600px) 185px, 217px"
            alt={`${title} Poster`}
            loading="lazy"
          />
          <div className="mt-4">
            <h3>{title}</h3>
            <div className="content">
              <div className="rating">
                <img src="star.svg" alt="Star Icon" />
                <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
              </div>
              <span>•</span>
              <p className="lang">{original_language}</p>
              <span>•</span>
              <p className="year">
                {release_date ? release_date.split("-")[0] : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  },
);

export default MovieCard;
