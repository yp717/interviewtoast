import * as React from "react"
import { Link } from "gatsby"
import Layout from "../../components/root/Layout"
import { useSessions } from "../../context/session-context"
import {
  VideoCameraIcon,
  ChatIcon,
  ClipboardIcon,
  CloudDownloadIcon,
} from "@heroicons/react/outline"
import { updateProcessedState } from "../../utils/dbAdapter"
import LoadingSpinner from "../../components/root/LoadingSpinner"
import Transcript from "../../components/stats/Transcript"
import KeyWordSummary from "../../components/stats/KeyWordSummary"
import SummaryNumberGrid from "../../components/stats/SummaryNumberGrid"
import { useAuth } from "../../context/auth-context"
import { generateStats } from "../../utils/generateStats"
import BigNumber from "../../components/stats/BigNumber"

const ReviewWrapper = ({ params }) => {
  const sessionID = params[`sessionID`]

  const { getSession, refreshSessions, draftSubmission } = useSessions()

  React.useEffect(() => {
    if (!getSession(sessionID)) {
      const timeout = setInterval(() => {
        refreshSessions()
      }, 1000)
      return () => clearInterval(timeout)
    }
  }, [sessionID, getSession, refreshSessions])

  if (!getSession(sessionID)) {
    return (
      <Layout>
        <LoadingSpinner text="Finding Session" />
      </Layout>
    )
  }
  return <Review params={params} draftSubmission={draftSubmission} />
}

const Review = ({ params, draftSubmission }) => {
  const sessionID = params[`sessionID`]
  const [loadingMessage, setLoadingMessage] =
    React.useState("Checking Status...")
  const { getSession, refreshSessions } = useSessions()
  const { url, name, date, length, jobId, conversationId, processed } =
    getSession(sessionID)
  const data = getSession(sessionID)

  const { user } = useAuth()

  React.useEffect(() => {
    if (!processed) {
      const checkForResults = async () => {
        console.log("checking for results")
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)
        const response = await fetch(`/api/result`, {
          signal: controller.signal,
          method: "POST",
          body: JSON.stringify({
            jobID: jobId,
            conversationID: conversationId,
          }),
        }).catch(err => {
          return false
        })
        clearTimeout(timeoutId)
        if (response?.status === 200) {
          const data = await response.json()
          await updateProcessedState(
            sessionID,
            data,
            draftSubmission.slouchPercent
          )

          // Make a request to the email API Cloud function using the email as a param if email is verified
          try {
            if (user.emailVerified) {
              const res = await fetch(`/api/email`, {
                method: "POST",
                body: JSON.stringify({ email: user.email }),
              })
              console.log(res)
            }
          } catch (err) {
            console.error(err)
          }

          await refreshSessions()
          return true
        } else {
          return false
        }
      }
      ;(async () => {
        let flag = false
        while (!flag) {
          flag = await checkForResults()
          setLoadingMessage("Still Processing...")
        }
      })()
    }
  }, [
    processed,
    conversationId,
    jobId,
    refreshSessions,
    sessionID,
    user.email,
    user.emailVerified,
  ])

  if (!processed) {
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
    slouchFeedback,
    slouchPercent,
  } = generateStats(data)

  return (
    <Layout title="Review">
      <div className="grid md:grid-cols-5 gap-4 text-white">
        <div className="md:col-span-4 row-span-2 flex flex-col space-y-4">
          <SummaryNumberGrid
            meetingDuration={meetingDuration}
            totalInterruptionSeconds={totalInterruptionSeconds}
            meetingTalkSeconds={meetingTalkSeconds}
            meetingSilenceSeconds={meetingSilenceSeconds}
            talkToSilenceRatio={talkToSilenceRatio}
          />
        </div>

        {slouchPercent && (
          <div className="md:col-span-1 row-span-2 h-full">
            <BigNumber
              number={`${slouchPercent}%`}
              text="Slouch percentage calculated with TensorflowJS PoseNet"
            />
          </div>
        )}

        <div className="md:col-span-3 flex flex-col rounded h-full">
          <div className="bg-gray-900 p-4 rounded-t flex space-x-2 relative">
            <VideoCameraIcon className="h-6 w-6 text-gray-400" />
            <div className="flex justify-between w-full">
              <div>
                <p className="uppercase text-base">{name}</p>
                <p className="text-sm text-gray-300 uppercase">
                  {date.toISOString().split("T")[0]} |{" "}
                  {Math.ceil(length / 1000)} second duration
                </p>
              </div>
              <a
                className="my-auto mr-2"
                target="_blank"
                rel="noopener noreferrer"
                download={`${name}.mp4`}
                href={url}
              >
                <CloudDownloadIcon className="h-6 w-6 text-gray-300 hover:text-orange-400" />
              </a>
            </div>
          </div>
          <video
            className="w-full h-full rounded-b"
            src={url}
            id="vide-preview"
            controls
          />
        </div>
        <div className="md:col-span-2 flex flex-col space-y-4">
          <div className="bg-gray-900 p-4 rounded h-full flex space-x-2">
            <div className="flex flex-row">
              <ChatIcon className="h-6 w-6 text-gray-400" />
            </div>
            <Transcript transcript={messages} user={user} />
          </div>
        </div>
        <div className="md:col-span-5 bg-gray-900 p-4 rounded h-full flex space-x-2">
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
              {slouchFeedback} {interruptionFeedback} {talkToSilenceFeedback}
            </p>
          </div>
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

export default ReviewWrapper
