import React, { useState } from "react";

export default function SearchButton({ onSearch }) {
const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery); // Invoke the onSearch prop with the search query
  };

  return (
    <div className="input-group mt-4 w-100">
      <input
        type="text"
        className="form-control"
        placeholder="Search Everything"
        aria-describedby="button-addon2"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button
        className="btn btn-lg btn-outline-secondary"
        type="button"
        id="button-addon2"
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
}
