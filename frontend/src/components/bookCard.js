import React, { useState } from "react";
import defaultBookImage from "../assets/nobookimage.png";
import defaultAvatar from "../assets/noimage.png";
import "./bookCard.css";
import ReviewModal from "./reviewModal";
import useProfile from "../hooks/useProfile";

const BookCard = ({ book }) => {
  const [open, setOpen] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const { profile } = useProfile();
  const currentUserId = profile?.id;

  const loc =
    [book.address, book.city, book.postcode].filter(Boolean).join(", ") || "—";

  return (
    <>
      <div className="card book-card mb-4 shadow-sm">
        <div className="d-flex align-items-start p-3">
          <img
            src={book.image ? `/uploads/${book.image}` : defaultBookImage}
            className="cover-thumb"
            alt="cover"
          />
          <div className="flex-grow-1 ps-3">
            <h5 className="mb-1">{book.title}</h5>
            <p className="text-muted mb-2 small">{book.author}</p>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "▴ Hide details" : "▾ Show details"}
            </button>
          </div>
        </div>

        <div className={`details ${open ? "show" : ""}`}>
          <div className="info-list mb-3">
            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">{loc}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Language:</span>
              <span className="info-value">{book.language}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Available for:</span>
              <span className="info-value">{book.availability_time} days</span>
            </div>
          </div>

          <p className="card-text desc">{book.description}</p>

          <p className="status">
            <strong>Status:</strong>{" "}
            <span className={book.available ? "text-success" : "text-danger"}>
              {book.available ? "Available" : "Unavailable"}
            </span>
          </p>

          <div className="d-flex align-items-center mb-3 poster">
            <img
              src={
                book.posterAvatar
                  ? `/uploads/${book.posterAvatar}`
                  : defaultAvatar
              }
              className="poster-thumb"
              alt="poster"
            />
            <small className="text-muted">
              Posted by {book.posterUsername}
            </small>
          </div>

          <div className="btn-group">
            <button
              className={`btn btn-sm ${
                book.available ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => book.available && setOpenRequest(true)}
              disabled={!book.available}
            >
              {book.available ? "Request" : "Not Available"}
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setOpenReview(true)}
            >
              Review
            </button>
          </div>
        </div>
      </div>

      {openRequest && book.available && (
        <>
          <div className="modal-backdrop fade show" />
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Contact {book.posterUsername}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setOpenRequest(false)}
                  />
                </div>
                <div className="modal-body">
                  {book.email && (
                    <p>
                      Email:&nbsp;
                      <a href={`mailto:${book.email}`}>{book.email}</a>
                    </p>
                  )}
                  {book.phone && (
                    <p>
                      Phone:&nbsp;
                      <a href={`tel:${book.phone}`}>{book.phone}</a>
                    </p>
                  )}
                  {!book.email && !book.phone && (
                    <p className="text-muted">
                      This user hasn't shared contact details.
                    </p>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setOpenRequest(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {openReview && (
        <ReviewModal
          book={book}
          isOpen={openReview}
          onClose={() => setOpenReview(false)}
          currentUserId={currentUserId}
        />
      )}
    </>
  );
};

export default BookCard;
