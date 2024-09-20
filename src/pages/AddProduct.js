import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
  });

  const addProduct = async () => {
    const requestData = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      discountPercentage: formData.discountPercentage,
      rating: formData.rating,
      stock: formData.stock,
      brand: formData.brand,
      category: formData.category,
      thumbnail: formData.thumbnail,
    };
    console.log("inside add products");
    const apiUrl = "http://localhost:8080/api/products/";
    console.log("api url of to get specific product--- ", apiUrl);
    const response = await axios.post(apiUrl, requestData);
    console.log("response of add product api----- ", response);
    if (response?.data?.statusCode === 200) {
      toast.success(response?.data?.message);
    }
  };

  const validate = () => {
    if (formData.title.length === 0) {
      toast.success("Please Enter title");
    } else {
      addProduct();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the form data here
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="formstyle">
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <div>
            <label>Product id: </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Title: </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description: </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price: </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Discount Percentage: </label>
            <input
              type="text"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Rating: </label>
            <input
              type="text"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Stock: </label>
            <input
              type="text"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Brand: </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Category: </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Thumbnail: </label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            style={{ marginTop: "10px", cursor: "pointer" }}
            onClick={() => validate()}
          >
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
