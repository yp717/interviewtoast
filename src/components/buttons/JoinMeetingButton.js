import * as React from "react"

const JoinMeetingButton = ({ onClick }) => {
  return (
    <button
      type="submit"
      value="Join"
      onClick={onClick}
      className="btn-primary"
    >
      Join
    </button>
  )
}

export default JoinMeetingButton
