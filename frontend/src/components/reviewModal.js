import React, { useState, useEffect } from "react";
import StarRating from "./starRating";
import useReviews from "../hooks/useReviews";
import defaultAvatar from "../assets/noimage.png";
import defaultBookImage from "../assets/nobookimage.png";

const ReviewModal = ({ book, isOpen, onClose, currentUserId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showAddReview, setShowAddReview] = useState(false);
  const { reviews, loading, fetchReviews, addReview, deleteReview } =
    useReviews();

  useEffect(() => {
    if (isOpen && book) {
      fetchReviews(book.id);
      setRating(0);
      setComment("");
      setShowAddReview(false);
    }
  }, [isOpen, book]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const success = await addReview(book.id, rating, comment);
    if (success) {
      setRating(0);
      setComment("");
      setShowAddReview(false);
    }
  };

  const handleDeleteReview = async () => {
    if (window.confirm("Are you sure you want to delete your review?")) {
      await deleteReview(book.id);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const userReview = reviews.find((review) => review.user_id === currentUserId);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reviews for "{book.title}"</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <div className="review-header mb-4 p-3 bg-light rounded">
                <div className="d-flex align-items-start">
                  <img
                    src={
                      book.image ? `/uploads/${book.image}` : defaultBookImage
                    }
                    alt="Book cover"
                    style={{
                      width: "60px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                    className="me-3 rounded"
                  />
                  <div>
                    <h6 className="mb-1">{book.title}</h6>
                    <p className="text-muted mb-2">by {book.author}</p>
                    <div className="d-flex align-items-center">
                      <StarRating
                        rating={parseFloat(averageRating)}
                        readOnly
                        size="1.2rem"
                      />
                      <span className="ms-2">
                        {averageRating} ({reviews.length} review
                        {reviews.length !== 1 ? "s" : ""})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {!userReview && (
                <div className="add-review-section mb-4">
                  {!showAddReview ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowAddReview(true)}
                    >
                      Write a Review
                    </button>
                  ) : (
                    <form
                      onSubmit={handleSubmitReview}
                      className="p-3 border rounded"
                    >
                      <h6>Rate this book:</h6>
                      <div className="mb-3">
                        <StarRating
                          rating={rating}
                          onRatingChange={setRating}
                          size="1.5rem"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="comment" className="form-label">
                          Comment (optional):
                        </label>
                        <textarea
                          id="comment"
                          className="form-control"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your thoughts about this book..."
                        />
                      </div>

                      <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-success">
                          Submit Review
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setShowAddReview(false);
                            setRating(0);
                            setComment("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {userReview && (
                <div className="user-review mb-4 p-3 border rounded bg-info bg-opacity-10">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6>Your Review:</h6>
                      <StarRating rating={userReview.rating} readOnly />
                      {userReview.comment && (
                        <p className="mt-2 mb-0">{userReview.comment}</p>
                      )}
                      <small className="text-muted">
                        Posted{" "}
                        {new Date(userReview.date_posted).toLocaleDateString()}
                      </small>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={handleDeleteReview}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              <div className="reviews-list">
                <h6>All Reviews ({reviews.length})</h6>
                {loading && (
                  <div className="text-center">Loading reviews...</div>
                )}

                {reviews.length === 0 && !loading && (
                  <p className="text-muted">
                    No reviews yet. Be the first to review this book!
                  </p>
                )}

                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="review-item mb-3 p-3 border rounded"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src={
                          review.userPicture
                            ? `/uploads/${review.userPicture}`
                            : defaultAvatar
                        }
                        alt="User avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                        className="rounded-circle me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">{review.username}</h6>
                            <StarRating rating={review.rating} readOnly />
                          </div>
                          <small className="text-muted">
                            {new Date(review.date_posted).toLocaleDateString()}
                          </small>
                        </div>
                        {review.comment && (
                          <p className="mt-2 mb-0">{review.comment}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
