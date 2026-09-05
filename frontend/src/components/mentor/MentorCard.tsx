import { Link } from 'react-router-dom'
import type { IMentor } from '../../types/mentor.types'
import { formatCurrency } from '../../utils/formatCurrency'
import StarRating from '../common/StarRating'

interface MentorCardProps {
  mentor: IMentor
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  const name = mentor.user?.name || mentor.name || 'MentorLink Mentor'

  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="avatar-circle">{name.charAt(0).toUpperCase()}</div>
          <div className="text-start">
            <h5 className="mb-1 fw-bold">{name}</h5>
            <p className="text-muted small mb-0">{mentor.title || 'Career Mentor'}</p>
          </div>
        </div>
        <p className="text-muted text-start flex-grow-1">
          {mentor.bio || 'Practical guidance for interviews, skills, and career decisions.'}
        </p>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {mentor.skills.slice(0, 4).map((skill) => (
            <span className="badge text-bg-light border" key={skill}>{skill}</span>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span><StarRating rating={mentor.rating || 4} /> <small className="text-muted">({mentor.totalReviews || 0})</small></span>
          <strong>{formatCurrency(mentor.hourlyRate)}/hr</strong>
        </div>
        <Link to={`/mentors/${mentor._id}`} className="btn btn-primary w-100">View Profile</Link>
      </div>
    </div>
  )
}

export default MentorCard
