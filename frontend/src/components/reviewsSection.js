import React, { useState, useEffect } from "react";
import StarRating from "./starRating";
import useReviews from "../hooks/useReviews";
import defaultBookImage from "../assets/nobookimage.png";

const ReviewsSection = () => {
  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [showAll, setShowAll] = useState(false);

  const { reviews, loading, fetchUserReviews, updateReview, deleteReview } =
    useReviews();

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const handleEditClick = (review) => {
    setEditingReview(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment || "");
  };

  const handleSaveEdit = async (bookId) => {
    if (editRating === 0) {
      alert("Please select a rating");
      return;
    }

    const success = await updateReview(bookId, editRating, editComment, true);
    if (success) {
      setEditingReview(null);
      setEditRating(0);
      setEditComment("");
    }
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditRating(0);
    setEditComment("");
  };

  const handleDeleteReview = async (bookId, bookTitle) => {
    if (
      window.confirm(
        `Are you sure you want to delete your review for "${bookTitle}"?`
      )
    ) {
      await deleteReview(bookId, true);
    }
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading reviews...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">My Reviews ({reviews.length})</h5>
        {reviews.length > 3 && (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-4">
          <p className="text-muted mb-3">
            You haven't written any reviews yet.
          </p>
          <p className="text-muted small">
            Start exploring books and share your thoughts with other readers!
          </p>
        </div>
      )}

      <div className="reviews-list">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="review-item mb-3 p-3 border rounded bg-white"
          >
            <div className="row">
              <div className="col-md-3 col-sm-4 text-center mb-3 mb-md-0">
                <img
                  src={
                    review.bookImage
                      ? `/uploads/${review.bookImage}`
                      : defaultBookImage
                  }
                  alt="Book cover"
                  className="img-fluid rounded shadow-sm"
                  style={{
                    maxHeight: "150px",
                    maxWidth: "100px",
                    objectFit: "cover",
                    border: "1px solid #ddd",
                  }}
                />
              </div>

              <div className="col-md-9 col-sm-8">
                <div className="review-content">
                  <h6 className="book-title mb-1 text-primary">
                    {review.bookTitle}
                  </h6>
                  <p className="book-author text-muted small mb-2">
                    by {review.bookAuthor}
                  </p>

                  {editingReview === review.id ? (
                    <div className="edit-review p-3 bg-light rounded border">
                      <div className="mb-3">
                        <label className="form-label small fw-bold">
                          Rating:
                        </label>
                        <div className="mt-1">
                          <StarRating
                            rating={editRating}
                            onRatingChange={setEditRating}
                            size="1.3rem"
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label small fw-bold">
                          Comment:
                        </label>
                        <textarea
                          className="form-control"
                          rows="4"
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          placeholder="Update your thoughts about this book..."
                        />
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleSaveEdit(review.book_id)}
                        >
                          Save Changes
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="view-review">
                      <div className="rating-display mb-2">
                        <StarRating
                          rating={review.rating}
                          readOnly
                          size="1.1rem"
                        />
                        <span className="ms-2 small text-muted">
                          ({review.rating}/5 stars)
                        </span>
                      </div>

                      {review.comment && (
                        <div className="review-comment mb-3 p-2 bg-light rounded">
                          <p className="mb-0 fst-italic">"{review.comment}"</p>
                        </div>
                      )}

                      <div className="review-meta d-flex justify-content-between align-items-center flex-wrap">
                        <small className="text-muted">
                          <i className="fas fa-calendar-alt me-1"></i>
                          Posted on{" "}
                          {new Date(review.date_posted).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </small>

                        <div className="review-actions mt-2 mt-sm-0">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEditClick(review)}
                          >
                            <i className="fas fa-edit me-1"></i>
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDeleteReview(
                                review.book_id,
                                review.bookTitle
                              )
                            }
                          >
                            <i className="fas fa-trash me-1"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length > 3 && !showAll && (
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowAll(true)}
          >
            Show {reviews.length - 3} More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
