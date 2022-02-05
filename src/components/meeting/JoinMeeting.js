import * as React from "react"

import { useAuth } from "../../context/auth-context"

import InterviewerFlow from "../flow/InterviewerFlow"
import ApplicantFlow from "../flow/ApplicantFlow"

const JoinMeeting = () => {
  const { role } = useAuth()

  return (
    <div className="md:col-span-2 bg-gray-900 p-4 rounded">
      {role === "interviewer" ? <InterviewerFlow /> : <ApplicantFlow />}
    </div>
  )
}

export default JoinMeeting
