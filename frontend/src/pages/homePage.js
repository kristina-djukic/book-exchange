import React from "react";
import { useEffect } from "react";
import BookCard from "../components/bookCard";
import useHomeBooks from "../hooks/useHomeBooks";
import { useNavigate } from "react-router-dom";
import "./homePage.css";

const HomePage = () => {
  const { latestBooks, topRatedBooks, error } = useHomeBooks();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === "false") navigate("/login");
  }, [isAuthenticated, navigate]);

  return (
    <div className="homepage-background">
      <div className="homepage-container">
        <div className="homepage-content">
          <section className="mb-5">
            <h2 className="mb-4">Latest Books Near You</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="homepage-results">
              <div className="row gx-3 gy-4">
                {latestBooks.map((b) => (
                  <div key={`latest-${b.id}`} className="col">
                    <BookCard
                      book={{
                        ...b,
                        posterUsername: b.username,
                        posterAvatar: b.userPicture,
                      }}
                    />
                  </div>
                ))}
                {latestBooks.length === 0 && (
                  <div className="col-12">
                    <p className="text-muted text-center">
                      No recent books shared in your city yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4">Top Rated Books Near You</h2>

            <div className="homepage-results">
              <div className="row gx-3 gy-4">
                {topRatedBooks.map((b) => (
                  <div key={`toprated-${b.id}`} className="col">
                    <BookCard
                      book={{
                        ...b,
                        posterUsername: b.username,
                        posterAvatar: b.userPicture,
                      }}
                    />
                  </div>
                ))}
                {topRatedBooks.length === 0 && (
                  <div className="col-12">
                    <p className="text-muted text-center">
                      No rated books in your city yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
