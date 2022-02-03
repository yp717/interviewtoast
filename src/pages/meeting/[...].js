import * as React from "react"

import Layout from "../../components/root/Layout"
import LoadingSpinner from "../../components/root/LoadingSpinner"
import MeetingWindow from "../../components/meeting/MeetingWindow"

const Meeting = ({ params }) => {
  const isSSR = typeof window === "undefined"

  // Note: the tokenID could have a slash so split on index of first slash
  const allParams = params[`*`]
  const meetingID = allParams.substring(0, allParams.indexOf("/"))
  const tokenID = allParams.substring(
    allParams.indexOf("/") + 1,
    allParams.length
  )

  console.log(tokenID)

  // Check if they join a valid channel

  return (
    <Layout>
      {!isSSR ? (
        <div className="flex flex-col items-center justify-center h-full min-h-screen relative overflow-y-scroll pt-12 pb-32 md:py-0">
          <React.Suspense fallback={<div></div>}>
            <MeetingWindow meetingID={meetingID} tokenID={tokenID} />
          </React.Suspense>
        </div>
      ) : (
        <LoadingSpinner text="Looking for a Window." />
      )}
    </Layout>
  )
}

export default Meeting
