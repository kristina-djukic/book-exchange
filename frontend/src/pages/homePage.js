import React, { useEffect } from "react";
import BookCard from "../components/bookCard";
import useHomeBooks from "../hooks/useHomeBooks";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { books, error } = useHomeBooks();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === "false") navigate("/login");
  }, [isAuthenticated, navigate]);
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
                posterAvatar: b.userPicture,
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
