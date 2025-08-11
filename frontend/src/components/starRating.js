import React from "react";

const StarRating = ({
  rating,
  onRatingChange,
  readOnly = false,
  size = "1rem",
}) => {
  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (starValue) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  return (
    <div
      className="star-rating"
      style={{ fontSize: size, display: "inline-block" }}
    >
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? "filled" : "empty"} ${
            !readOnly ? "clickable" : ""
          }`}
          onClick={() => handleStarClick(star)}
          style={{
            color: star <= rating ? "#ffc107" : "#e4e5e9",
            cursor: !readOnly ? "pointer" : "default",
            marginRight: "0.25rem",
            transition: "color 0.2s ease",
            userSelect: "none",
          }}
          onMouseEnter={() => {
            if (!readOnly) {
            }
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
