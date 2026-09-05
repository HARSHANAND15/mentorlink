import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SlotPicker from '../../components/mentor/SlotPicker'
import { createBookingApi } from '../../api/bookingApi'

const BookSession = () => {
  const { mentorId = '' } = useParams()
  const navigate = useNavigate()
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [topic, setTopic] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await createBookingApi({ mentorId, date, slot, topic })
      navigate('/dashboard/mentee')
    } catch {
      setError('Booking API is not available yet, but the form is ready.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 text-start">
              <h1 className="fw-bold">Book a Session</h1>
              <p className="text-muted mb-4">Choose a date, slot, and the topic you want to discuss.</p>
              {error && <div className="alert alert-warning">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Date</label>
                  <input className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Slot</label>
                  <SlotPicker value={slot} onChange={setSlot} />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Topic</label>
                  <textarea className="form-control" rows={4} value={topic} onChange={(e) => setTopic(e.target.value)} required />
                </div>
                <button className="btn btn-primary w-100" disabled={isLoading || !slot}>{isLoading ? 'Booking...' : 'Confirm Booking'}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default BookSession
