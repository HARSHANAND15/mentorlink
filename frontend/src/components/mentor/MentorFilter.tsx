import type { MentorFilters } from '../../types/mentor.types'

interface MentorFilterProps {
  filters: MentorFilters
  onChange: (filters: MentorFilters) => void
}

const MentorFilter = ({ filters, onChange }: MentorFilterProps) => {
  const update = (name: keyof MentorFilters, value: string) => {
    onChange({ ...filters, [name]: value })
  }

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-6">
        <input className="form-control" placeholder="Search mentors or skills" value={filters.search} onChange={(e) => update('search', e.target.value)} />
      </div>
      <div className="col-md-3">
        <input className="form-control" placeholder="Skill" value={filters.skill} onChange={(e) => update('skill', e.target.value)} />
      </div>
      <div className="col-md-3">
        <input className="form-control" type="number" placeholder="Max rate" value={filters.maxRate} onChange={(e) => update('maxRate', e.target.value)} />
      </div>
    </div>
  )
}

export default MentorFilter
