import * as React from "react"

import { CopyToClipboard } from "react-copy-to-clipboard"

import { ClipboardCopyIcon } from "@heroicons/react/outline"
import StartMeetingButton from "../buttons/StartMeetingButton"
import { joinMeeting as joinMeetingFunc } from "../../utils/joinMeeting"
import { useAuth } from "../../context/auth-context"
import CopyToClipboardSuccess from "../alerts/CopyToClipboardSuccess"

import KeywordCollector from "../KeywordCollector/KeywordCollector"
import { useSessions } from "../../context/session-context"

const InterviewerFlow = () => {
  const { user } = useAuth()
  const { draftSubmission, setDraftSubmission } = useSessions()
  const [value, setValue] = React.useState("linguistic_tan")
  const [copied, setCopied] = React.useState(false)
  const [showAlert, setShowAlert] = React.useState(false)
  const [activeKeywords, setActiveKeywords] = React.useState([])

  const handleCopy = () => {
    setCopied(true)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 1000)
  }

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

          <CopyToClipboard text={value} onCopy={handleCopy}>
            <button className="flex-end hover:bg-gray-900 rounded-md px-2 py-1 md:col-span-2 text-center">
              <ClipboardCopyIcon className="w-6 h-6" />
            </button>
          </CopyToClipboard>
        </div>

        <KeywordCollector
          activeKeywords={activeKeywords}
          setActiveKeywords={setActiveKeywords}
        />

        <StartMeetingButton
          onClick={() => {
            setDraftSubmission({ ...draftSubmission, keywords: activeKeywords })
            joinMeetingFunc(user, value)
          }}
        />
      </div>

      {showAlert && (
        <CopyToClipboardSuccess
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </div>
  )
}

export default InterviewerFlow
