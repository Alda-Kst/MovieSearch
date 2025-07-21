import React from "react";
import MovieCard from "./MovieCard";

function MovieGrid({ movies, toggleFavorite, isFavorited }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          toggleFavorite={toggleFavorite}
          isFavorited={isFavorited}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
