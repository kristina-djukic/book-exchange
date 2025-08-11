import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const fetchReviews = async (bookId) => {
    if (!isAuthenticated || isAuthenticated === "false") return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/books/${bookId}/reviews`, {
        withCredentials: true,
      });
      setReviews(res.data);
    } catch (err) {
      setError("Failed to fetch reviews");
      console.error("Fetch reviews error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReviews = async () => {
    if (!isAuthenticated || isAuthenticated === "false") return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/profile/reviews", {
        withCredentials: true,
      });
      setReviews(res.data);
    } catch (err) {
      setError("Failed to fetch user reviews");
      console.error("Fetch user reviews error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (bookId, rating, comment) => {
    if (!isAuthenticated || isAuthenticated === "false") return false;
    try {
      await axios.post(
        `/books/${bookId}/reviews`,
        { rating, comment },
        { withCredentials: true }
      );
      toast.success("Review added successfully!");
      await fetchReviews(bookId);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add review");
      return false;
    }
  };

  const deleteReview = async (bookId, refreshUserReviews = false) => {
    if (!isAuthenticated || isAuthenticated === "false") return false;
    try {
      await axios.delete(`/books/${bookId}/reviews`, {
        withCredentials: true,
      });
      toast.success("Review deleted successfully!");

      if (refreshUserReviews) {
        await fetchUserReviews();
      } else {
        await fetchReviews(bookId);
      }
      return true;
    } catch (err) {
      toast.error("Failed to delete review");
      return false;
    }
  };

  const updateReview = async (
    bookId,
    rating,
    comment,
    refreshUserReviews = false
  ) => {
    if (!isAuthenticated || isAuthenticated === "false") return false;
    try {
      await axios.post(
        `/books/${bookId}/reviews`,
        { rating, comment },
        { withCredentials: true }
      );
      toast.success("Review updated successfully!");

      if (refreshUserReviews) {
        await fetchUserReviews();
      } else {
        await fetchReviews(bookId);
      }
      return true;
    } catch (err) {
      toast.error("Failed to update review");
      return false;
    }
  };

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    fetchUserReviews,
    addReview,
    deleteReview,
    updateReview,
  };
};

export default useReviews;
