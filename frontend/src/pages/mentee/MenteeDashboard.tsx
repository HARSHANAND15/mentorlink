import { Link } from 'react-router-dom'
import BookingCard from '../../components/booking/BookingCard'
import { useAuth } from '../../context/AuthContext'
import type { IBooking } from '../../types/booking.types'

const bookings: IBooking[] = [
  { _id: 'b1', date: new Date().toISOString(), slot: '04:00 PM', topic: 'React interview preparation', status: 'confirmed', mentor: { _id: '1', name: 'Aarav Sharma', skills: ['React'], experience: 7, hourlyRate: 1800 } },
]

const MenteeDashboard = () => {
  const { user } = useAuth()

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-start">
          <h1 className="fw-bold">Hi, {user?.name}</h1>
          <p className="text-muted">Track your upcoming mentorship sessions.</p>
        </div>
        <Link className="btn btn-primary" to="/mentors">Find Mentor</Link>
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

export default MenteeDashboard
