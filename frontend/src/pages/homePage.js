import React, { useState } from "react";
import useHomeBooks from "../hooks/useHomeBooks";
import BookCard from "../components/bookCard";
import "./homePage.css";

export default function HomePage() {
  const { books, error } = useHomeBooks();
  const [contactFor, setContactFor] = useState(null);

  return (
    <div className="home-background">
      <div className="home-container">
        <h1 className="mb-3">Books Near You</h1>
        {error && <p className="text-danger">{error}</p>}

        <div className="row">
          {books.map((b) => (
            <div className="col-md-4 mb-4" key={b.id}>
              <BookCard book={b} onRequest={setContactFor} />
            </div>
          ))}
        </div>

        {contactFor && (
          <div className="request-modal">
            <div className="modal-content p-4">
              <h5>Contact {contactFor.username}</h5>
              <ul>
                {contactFor.contactEmail && (
                  <li>
                    Email:{" "}
                    <a href={`mailto:${contactFor.contact_email}`}>
                      {contactFor.contact_email}
                    </a>
                  </li>
                )}
                {contactFor.contactPhone && (
                  <li>Phone: {contactFor.contact_phone}</li>
                )}
              </ul>
              <button
                className="btn btn-secondary mt-3"
                onClick={() => setContactFor(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
