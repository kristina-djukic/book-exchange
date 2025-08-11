import React, { useState, useEffect } from "react";
import AddBook from "../components/addBook";
import useBooks from "../hooks/useBooks";
import defaultBookImage from "../assets/nobookimage.png";
import "./myBooksPage.css";
import { useNavigate } from "react-router-dom";
import MyBooksList from "../components/myBooksList";

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

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === "false") navigate("/login");
  }, [isAuthenticated, navigate]);

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
          <MyBooksList
            books={books}
            editBookId={editBookId}
            editData={editData}
            handleEditChange={handleEditChange}
            defaultBookImage={defaultBookImage}
            setEditData={setEditData}
            handleEditSave={handleEditSave}
            setEditBookId={setEditBookId}
            handleEditClick={handleEditClick}
            updateAvailability={updateAvailability}
            deleteBook={deleteBook}
          />
          {books.length === 0 && (
            <p className="text-muted">You haven't posted any books yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooksPage;
