import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div className="div">
        <img src="search.svg" alt="Search" />
        <input
          type="text"
          placeholder="Search For Your Favourite Movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
export default SearchBar;
