import React from 'react'

function Search({ searchIn, setSearchIn, handleSearchIn, setQuery }) {
  return (
    <div className="search">
      <div>
        <img src="src/assets/search.png" alt="Search icon" />
        <input
          value={searchIn}
          onChange={(e) => setSearchIn(e.target.value)}
          type="text"
          placeholder="Search through 300+ movies online"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setQuery(searchIn);
              handleSearchIn(searchIn);
            }
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuery(searchIn);
            handleSearchIn(searchIn);
          }}
          className="text-white"
          type="submit"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default Search
