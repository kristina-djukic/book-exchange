import { useState, useEffect } from "react";
import axios from "axios";
import useProfile from "./useProfile";

function useHomeBooks() {
  const { profile, error: profileError } = useProfile();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const fetchHomeBooks = async () => {
    if (!profile) return;
    try {
      const { data } = await axios.get("/books/byCity", {
        withCredentials: true,
      });
      setBooks(data.filter((b) => b.user_id !== profile.id));
    } catch {
      setError("Could not load books near you");
    }
  };

  useEffect(() => {
    fetchHomeBooks();
    // eslint-disable-next-line
  }, [profile]);

  return {
    books,
    error: error || profileError,
  };
}

export default useHomeBooks;
