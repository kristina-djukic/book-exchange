import { useState, useEffect } from "react";
import axios from "axios";
import useProfile from "./useProfile";
import { toast } from "react-toastify";

function useHomeBooks() {
  const { profile, error: profileError } = useProfile();
  const [books, setBooks] = useState([]);
  const [error] = useState("");

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const fetchHomeBooks = async () => {
    if (!profile) return;
    try {
      const { data } = await axios.get("/books/byCity", {
        withCredentials: true,
      });
      setBooks(data.filter((b) => b.user_id !== profile.id));
    } catch {
      toast.error("Could not load books near you");
    }
  };

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === "false") return;
    fetchHomeBooks();
    // eslint-disable-next-line
  }, [profile]);

  return {
    books,
    error: error || profileError,
  };
}

export default useHomeBooks;
