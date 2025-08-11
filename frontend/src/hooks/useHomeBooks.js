import { useState, useEffect } from "react";
import axios from "axios";
import useProfile from "./useProfile";
import { toast } from "react-toastify";

function useHomeBooks() {
  const { profile, error: profileError } = useProfile();
  const [latestBooks, setLatestBooks] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [error] = useState("");

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const fetchLatestBooks = async () => {
    if (!profile) return;
    try {
      const { data } = await axios.get("/books/byCity", {
        withCredentials: true,
      });
      setLatestBooks(data.filter((b) => b.user_id !== profile.id));
    } catch {
      toast.error("Could not load latest books");
    }
  };

  const fetchTopRatedBooks = async () => {
    if (!profile) return;
    try {
      const { data } = await axios.get("/books/byRating", {
        withCredentials: true,
      });
      setTopRatedBooks(data.filter((b) => b.user_id !== profile.id));
    } catch {
      toast.error("Could not load top rated books");
    }
  };

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === "false") return;
    fetchLatestBooks();
    fetchTopRatedBooks();
    // eslint-disable-next-line
  }, [profile]);

  return {
    latestBooks,
    topRatedBooks,
    error: error || profileError,
  };
}

export default useHomeBooks;
