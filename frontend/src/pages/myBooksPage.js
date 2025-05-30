import React from "react";
import AddBook from "../components/addBook";
import { useState } from "react";

const MyBooksPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mt-4">
      <h2>My Books</h2>
      <button
        className="btn btn-primary my-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add a New Book"}
      </button>

      {showForm && <AddBook />}

      <h4>Your Posted Books</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5>Book Title</h5>
              <h6 className="text-muted">Author Name</h6>
              <p>Short description...</p>
              <p>
                Status: <span className="text-success">Available</span>
              </p>
              <button className="btn btn-outline-warning me-2">
                Mark Unavailable
              </button>
              <button className="btn btn-outline-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooksPage;
