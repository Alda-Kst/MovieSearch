import React from "react";

function MovieCard({ movie, toggleFavorite, isFavorited }) {
  return (
    <div className="movie-card">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Poster"
        }
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <button
          className="fav-btn"
          onClick={() => toggleFavorite(movie)}
        >
          {isFavorited(movie) ? "⭐ Unfavorite" : "☆ Favorite"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
