import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import user from "../../data/user";
import global from "../../data/global.json";
import api from "../../api";

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
      <div className="tab-content py-5" id="myTabContent">
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
          <div className="row g-3 align-items-center mb-5">
            <div className="col-auto">
              <input
                className="form-control"
                type="text"
                value={user.firstname}
                placeholder="Firstname"
              />
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                type="text"
                value={user.lastname}
                placeholder="Firstname"
              />
            </div>
          </div>
          <button className="btn btn-lg btn-primary">Update Profile</button>
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <div className="row g-3 align-items-center mb-5">
            <div className="col-auto">
              <input
                className="form-control"
                type="text"
                value={user.email}
                placeholder="Firstname"
              />
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                type="text"
                value={user.phone}
                placeholder="Firstname"
              />
            </div>
          </div>
          <button className="btn btn-lg btn-primary">Update Contact</button>
        </div>
      </div>
    </>
  );
}

function MyListings() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    const fetch_items = async () => {
      const data = await api
        .get(`users/${user.id}/items`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          return [];
        });
      setItems(data);
    };
    fetch_items();
  }, []);

  return (
    <div className="container-fluid mb-5">
      <div className="row g-4">
        {items.map((item) => (
          <div key={item.id} className="col-lg-4 col-md-6">
            <Link to={`/items/${item.id}`} style={{ textDecoration: "none" }}>
              <div className="card">
                <div
                  className="card-img-top"
                  style={{ height: "10rem", backgroundColor: "#ddd" }}
                ></div>
                <div className="card-body">
                  <h6 className="card-title one-liner">{item.name}</h6>
                  <small className="card-text text-muted one-liner">
                    {item.description}
                  </small>
                  <div className="d-flex justify-content-between pt-2">
                    <p className="card-text one-liner">
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
