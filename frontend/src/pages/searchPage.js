import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/bookCard";
import useSearchBooks from "../hooks/useSearchBooks";
import "./searchPage.css";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { books, loading, error, searchBooks } = useSearchBooks();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const [locationFilter, setLocationFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (query) {
      searchBooks(query);
    }
  }, [query]);

  const availableFilters = useMemo(() => {
    const locations = [...new Set(books.map((book) => book.city))].sort();
    const languages = [...new Set(books.map((book) => book.language))].sort();

    return { locations, languages };
  }, [books]);

  useEffect(() => {
    let filtered = books;

    if (!showUnavailable) {
      filtered = filtered.filter((book) => book.available === 1);
    }

    if (locationFilter) {
      filtered = filtered.filter((book) => book.city === locationFilter);
    }

    if (languageFilter) {
      filtered = filtered.filter((book) => book.language === languageFilter);
    }

    setFilteredBooks(filtered);
  }, [books, locationFilter, languageFilter, showUnavailable]);

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === "false") navigate("/login");
  }, [isAuthenticated, navigate]);

  const clearFilters = () => {
    setLocationFilter("");
    setLanguageFilter("");
    setShowUnavailable(false);
  };

  if (loading) {
    return (
      <div className="search-background">
        <div className="search-container">
          <div className="search-content">
            <div className="text-center">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-background">
      <div className="search-container">
        <div className="search-content">
          <div className="row">
            <div className="col-lg-3">
              <div className="filters-sidebar">
                <div className="card filters-card">
                  <div className="card-header">
                    <h5 className="mb-0">Filters</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <select
                        className="form-select"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      >
                        <option value="">All locations</option>
                        {availableFilters.locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Language</label>
                      <select
                        className="form-select"
                        value={languageFilter}
                        onChange={(e) => setLanguageFilter(e.target.value)}
                      >
                        <option value="">All languages</option>
                        {availableFilters.languages.map((language) => (
                          <option key={language} value={language}>
                            {language}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="showUnavailable"
                          checked={showUnavailable}
                          onChange={(e) => setShowUnavailable(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="showUnavailable"
                        >
                          Show unavailable books
                        </label>
                      </div>
                    </div>

                    <button
                      className="btn btn-outline-secondary btn-sm w-100"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button>

                    {books.length > 0 && (
                      <div className="mt-3 p-2 bg-light rounded">
                        <small className="text-muted">
                          <div>Found: {books.length} books</div>
                          <div>Showing: {filteredBooks.length} books</div>
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <h2 className="mb-4">Search Results for "{query}"</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="search-results">
                <div className="row gx-3 gy-4">
                  {filteredBooks.map((b) => (
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

                  {filteredBooks.length === 0 &&
                    !loading &&
                    books.length > 0 && (
                      <div className="col-12">
                        <p className="text-muted text-center">
                          No books match your current filters.
                        </p>
                      </div>
                    )}

                  {books.length === 0 && !loading && query && (
                    <div className="col-12">
                      <p className="text-muted text-center">
                        No books found for "{query}". Try different keywords.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
