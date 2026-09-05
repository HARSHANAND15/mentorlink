interface SlotPickerProps {
  value: string
  onChange: (slot: string) => void
}

const slots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '07:00 PM']

const SlotPicker = ({ value, onChange }: SlotPickerProps) => (
  <div className="d-flex flex-wrap gap-2">
    {slots.map((slot) => (
      <button
        className={`btn ${value === slot ? 'btn-primary' : 'btn-outline-primary'}`}
        key={slot}
        type="button"
        onClick={() => onChange(slot)}
      >
        {slot}
      </button>
    ))}
  </div>
)

export default SlotPicker
