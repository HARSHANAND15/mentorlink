import BookingCard from '../../components/booking/BookingCard'
import { useAuth } from '../../context/AuthContext'
import type { IBooking } from '../../types/booking.types'

const bookings: IBooking[] = [
  { _id: 'b2', date: new Date().toISOString(), slot: '11:00 AM', topic: 'Portfolio review', status: 'pending', mentee: { _id: 'u1', name: 'Mentee' } },
]

const MentorDashboard = () => {
  const { user } = useAuth()

  return (
    <main className="container py-5">
      <div className="text-start mb-4">
        <h1 className="fw-bold">Mentor Dashboard</h1>
        <p className="text-muted">Welcome back, {user?.name}. Review session requests and profile readiness.</p>
      </div>
      <div className="row g-4 mb-4">
        <div className="col-md-4"><div className="stat-tile"><strong>1</strong><span>Pending</span></div></div>
        <div className="col-md-4"><div className="stat-tile"><strong>0</strong><span>Completed</span></div></div>
        <div className="col-md-4"><div className="stat-tile"><strong>₹0</strong><span>Earnings</span></div></div>
      </div>
      <div className="row g-4">
        {bookings.map((booking) => (
          <div className="col-lg-6" key={booking._id}>
            <BookingCard booking={booking} />
          </div>
        ))}
      </div>
    </main>
  )
}

export default MentorDashboard
