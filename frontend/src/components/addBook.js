import React, { useState } from "react";

const AddBook = () => {
  return (
    <form className="mb-4">
      <div className="mb-2">
        <label className="form-label">Title:</label>
        <input className="form-control" type="text" name="title" required />
      </div>

      <div className="mb-2">
        <label className="form-label">Author:</label>
        <input className="form-control" type="text" name="author" required />
      </div>

      <div className="mb-2">
        <label className="form-label">Description:</label>
        <textarea className="form-control" name="description" />
      </div>

      <button className="btn btn-success" type="submit">
        Post Book
      </button>
    </form>
  );
};

export default AddBook;
