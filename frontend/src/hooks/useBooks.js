import { useState } from "react";
import axios from "axios";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const addBook = async (bookData) => {
    try {
      const res = await axios.post("/books/postBook", bookData, {
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

  return {
    books,
    error,
    addBook,
    fetchUserBooks,
  };
};

export default useBooks;
