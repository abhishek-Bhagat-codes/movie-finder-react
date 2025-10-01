import React from 'react';

function MovieCard({ movie, onClick }) {
  if (!movie) return null;

  return (
    <li className="movie-card cursor-pointer" onClick={onClick}>
      {/* Poster */}
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : 'src/assets/No-Poster.png'
        }
        alt={movie.title || 'No title'}
        className="w-full h-80 object-cover"
      />

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h2 className="text-lg font-semibold text-white truncate">
          {movie.title}
        </h2>

        {/* Rating, Language, Year */}
        <div className="flex items-center gap-2 text-sm text-gray-300 mt-2">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <img
              className="h-4 w-4"
              src="src/assets/star.png"
              alt="Star"
            />
            <span>{movie.vote_average?.toFixed(1)}</span>
          </div>

          <span>•</span>

          {/* Language */}
          <span className="uppercase">{movie.original_language}</span>

          <span>•</span>

          {/* Year */}
          <span>
            {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          </span>
        </div>
      </div>
    </li>
  );
}

export default MovieCard;
