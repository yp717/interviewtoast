import * as React from "react"

import JoinMeetingButton from "../buttons/JoinMeetingButton"
import { joinMeeting as joinMeetingFunc } from "../../utils/joinMeeting"
import { useAuth } from "../../context/auth-context"

const ApplicantFlow = () => {
  const [value, setValue] = React.useState("")
  const { user } = useAuth()

  return (
    <div>
      <div className="w-full border-b-2 mb-2 border-gray-800 group-hover:border-white pb-1">
        <p className="font-medium">Join Your Interview</p>
      </div>

      <div className="flex flex-col gap-4 pt-1">
        <p className="text-sm opacity-80 mb-2">
          As an applicant, you can join your interview using the meeting code
          provided by your interviewer. Remember, it's as easy as toast. Land
          that next dream job - goodluck!
        </p>
      </div>

      {/* Need input validation on form */}

      <div className="bg-gray-900 py-4 rounded">
        <div className="flex space-x-4 w-full">
          <input
            type="text"
            onChange={e => setValue(e.target.value)}
            id="channel"
            className="flex-grow bg-white text-gray-900 border px-2 py-1.5 rounded-sm"
            placeholder="Enter Channel name"
          />
          <JoinMeetingButton
            onClick={() => joinMeetingFunc(user, value)}
            value={value}
          />
        </div>
      </div>
    </div>
  )
}

export default ApplicantFlow
