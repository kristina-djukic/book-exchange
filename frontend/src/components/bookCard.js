import React, { useState } from "react";
import defaultBookImage from "../assets/nobookimage.png";
import defaultAvatar from "../assets/noimage.png";
import "./bookCard.css";

const BookCard = ({ book }) => {
  const [open, setOpen] = useState(false);

  const loc = book.address
    ? `${book.address}, ${book.city}${
        book.postcode ? `, ${book.postcode}` : ""
      }`
    : `${book.city}${book.postcode ? `, ${book.postcode}` : ""}` || "—";

  return (
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

      <div className={`details p-3 ${open ? "show" : ""}`}>
        <div className="info-list mb-3">
          <div className="info-item">
            <span className="info-label">Location:</span>{" "}
            <span className="info-value">{loc}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Language:</span>{" "}
            <span className="info-value">{book.language}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Available for:</span>{" "}
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
          <small className="text-muted">Posted by {book.posterUsername}</small>
        </div>

        <button className="btn btn-primary btn-sm">Request Book</button>
      </div>
    </div>
  );
};

export default BookCard;
