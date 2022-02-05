import * as React from "react"

import { ClipboardCopyIcon } from "@heroicons/react/outline"
import StartMeetingButton from "../buttons/StartMeetingButton"
import { joinMeeting as joinMeetingFunc } from "../../utils/joinMeeting"
import { useAuth } from "../../context/auth-context"

const InterviewerFlow = () => {
  const { user } = useAuth()
  const [value, setValue] = React.useState("linguistic_tan")
  return (
    <div>
      <div className="w-full border-b-2 mb-2 border-gray-800 group-hover:border-white pb-1">
        <p className="font-medium">Join or Create an Interview</p>
      </div>

      <div className="flex flex-col gap-4 pt-1">
        <p className="text-sm opacity-80 mb-2">
          As an interviewer, you can create an interview. Start a live interview
          and find that next candidate for your dream team!
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex bg-gray-800 rounded-md px-2 py-1">
          <p className="flex-grow font-bold text-2xl md:col-span-2 text-left">
            {value}
          </p>
          <button
            onClick={() => console.log("should copy to clipboard")}
            className="flex-end hover:bg-gray-900 rounded-md px-2 py-1 md:col-span-2 text-center"
          >
            <ClipboardCopyIcon className="w-6 h-6" />
          </button>
        </div>
        <StartMeetingButton onClick={() => joinMeetingFunc(user, value)} />
      </div>
    </div>
  )
}

export default InterviewerFlow
