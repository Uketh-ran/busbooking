import React, { useState } from "react";
import axios from "axios";

const CarouselAdmin = () => {
  const [formData, setFormData] = useState({
    title: "",
    offer: "",
    valid: "",
    image: "",
    bg: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/carousel", formData);
      alert("Offer submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit offer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3>Add Carousel Offer</h3>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required /><br />
      <input type="text" name="offer" placeholder="Offer Code" onChange={handleChange} required /><br />
      <input type="text" name="valid" placeholder="Validity" onChange={handleChange} required /><br />
      <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required /><br />
      <input type="text" name="bg" placeholder="Background CSS" onChange={handleChange} required /><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CarouselAdmin;
