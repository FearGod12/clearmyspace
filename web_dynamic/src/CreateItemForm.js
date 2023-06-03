import React, { useState, useEffect } from 'react';

const CreateItemForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    price: '',
    images: '',
  });

  useEffect(() => {
    fetchCategories();
    const userId = localStorage.getItem("token");
    setFormData((prevFormData) => ({ ...prevFormData, user_id: userId }));
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/v1/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5001/api/v1/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-4">
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category_id" className="form-label">
            Category:
          </label>
          <select
            className="form-select"
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="images"
            name="images"
            value={formData.images}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Item
        </button>
      </form>
    </div>
  );
};

export default CreateItemForm;
