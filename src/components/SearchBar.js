import React from "react";

function SearchBar({ query, onChange, onToggleFavorites, showFavorites }) {
  return (
    <div className="search-bar">
      <button className="toggle-btn" onClick={onToggleFavorites}>
        {showFavorites ? "🔍 Back to Search" : "⭐ View Favorites"}
      </button>

      {!showFavorites && (
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default SearchBar;
