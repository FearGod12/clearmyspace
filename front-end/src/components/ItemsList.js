import React, { useEffect, useState } from "react";
import global from "../data/global.json";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    fetch("http://localhost:5001/api/v1/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card">
              <img src={item.images} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h6 className="card-title">{item.name}</h6>
                <small className="card-text">{item.description}</small>
                <p className="card-text">
                  {global.currency}
                  {Number(item.price).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
