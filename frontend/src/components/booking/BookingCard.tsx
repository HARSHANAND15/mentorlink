import type { IBooking } from '../../types/booking.types'
import { formatDate } from '../../utils/formatDate'
import BookingStatus from './BookingStatus'

const BookingCard = ({ booking }: { booking: IBooking }) => {
  const mentorName = booking.mentor?.user?.name || booking.mentor?.name || 'Mentor'

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div className="text-start">
            <h5 className="fw-bold mb-1">{mentorName}</h5>
            <p className="text-muted mb-2">{booking.topic}</p>
            <small className="text-muted">{formatDate(booking.date)} at {booking.slot}</small>
          </div>
          <BookingStatus status={booking.status} />
        </div>
      </div>
    </div>
  )
}

export default BookingCard
