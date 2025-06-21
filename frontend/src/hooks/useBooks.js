import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [error] = useState("");

  const addBook = async (formData) => {
    try {
      const res = await axios.post("/books/postBook", formData, {
        withCredentials: true,
      });
      toast.success("Book added successfuly");
      setBooks((prev) => [...prev, res.data.book]);
    } catch (err) {
      toast.error("Failed to add book");
    }
  };

  const fetchUserBooks = async () => {
    try {
      const res = await axios.get("/books/userBooks", {
        withCredentials: true,
      });
      setBooks(res.data);
    } catch (err) {
      toast.error("Failed to fetch your books");
    }
  };

  const updateBook = async (id, updatedData) => {
    try {
      const data =
        updatedData instanceof FormData
          ? updatedData
          : (() => {
              const form = new FormData();
              Object.entries(updatedData).forEach(([key, val]) =>
                form.append(key, val)
              );
              return form;
            })();

      const res = await axios.put(`/books/${id}/updateBook`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("updateBook response:", res.data);

      const updatedBook = res.data.book;
      setBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, ...updatedBook } : book
        )
      );
    } catch (err) {
      toast.error("Failed to update book");
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
      toast.error("Failed to change availability");
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`/books/${id}/deleteBook`, {
        withCredentials: true,
      });
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      toast.error("Failed to delete book");
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
