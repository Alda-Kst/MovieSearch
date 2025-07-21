import React, { useState, useEffect } from "react";
import "./styles.css";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import Pagination from "./components/Pagination";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (query.trim() === "") return;
      setLoading(true);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
        );
        const data = await res.json();

        if (data.Response === "True") {
          setTotalResults(parseInt(data.totalResults));
          const detailedMovies = await Promise.all(
            data.Search.map(async (movie) => {
              const detailRes = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`
              );
              return await detailRes.json();
            })
          );
          setMovies(detailedMovies);
        } else {
          setMovies([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!showFavorites) {
      fetchMovies();
    }
  }, [query, page, showFavorites]);

  const totalPages = Math.ceil(totalResults / 10);

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);
    const updated = exists
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorited = (movie) =>
    favorites.some((fav) => fav.imdbID === movie.imdbID);

  const goToPreviousPage = () => page > 1 && setPage(page - 1);
  const goToNextPage = () => page < totalPages && setPage(page + 1);

  const displayedMovies = showFavorites ? favorites : movies;

  return (
    <div className="app">
      <h1>🎬 Movie Search App</h1>

      <SearchBar
        query={query}
        onChange={handleSearchInput}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        showFavorites={showFavorites}
      />

      {loading ? (
        <div className="spinner"></div>
      ) : displayedMovies.length > 0 ? (
        <>
          <MovieGrid
            movies={displayedMovies}
            toggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />

          {!showFavorites && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={goToPreviousPage}
              onNext={goToNextPage}
            />
          )}
        </>
      ) : (
        <p>{showFavorites ? "No favorites yet." : "No results found."}</p>
      )}
    </div>
  );
}

export default App;
