import * as React from "react"
import { Link } from "gatsby"
import Layout from "../../components/root/Layout"
import { useSessions } from "../../context/session-context"
import {
  VideoCameraIcon,
  ClipboardCheckIcon,
  ClipboardIcon,
  CloudDownloadIcon,
  ChatIcon,
} from "@heroicons/react/outline"
import LoadingSpinner from "../../components/root/LoadingSpinner"
import { addNewMeetingDoc } from "../../utils/dbAdapter"
import { useAuth } from "../../context/auth-context"
import { generateStats } from "../../utils/generateStats"

import SummaryNumberGrid from "../../components/stats/SummaryNumberGrid"
import KeyWordSummary from "../../components/stats/KeyWordSummary"
import Transcript from "../../components/stats/Transcript"

const Review = ({ params }) => {
  const { user } = useAuth()
  const conversationID = params[`convoID`]
  const [loadingMessage, setLoadingMessage] =
    React.useState("Checking Status...")
  const [data, setData] = React.useState(null)
  const { draftSubmission, getMeeting, refreshSessions } = useSessions()
  const magicData = getMeeting(conversationID)

  React.useEffect(() => {
    console.log(magicData)
    if (!magicData) {
      const checkForResults = async () => {
        console.log("checking for results")
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)
        const response = await fetch(`/api/conversation`, {
          signal: controller.signal,
          method: "POST",
          body: JSON.stringify({ conversationID }),
        }).catch(err => {
          return false
        })
        clearTimeout(timeoutId)
        if (response?.status === 200) {
          const data = await response.json()
          data.keywords = draftSubmission.keywords
          data.length = draftSubmission.length
          data.name = draftSubmission.name
          await addNewMeetingDoc(conversationID, data, user.uid)
          // Make a request to the email API Cloud function using the email as a param if email is verified
          try {
            if (user.emailVerified && typeof user.email !== "undefined") {
              const res = await fetch(`/api/email`, {
                method: "POST",
                body: JSON.stringify({ email: user.email }),
              })
              console.log("EMAIL!")
            }
          } catch (err) {
            console.error(err)
          }

          await refreshSessions()
          window.location.reload()
          return true
        } else {
          return false
        }
      }
      ;(async () => {
        let flag = false
        let count = 0
        while (!flag) {
          if (count < 5) {
            flag = await checkForResults()
            setLoadingMessage("Still Processing...")
          } else {
            flag = true
            setLoadingMessage("Need more Time. Come back later!")
          }
        }
      })()
    }
  }, [magicData, conversationID])

  if (!magicData?.processed) {
    return (
      <Layout>
        <LoadingSpinner text={loadingMessage} />
      </Layout>
    )
  }

  const {
    transcript,
    keywords,
    messages,
    meetingDuration,
    totalInterruptionSeconds,
    meetingTalkSeconds,
    meetingSilenceSeconds,
    talkToSilenceRatio,
    interruptionFeedback,
    talkToSilenceFeedback,
    sessionQuestions,
    questionDuration,
    topics,
    followUps,
  } = generateStats(magicData)

  return (
    <Layout title="Feedback">
      <h1 className="font-bold text-5xl mb-10 mt-14">Interview Feedback</h1>
      <div className="grid md:grid-cols-5 gap-4 text-white">
        <div className="md:col-span-5 flex flex-col space-y-4">
          <SummaryNumberGrid
            meetingDuration={meetingDuration}
            totalInterruptionSeconds={totalInterruptionSeconds}
            meetingTalkSeconds={meetingTalkSeconds}
            meetingSilenceSeconds={meetingSilenceSeconds}
            talkToSilenceRatio={talkToSilenceRatio}
          />
        </div>
        <div className="md:col-span-3 bg-gray-900 p-4 rounded h-full flex space-x-2">
          <div>
            <ClipboardIcon className="h-6 w-6 text-gray-400 block" />
          </div>
          <div>
            <p className="uppercase text-base">More Information</p>
            <div>
              {keywords && keywords.length > 0 && (
                <KeyWordSummary keywords={keywords} transcript={transcript} />
              )}
            </div>
            <p className="font-bold text-2xl">
              {interruptionFeedback} {talkToSilenceFeedback}
            </p>
          </div>
        </div>
        <div className="md:col-span-2  bg-gray-900 p-4 rounded flex space-x-2">
          <ChatIcon className="h-6 w-6 text-gray-400" />
          <Transcript transcript={messages} user={user} />
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <Link to="/dashboard" className="btn-primary">
          Return to Dashboard
        </Link>
      </div>
    </Layout>
  )
}

export default Review
