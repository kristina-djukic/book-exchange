import React from "react";

const BookCard = ({ book }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
        <p className="card-text">{book.description}</p>
        <button className="btn btn-primary">Request Book</button>
      </div>
    </div>
  );
};

export default BookCard;
