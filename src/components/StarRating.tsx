import { Star, StarHalf } from "lucide-react";

export function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center text-secondary-container" aria-label={`${rating} / 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} width={size} height={size} fill="currentColor" strokeWidth={0} />
      ))}
      {hasHalf && <StarHalf width={size} height={size} fill="currentColor" strokeWidth={0} />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} width={size} height={size} className="text-outline-variant" fill="none" strokeWidth={1.5} />
      ))}
    </div>
  );
}
