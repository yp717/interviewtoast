import * as React from "react"

import Layout from "../../components/root/Layout"
import { useSessions } from "../../context/session-context"
import {
  VideoCameraIcon,
  ClipboardCheckIcon,
  ClipboardIcon,
  CloudDownloadIcon,
} from "@heroicons/react/outline"
import LoadingSpinner from "../../components/root/LoadingSpinner"
import { addNewMeetingDoc } from "../../utils/dbAdapter"
import { useAuth } from "../../context/auth-context"
import { generateStats } from "../../utils/generateStats"

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
          await addNewMeetingDoc(conversationID, data, user.uid)
          // Make a request to the email API Cloud function using the email as a param if email is verified
          try {
            if (user.emailVerified) {
              // const res = await fetch(`/api/email`, {
              //   method: "POST",
              //   body: JSON.stringify({ email: user.email }),
              // })
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

  const { transcript, keywords } = generateStats(magicData)

  return (
    <Layout title="Feedback">
      <div className="grid grid-cols-5 gap-4 text-white">
        <div className="col-span-2 flex flex-col space-y-4">
          <div className="bg-gray-700 p-4 rounded h-full flex space-x-2">
            <ClipboardCheckIcon className="h-6 w-6 text-gray-400" />
            <div>
              <p className="uppercase text-base">Summary of Findings</p>
              {keywords && (
                <KeyWordSummary keywords={keywords} transcript={transcript} />
              )}
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-gray-700 p-4 rounded h-32 flex space-x-2">
          <ClipboardIcon className="h-6 w-6 text-gray-400" />
          <div>
            <p className="uppercase text-base">Detailed Breakdown</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Review

const KeyWordSummary = ({ keywords, transcript }) => {
  return (
    <div className="py-4 space-y-2">
      <p>
        Your keywords were mentioned{" "}
        {keywords.reduce((acc, cur) => {
          return acc + (transcript.split(cur.toLowerCase()).length - 1)
        }, 0)}{" "}
        times.
      </p>
      <div className="flex flex-wrap overflow-y-auto gap-x-3 gap-y-3">
        {keywords.length > 0 &&
          keywords.map(keyword => (
            <div className="flex items-center py-0 my-0 pr-0.5 rounded-md align-center bg-purple-100 hover:bg-purple-200">
              <span className="px-2 font-semibold text-purple-700">
                {keyword} ({transcript.split(keyword.toLowerCase()).length - 1})
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
