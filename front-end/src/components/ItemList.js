import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import global from "../data/global.json";
import { FaUserAlt } from "react-icons/fa";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    fetch(global.base_api + "/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="container-fluid mb-5">
      <div className="row g-4">
        {items.map((item) => (
          <div key={item.id} className="col-md-4">
            <Link to={`/items/${item.id}`} style={{ textDecoration: "none" }}>
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
                  <div className="d-flex justify-content-between pt-2">
                    <p className="card-text">
                      {global.currency} {Number(item.price).toLocaleString()}
                    </p>
                    <small className="text-muted">
                      {item.user.username}
                      <FaUserAlt
                        style={{ marginLeft: "5px", fontSize: "10px" }}
                      />
                    </small>
                  </div>
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
