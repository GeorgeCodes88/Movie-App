import React, { memo, useState } from "react";
import { AdultFilter } from "./Filter";

const SearchBar = memo(({ setSearchTerm, includeAdult, setIncludeAdult }) => {
  console.log("SearchBar component rendered");
  const [localValue, setLocalValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    setSearchTerm(value);
  };
  return (
    <>
      <div className="search">
        <div className="div">
          <img src="search.svg" alt="Search" />
          <input
            type="text"
            placeholder="Search For Your Favourite Movie"
            value={localValue}
            onChange={handleChange}
          />
        </div>
      </div>
      <AdultFilter
        includeAdult={includeAdult}
        setIncludeAdult={setIncludeAdult}
      />
    </>
  );
});

export default SearchBar;
