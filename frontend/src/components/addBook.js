import React, { useState } from "react";

const AddBook = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: null,
    availability_time: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("description", formData.description);
    data.append("availability_time", formData.availability_time);
    if (formData.image) {
      data.append("image", formData.image);
    }

    onAdd(data);
    setFormData({
      title: "",
      author: "",
      description: "",
      availability_time: "",
      image: null,
    });
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label">Title:</label>
        <input
          className="form-control"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Author:</label>
        <input
          className="form-control"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Description:</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Availability (in days):</label>
        <input
          className="form-control"
          type="number"
          name="availability_time"
          value={formData.availability_time}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Upload Book Image:</label>
        <input
          className="form-control"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <button className="btn btn-success" type="submit">
        Save Book
      </button>
    </form>
  );
};

export default AddBook;
