import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import global from "../data/global.json";

const ItemPreview = () => {
  const { itemId } = useParams(); // Retrieve the item ID from the URL parameter
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sellerContact, setSellerContact] = useState("");

  useEffect(() => {
    // Fetch the item details from the API based on the item ID
    fetch(`${global.base_api}/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => setItem(data));
  }, [itemId]);

  useEffect(() => {
    // Fetch the reviews of the seller based on the user ID
    if (item && item.user_id) {
      fetch(`${global.base_api}/users/${item.user_id}/reviews`)
        .then((response) => response.json())
        .then((data) => setReviews(data));
    }
  }, [item]);

  useEffect(() => {
    // Fetch the seller's contact information based on the user ID
    if (item && item.user_id) {
      fetch(`${global.base_api}/users/${item.user_id}`)
        .then((response) => response.json())
        .then((data) => setSellerContact(data.contact));
    }
  }, [item]);

  if (!item) {
    return <div>Loading...</div>; // Display a loading message while fetching the item
  }

  const handleAddToCart = () => {
    //
    console.log("Item added to cart:", item);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <p className="card-text">
            Price: {global.currency} {Number(item.price).toLocaleString()}
          </p>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h5>Reviews</h5>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.body}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>

      <div className="mt-4">
        <h5>Seller Contact</h5>
        <p>{sellerContact}</p>
      </div>
    </div>
  );
};

export default ItemPreview;
