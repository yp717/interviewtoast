import * as React from "react"

const CreateMeetingButton = ({ onClick }) => {
  return (
    <button
      type="submit"
      value="Create"
      onClick={onClick}
      className="btn-primary"
    >
      Create
    </button>
  )
}

export default CreateMeetingButton
