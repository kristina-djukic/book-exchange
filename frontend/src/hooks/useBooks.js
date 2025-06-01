import { useState } from "react";
import axios from "axios";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const addBook = async (formData) => {
    try {
      const res = await axios.post("/books/postBook", formData, {
        withCredentials: true,
      });
      setBooks((prev) => [...prev, res.data.book]);
    } catch (err) {
      setError("Failed to add book");
    }
  };

  const fetchUserBooks = async () => {
    try {
      const res = await axios.get("/books/userBooks", {
        withCredentials: true,
      });
      setBooks(res.data);
    } catch (err) {
      setError("Failed to fetch your books");
    }
  };

  const updateBook = async (id, updatedData) => {
    try {
      const res = await axios.put(`/books/${id}`, updatedData, {
        withCredentials: true,
      });
      setBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, ...updatedData } : book
        )
      );
    } catch (err) {
      setError("Failed to update book");
    }
  };

  const updateAvailability = async (id) => {
    try {
      await axios.put(`/books/${id}/updateAvailability`, null, {
        withCredentials: true,
      });
      setBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, available: !book.available } : book
        )
      );
    } catch (err) {
      setError("Failed to change availability");
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`/books/${id}/deleteBook`, {
        withCredentials: true,
      });
      setBooks((prev) => prev.filter((book) => book.id != id));
    } catch (err) {
      setError("Failed to delete book");
    }
  };

  return {
    books,
    error,
    addBook,
    fetchUserBooks,
    updateBook,
    updateAvailability,
    deleteBook,
  };
};

export default useBooks;
