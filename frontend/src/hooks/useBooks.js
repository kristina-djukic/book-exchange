import { useState } from "react";
import axios from "axios";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const addBook = async (bookData) => {
    try {
      const res = await axios.post("/books/postBook", bookData);
      setBooks((prev) => [...prev, res.data.book]);
    } catch (err) {
      setError("Failed to add book");
    }
  };

  return {
    books,
    error,
    addBook,
  };
};

export default useBooks;
