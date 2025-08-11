import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useSearchBooks() {
  const [books, setBooks] = useState([]);
  const [error] = useState("");
  const [loading, setLoading] = useState(false);

  const searchBooks = async (query) => {
    if (!query || query.trim() === "") {
      setBooks([]);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(
        `/books/search?query=${encodeURIComponent(query)}`,
        {
          withCredentials: true,
        }
      );
      setBooks(data);
    } catch {
      toast.error("Could not search books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setBooks([]);
  };

  return {
    books,
    error,
    loading,
    searchBooks,
    clearSearch,
  };
}

export default useSearchBooks;
