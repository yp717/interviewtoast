import * as React from "react"

import Layout from "../../components/root/Layout"
import { useSessions } from "../../context/session-context"
import {
  VideoCameraIcon,
  ClipboardCheckIcon,
  ClipboardIcon,
  CloudDownloadIcon,
} from "@heroicons/react/outline"
import { updateProcessedState } from "../../utils/dbAdapter"
import LoadingSpinner from "../../components/root/LoadingSpinner"
import { useAuth } from "../../context/auth-context"

const ReviewWrapper = ({ params }) => {
  const sessionID = params[`sessionID`]

  const { getSession, refreshSessions } = useSessions()

  React.useEffect(() => {
    if (!getSession(sessionID)) {
      const timeout = setInterval(() => {
        refreshSessions()
      }, 1000)
      return () => clearInterval(timeout)
    }
  }, [sessionID, getSession])

  if (!getSession(sessionID)) {
    return (
      <Layout>
        <LoadingSpinner text="Finding Session" />
      </Layout>
    )
  }
  return <Review params={params} />
}

const Review = ({ params }) => {
  const sessionID = params[`sessionID`]
  const [loadingMessage, setLoadingMessage] =
    React.useState("Checking Status...")
  const { getSession, refreshSessions } = useSessions()
  const { url, name, date, length, jobId, conversationId, processed } =
    getSession(sessionID)
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
          await updateProcessedState(sessionID, data)

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

          refreshSessions()
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
  }, [processed, conversationId, jobId, refreshSessions, sessionID])

  if (!processed) {
    return (
      <Layout>
        <LoadingSpinner text={loadingMessage} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="grid grid-cols-5 gap-4 text-white">
        <div className="col-span-3 rounded">
          <video
            className="w-full h-full rounded"
            src={url}
            id="vide-preview"
            controls
          />
        </div>
        <div className="col-span-2 flex flex-col space-y-4">
          <div className="bg-gray-700 p-4 rounded flex space-x-2 relative">
            <VideoCameraIcon className="h-6 w-6 text-gray-400" />
            <div className="flex justify-between w-full">
              <div>
                <p className="font-bold text-lg">
                  {" "}
                  {name.split("_").join(" ")}
                </p>
                <p className="text-sm text-gray-300 uppercase">
                  {date.toISOString().split("T")[0]} |{" "}
                  {Math.ceil(length / 1000)} second duration{" "}
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

export default ReviewWrapper
