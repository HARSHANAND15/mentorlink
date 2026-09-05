interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
}

const StarRating = ({ rating, maxStars = 5, size = 'md' }: StarRatingProps) => {
  const fontSize = size === 'sm' ? '0.8rem' : size === 'lg' ? '1.3rem' : '1rem'
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = maxStars - fullStars - (hasHalf ? 1 : 0)

  return (
    <span style={{ fontSize, lineHeight: 1 }}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} style={{ color: '#f59e0b' }}>★</span>
      ))}
      {/* Half star */}
      {hasHalf && <span style={{ color: '#f59e0b', opacity: 0.6 }}>★</span>}
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} style={{ color: '#334155' }}>★</span>
      ))}
      {/* Rating number */}
      <span style={{ color: '#94a3b8', fontSize: '0.8em', marginLeft: '4px' }}>
        {rating.toFixed(1)}
      </span>
    </span>
  )
}

export default StarRating