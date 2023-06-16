import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import global from "../../data/global.json";
import "./style.css";
import NotFound from "../../pages/404";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function ItemPreview(props) {
  const { itemId } = useParams(); // Retrieve the item ID from the URL parameter
  const location = useLocation();
  const { item } = location.state;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 

  // useEffect(() => {
  //   // Fetch the item details from the API based on the item ID
  //   fetch(`${global.base_api}/items/${itemId}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch item");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setItem(data);
        
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, [itemId]);

  useEffect(() => {
    // Fetch the reviews of the seller based on the user ID
    if (item && item.user_id) {
      fetch(`${global.base_api}/users/${item.user_id}/reviews`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch reviews");
          }
          return response.json();
        })
        .then((data) => {
          setReviews(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [item]);

  console.log(item.images);
  
  
  useEffect(() => {
      // Fetch the item details from the API based on the item ID
      fetch(`${global.image_url}/${item.images}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch item");
          }
          return response.json();
        })
        .then((data) => {
         const image = data;
          
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, [item.images]);
    if (loading) {
    return <div 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
      fontSize: "1.5rem",
      color: "#888",
    }}>Loading...</div>; // Display a loading message while fetching the item
  }

    if (!item){
      return <NotFound />; // Display an error message if there's an error in fetching data
    }

  return (
    <div className="container">
      <div className="row g-5">
        <div className="col-md-6">
          <div
            className="item-image card-img-top"
            style={{
              height: "35rem",
              backgroundColor: "#ddd",
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div className="col-md-6">
          <h2 className="display-6">{item.name}</h2>
          <p>
            {global.currency} {Number(item.price).toLocaleString()}
          </p>
          <p>{item.description}</p>

          <div className="mt-4">
            <div>
              <h5>Contact Seller</h5>
            </div>
            <div>
              <Link
                className="btn btn-sm btn-secondary me-2"
                to={`tel:${item.user.phone}`}
              >
                <FaPhone />
              </Link>
              <Link
                className="btn btn-sm btn-secondary me-2"
                to={`mailto:${item.user.email}?subject=Regarding ${item.name}&body=Hi, I'm interested in the item "${item.name}".`}
              >
                <FaEnvelope />
              </Link>
            </div>
          </div>
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
    </div>
  );
}
