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

const Review = ({ params }) => {
  const conversationId = params[`convoID`]
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const checkForResults = async () => {
      const response = await fetch(
        `/api/conversation/${conversationId}/`
      ).catch(err => {
        console.error(console.error())
      })
      const newData = await response.json()
      setData(newData)
      setLoading(false)
    }
    ;(async () => {
      checkForResults()
    })()
  }, [conversationId])

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner text="Getting Data..." />
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
