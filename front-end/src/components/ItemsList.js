import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import global from "../data/global.json";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    fetch(global.base_api + "items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="container">
      <div className="row g-4">
        {items.map((item) => (
          <div key={item.id} className="col-md-4">
            <Link to={`/item/${item.id}`} style={{ textDecoration: "none" }}> 
              <div className="card">
                <div
                  className="card-img-top"
                  style={{ height: "10rem", backgroundColor: "#ddd" }}
                ></div>
                <div className="card-body">
                  <h6 className="card-title">{item.name}</h6>
                  <small className="card-text text-muted">
                    {item.description}
                  </small>
                  <p className="card-text">
                    {global.currency} {Number(item.price).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
