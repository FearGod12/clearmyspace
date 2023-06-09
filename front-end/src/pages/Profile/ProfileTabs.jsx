import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../../data/user";
import global from "../../data/global.json";

export default function ProfileTab() {
  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="listing-tab"
            data-bs-toggle="tab"
            data-bs-target="#listing"
            type="button"
            role="tab"
            aria-controls="listing"
            aria-selected="true"
          >
            My Listings
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Profile
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Contact
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="listing"
          role="tabpanel"
          aria-labelledby="listing-tab"
        >
          <MyListings />
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          ...
        </div>
      </div>
    </>
  );
}

function MyListings() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    fetch(`${global.base_api}/users/${data.id}/items`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching...");
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => {
        console.error(error);
      });
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
                  <small className="card-text text-muted item-card-text">
                    {item.description}
                  </small>
                  <div className="d-flex justify-content-between pt-2">
                    <p className="card-text">
                      {global.currency} {Number(item.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
