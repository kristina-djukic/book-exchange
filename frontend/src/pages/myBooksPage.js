import React, { useState, useEffect } from "react";
import AddBook from "../components/addBook";
import useBooks from "../hooks/useBooks";
import defaultBookImage from "../assets/nobookimage.png";
import "./myBooksPage.css";

const MyBooksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    addBook,
    fetchUserBooks,
    books,
    updateBook,
    updateAvailability,
    deleteBook,
    error,
  } = useBooks();
  const [editBookId, setEditBookId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    author: "",
    description: "",
    language: "",
    availability_time: "",
    image: null,
  });

  const handleAddBook = (bookData) => {
    addBook(bookData);
    setShowForm(false);
  };

  const handleEditClick = (book) => {
    setEditBookId(book.id);

    setEditData({
      title: book.title,

      author: book.author,

      description: book.description || "",

      language: book.language,

      availability_time: book.availability_time || "",

      image: book.image || null,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    const form = new FormData();
    form.append("title", editData.title);
    form.append("author", editData.author);
    form.append("description", editData.description);
    form.append("language", editData.language);
    form.append("availability_time", editData.availability_time);
    if (editData.image instanceof File) {
      form.append("image", editData.image);
    } else if (editData.image === null) {
      form.append("removeImage", "true");
    } else if (editData.image) {
      form.append("image", editData.image);
    }

    updateBook(editBookId, form);
    setEditBookId(null);
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  return (
    <div className="mybooks-background">
      <div className="container mt-4 bg-white bg-opacity-75 p-4 rounded">
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
                  {editBookId === book.id ? (
                    <>
                      <input
                        className="form-control mb-2"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                      />
                      <input
                        className="form-control mb-2"
                        name="author"
                        value={editData.author}
                        onChange={handleEditChange}
                      />
                      <textarea
                        className="form-control mb-2"
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                      />

                      <input
                        className="form-control mb-2"
                        name="language"
                        value={editData.language}
                        onChange={handleEditChange}
                      />

                      <input
                        className="form-control mb-2"
                        type="number"
                        name="availability_time"
                        value={editData.availability_time}
                        onChange={handleEditChange}
                        placeholder="Availability Time (days)"
                      />
                      <div className="mb-2">
                        <img
                          src={
                            editData.image instanceof File
                              ? URL.createObjectURL(editData.image)
                              : editData.image === null
                              ? defaultBookImage
                              : book.image
                              ? `/uploads/${book.image}`
                              : defaultBookImage
                          }
                          alt="Book Cover"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      {(book.image || editData.image) && (
                        <button
                          className="btn btn-danger mb-2"
                          type="button"
                          onClick={() =>
                            setEditData({ ...editData, image: null })
                          }
                        >
                          Remove Picture
                        </button>
                      )}
                      <input
                        className="form-control mb-2"
                        type="file"
                        name="image"
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            image: e.target.files[0],
                          })
                        }
                        accept="image/*"
                      />
                      <button
                        className="btn btn-success me-2"
                        onClick={handleEditSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditBookId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h5>{book.title}</h5>
                      <h6 className="text-muted">{book.author}</h6>
                      <p>{book.description}</p>
                      <div className="mb-2">
                        <img
                          src={
                            book.image
                              ? `/uploads/${book.image}`
                              : defaultBookImage
                          }
                          alt="Book Cover"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <p>
                        Book language: <strong>{book.language}</strong>
                      </p>
                      <p>
                        Available for: <strong>{book.availability_time}</strong>{" "}
                        days
                      </p>
                      <p>
                        Status:{" "}
                        <span
                          className={
                            book.available ? "text-success" : "text-danger"
                          }
                        >
                          {book.available ? "Available" : "Unavailable"}
                        </span>
                      </p>

                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => handleEditClick(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-warning me-2"
                        onClick={() => updateAvailability(book.id)}
                      >
                        {book.available ? "Mark Unavailable" : "Mark Available"}
                      </button>

                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this book?"
                            )
                          ) {
                            deleteBook(book.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {books.length === 0 && (
            <p className="text-muted">You haven't posted any books yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooksPage;
