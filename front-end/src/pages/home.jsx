import React, { useEffect, useState } from "react";
import ItemList from "../components/ItemsList";

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="container-fluid mb-5">
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
          labore perferendis velit sit debitis eveniet neque iste error
          assumenda repudiandae? Nihil quasi accusamus dignissimos odio
          aspernatur! Consequatur rerum reprehenderit asperiores?
        </p>
      </div>
      <ItemList />
    </div>
  );
}
