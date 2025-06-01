import React, { useState, useEffect } from "react";
import AddBook from "../components/addBook";
import useBooks from "../hooks/useBooks";

const MyBooksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { addBook, fetchUserBooks, books, error } = useBooks();

  const handleAddBook = (bookData) => {
    addBook(bookData);
    setShowForm(false);
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Books</h2>
      <button
        className="btn btn-primary my-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add a New Book"}
      </button>

      {showForm && <AddBook onAdd={handleAddBook} />}

      {error && <p className="text-danger">{error}</p>}

      <h4>Your Posted Books</h4>
      <div className="row">
        {books.map((book) => (
          <div className="col-md-6 mb-3" key={book.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5>{book.title}</h5>
                <h6 className="text-muted">{book.author}</h6>
                <p>{book.description}</p>
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
        ))}
        {books.length === 0 && (
          <p className="text-muted">You haven't posted any books yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;
