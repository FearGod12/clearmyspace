import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import global from "../data/global.json";

const CreateItemForm = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    price: "",
    images: null, // Use null instead of an empty string
  });

  useEffect(() => {
    fetchCategories();
    const user = JSON.parse(localStorage.getItem("user"));
    setFormData((prevFormData) => ({ ...prevFormData, user_id: user.id }));
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(global.base_api + "categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle file input separately
    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0], // Store the file object instead of the fake path
      }));
      console.log(files[0]);
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataWithImage = new FormData();
    formDataWithImage.append("image", formData.images);
    formDataWithImage.append("name", formData.name);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("category_id", formData.category_id);
    formDataWithImage.append("price", formData.price);
  
    try {
      const response = await fetch(global.base_api + "items", {
        method: "POST",
        body: formDataWithImage,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Item created");
        navigate("/");
      } else {
        throw new Error("Error creating item");
      }
    } catch (error) {
      console.log(error);
      alert("Error creating item");
    }
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
