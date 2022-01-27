import * as React from "react"
import Layout from "../../components/root/Layout"
import { useAuth } from "../../context/auth-context"
import { useSessions } from "../../context/session-context"
import {
  VideoCameraIcon,
  ClipboardCheckIcon,
  ClipboardIcon,
  CloudDownloadIcon,
} from "@heroicons/react/outline"

const Review = ({ params }) => {
  const { user } = useAuth()
  const sessionID = params[`sessionID`]
  const { getSession } = useSessions()
  const { url, name, date, length, jobId, proccessed } = getSession(sessionID)

  React.useEffect(() => {
    // poll the thing
    // `https://api.symbl.ai/v1/job/${jobId}`
    // const processingResponse = await fetch()
    // const processingData = await processingResponse.json()
    // if(processingData) {
    // updateProcessedState(symblData)
    // }
    // refreshSessions
  }, [proccessed])

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

export default Review
