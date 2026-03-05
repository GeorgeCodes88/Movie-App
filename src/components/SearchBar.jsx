import React from "react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  includeAdult,
  setIncludeAdult,
}) => {
  return (
    <>
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
      <div className="flex items-center justify-center gap-2 mt-4 select-none">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={includeAdult}
            onChange={(e) => setIncludeAdult(e.target.checked)}
          />
          <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-400">
            Include Adult Content
          </span>
        </label>
      </div>
    </>
  );
};

export default SearchBar;
