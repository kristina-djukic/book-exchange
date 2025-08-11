import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = async (bookId) => {
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

  const addReview = async (bookId, rating, comment) => {
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

  const deleteReview = async (bookId) => {
    try {
      await axios.delete(`/books/${bookId}/reviews`, {
        withCredentials: true,
      });
      toast.success("Review deleted successfully!");
      await fetchReviews(bookId);
      return true;
    } catch (err) {
      toast.error("Failed to delete review");
      return false;
    }
  };

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    addReview,
    deleteReview,
  };
};

export default useReviews;
