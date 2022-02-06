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

  return (
    <Layout>
      <div className="grid grid-cols-5 gap-4 text-white">
        <div className="col-span-3 rounded"></div>
        <div className="col-span-2 flex flex-col space-y-4">
          <div className="bg-gray-700 p-4 rounded flex space-x-2 relative">
            <VideoCameraIcon className="h-6 w-6 text-gray-400" />
            <div className="flex justify-between w-full">
              {/* <div>
                <p className="font-bold text-lg">
                  {" "}
                  {name.split("_").join(" ")}
                </p>
                <p className="text-sm text-gray-300 uppercase">
                  {date.toISOString().split("T")[0]} |{" "}
                  {Math.ceil(length / 1000)} second duration{" "}
                </p>
              </div> */}
              {/* <a
                className="my-auto mr-2"
                target="_blank"
                rel="noopener noreferrer"
                download={`${name}.mp4`}
                href={url}
              >
                <CloudDownloadIcon className="h-6 w-6 text-gray-300 hover:text-orange-400" />
              </a> */}
            </div>
          </div>
          <div className="bg-gray-700 p-4 rounded h-full flex space-x-2">
            <ClipboardCheckIcon className="h-6 w-6 text-gray-400" />
            <div>
              <p className="font-bold text-lg">Summary of Findings</p>
            </div>
          </div>
        </div>
        <div className="col-span-5 bg-gray-700 p-4 rounded h-32 flex space-x-2">
          <ClipboardIcon className="h-6 w-6 text-gray-400" />
          <div>
            <p className="font-bold text-lg">Detailed Breakdown</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Review
