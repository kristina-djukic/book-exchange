import React, { useState } from "react";

const AddBook = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;
    onAdd(formData);
    setFormData({ title: "", author: "", description: "" });
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

      <button className="btn btn-success" type="submit">
        Save Book
      </button>
    </form>
  );
};

export default AddBook;
