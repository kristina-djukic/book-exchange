import React, { useEffect } from "react";
import BookCard from "../components/bookCard";
import useHomeBooks from "../hooks/useHomeBooks";
import { useNavigate } from "react-router-dom";
import "./homePage.css";

const HomePage = () => {
  const { books, error } = useHomeBooks();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === "false") navigate("/login");
  }, [isAuthenticated, navigate]);
  return (
    <div className="homepage-background">
      <div className="homepage-container">
        <div className="homepage-content">
          <h2 className="mb-4">Books Near You</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="homepage-results">
            <div className="row gx-3 gy-4">
              {books.map((b) => (
                <div key={b.id} className="col">
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
                <div className="col-12">
                  <p className="text-muted text-center">
                    No one's shared a book in your city yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
