import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/bookCard";
import useSearchBooks from "../hooks/useSearchBooks";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { books, loading, error, searchBooks } = useSearchBooks();

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

  const clearFilters = () => {
    setLocationFilter("");
    setLanguageFilter("");
    setShowUnavailable(false);
  };

  const availableCount = filteredBooks.filter(
    (book) => book.available === 1
  ).length;
  const unavailableCount = filteredBooks.filter(
    (book) => book.available === 0
  ).length;

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
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
                  <label className="form-check-label" htmlFor="showUnavailable">
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
                <div className="mt-3">
                  <small className="text-muted">
                    <div>Total results: {books.length}</div>
                    <div>Available: {availableCount}</div>
                    {unavailableCount > 0 && (
                      <div>Unavailable: {unavailableCount}</div>
                    )}
                    <div>Showing: {filteredBooks.length}</div>
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <h2 className="mb-3">
            Search Results for "{query}"
            {(locationFilter || languageFilter || showUnavailable) && (
              <small className="text-muted ms-2">
                ({filteredBooks.length} filtered results)
              </small>
            )}
          </h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row gx-3 gy-4">
            {filteredBooks.map((b) => (
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

            {filteredBooks.length === 0 && !loading && books.length > 0 && (
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
  );
};

export default SearchPage;
