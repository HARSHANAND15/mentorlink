import type { BookingStatus as Status } from '../../types/booking.types'

const classes: Record<Status, string> = {
  pending: 'text-bg-warning',
  confirmed: 'text-bg-primary',
  completed: 'text-bg-success',
  cancelled: 'text-bg-secondary',
}

const BookingStatus = ({ status }: { status: Status }) => (
  <span className={`badge ${classes[status]}`}>{status}</span>
)

export default BookingStatus
