import { Star, StarOutline } from "@material-ui/icons";

export const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div>
      {[...Array(filledStars)].map((_, index) => (
        <Star key={`filled-${index}`} style={{ fill: "gold" }} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <StarOutline
          key={`empty-${index}`}
          style={{
            fill: "gold",
          }}
        />
      ))}
    </div>
  );
};
