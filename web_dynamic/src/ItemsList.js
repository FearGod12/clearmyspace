import React, { useEffect, useState } from 'react';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    fetch('http://localhost:5001/api/v1/items')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="container">
      <h2>Items</h2>
      <div className="row">
        {items.map(item => (
          <div key={item.id} className="col-md-4">
            <div className="card">
              <img src={item.images} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">Price: ${item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
