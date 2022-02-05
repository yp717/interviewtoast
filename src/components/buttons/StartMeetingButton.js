import * as React from "react"

const StartMeetingButton = ({ onClick }) => {
  return (
    <button
      type="submit"
      value="submit"
      onClick={onClick}
      className="btn-primary"
    >
      Start
    </button>
  )
}

export default StartMeetingButton
