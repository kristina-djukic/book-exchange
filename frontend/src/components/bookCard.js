import React from "react";
import defaultBookImage from "../assets/nobookimage.png";
import defaultAvatar from "../assets/noimage.png";

export default function BookCard({ book, onRequest }) {
  return (
    <div className="card h-100">
      <img
        src={book.image ? `/uploads/${book.image}` : defaultBookImage}
        className="card-img-top"
        style={{ objectFit: "cover", height: 200 }}
        alt="cover"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{book.language}</h6>
        <p className="card-text flex-grow-1">{book.description}</p>

        <div className="d-flex align-items-center mb-2">
          <img
            src={
              book.userPicture ? `/uploads/${book.userPicture}` : defaultAvatar
            }
            className="rounded-circle me-2"
            style={{ width: 32, height: 32, objectFit: "cover" }}
            alt={book.username}
          />
          <small>{book.username}</small>
        </div>

        <p className="mb-1">
          <strong>Days:</strong> {book.availability_time}
        </p>
        <p className="mb-3">
          <strong>Status:</strong>{" "}
          <span className={book.available ? "text-success" : "text-danger"}>
            {book.available ? "Available" : "Unavailable"}
          </span>
        </p>

        <button
          className="btn btn-primary mt-auto"
          onClick={() => onRequest(book)}
        >
          Request Book
        </button>
      </div>
    </div>
  );
}
