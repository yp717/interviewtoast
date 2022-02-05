import * as React from "react"

const JoinMeetingButton = ({ onClick, value }) => {
  return (
    <button
      type="submit"
      value="Join"
      onClick={onClick}
      disabled={!value}
      className={`${
        !value && "disabled cursor-not-allowed  opacity-40"
      } btn-primary`}
    >
      Join
    </button>
  )
}

export default JoinMeetingButton
