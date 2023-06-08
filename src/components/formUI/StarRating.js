import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const StarRating = ({ value, onChange }) => {
  const handleStarClick = (rating) => {
    onChange(rating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= value ? "filled" : ""}`}
          onClick={() => handleStarClick(i)}
        >
          {i <= value ? <StarIcon /> : <StarBorderIcon />}
        </span>
      );
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;