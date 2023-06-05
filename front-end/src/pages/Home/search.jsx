import React from "react";

export default function SearchButton() {
  return (
    <div className="input-group mt-4 w-100">
      <input
        type="text"
        className="form-control"
        placeholder="Search Everything"
        aria-describedby="button-addon2"
      />
      <button
        className="btn btn-lg btn-outline-secondary"
        type="button"
        id="button-addon2"
      >
        Search
      </button>
    </div>
  );
}
