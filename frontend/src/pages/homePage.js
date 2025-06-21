import React from "react";
import BookCard from "../components/bookCard";
import useHomeBooks from "../hooks/useHomeBooks";

const HomePage = () => {
  const { books, error } = useHomeBooks();

  return (
    <div className="container py-4">
      <h2 className="mb-3">Books Near You</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row gx-3 gy-4">
        {books.map((b) => (
          <div key={b.id} className="col-sm-6 col-md-4 col-lg-3">
            <BookCard
              book={{
                ...b,
                posterUsername: b.username,
                posterAvatar: b.pictureURL,
              }}
            />
          </div>
        ))}
        {books.length === 0 && (
          <p className="text-muted">No one’s shared a book in your city yet.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
