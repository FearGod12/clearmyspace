import React, { useEffect, useState } from "react";
import ItemList from "../../components/ItemList";
import SearchButton from "./search";

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="container-fluid mb-3 text-center py-5">
        <h1 className="display-6" style={{ fontSize: "28px" }}>
          Find Your Treasure: Search & Sell on ClearMySpace!
        </h1>
        <small className="text-muted">
          Your go-to destination for selling unwanted items hassle-free.
          Declutter your life and earn some extra cash by leveraging our
          user-friendly platform. With a simple search, buyers can find the
          perfect items they've been looking for, while sellers can effortlessly
          connect with interested buyers.
        </small>
        <SearchButton />
      </div>
      <ItemList />
    </div>
  );
}
