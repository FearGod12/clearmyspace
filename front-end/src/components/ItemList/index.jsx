import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import global from "../../data/global.json";
import { FaUserAlt } from "react-icons/fa";
import "./style.css";
import SearchButton from "../../pages/Home/search";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    fetch(global.base_api + "/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data); // Initialize filteredItems with all items
      });
  }, []);

  // Function to handle search and update filteredItems
  const handleSearch = (searchQuery) => {
    if (searchQuery === "") {
      // If searchQuery is empty, display all items
      setFilteredItems(items);
    } else {
      // Filter items based on searchQuery
      const filteredResults = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filteredResults);
    }
  };

  return (
    <div className="container" style={{ marginTop: "-3em" }}>
      <SearchButton onSearch={handleSearch} />
      <div className="container-fluid mb-5" style={{ marginTop: "2em" }}>
        <div className="row g-4">
          {filteredItems.length < 1 ? (
            <div>No item found</div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <Link
                  to={{
                    pathname: `/items/${item.id}`,
                  }}
                  state={{ item: item }}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card">
                    <div
                      className="card-img-top"
                      style={{
                        height: "13rem",
                        backgroundColor: "#ddd",
                        backgroundImage: `url(${item.images})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="card-body">
                      <h6 className="card-title one-liner">{item.name}</h6>
                      <small className="card-text text-muted one-liner">
                        {item.description}
                      </small>
                      <div className="d-flex justify-content-between pt-2">
                        <p className="card-text one-liner">
                          {global.currency}{" "}
                          {Number(item.price).toLocaleString()}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
