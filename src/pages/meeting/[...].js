import * as React from "react"

import AgoraRTC from "agora-rtc-sdk-ng"

import Layout from "../../components/root/Layout"
import LoadingSpinner from "../../components/root/LoadingSpinner"
import useAgora from "../../hooks/useAgora"
import MeetingWindow from "../../components/meeting/MeetingWindow"
import { useSessions } from "../../context/session-context"

const isSSR = typeof window === "undefined"

let client = !isSSR && AgoraRTC.createClient({ codec: "h264", mode: "rtc" })

const Meeting = ({ params }) => {
  const {
    toggleAudio,
    toggleVideo,
    leave,
    localVideoTrack,
    localAudioTrack,
    join,
    joinState,
    remoteUsers,
  } = useAgora(client)
  const { draftSubmission } = useSessions()
  console.log("draftSubmission", draftSubmission)
  // Note: the tokenID could have a slash so split on index of first slash
  const allParams = params[`*`]
  const meetingID = allParams.substring(0, allParams.indexOf("/"))
  const tokenID = allParams.substring(
    allParams.indexOf("/") + 1,
    allParams.length
  )

  React.useEffect(() => {
    join(meetingID, tokenID)
  }, [meetingID, tokenID])

  // Check if they join a valid channel

  return (
    <Layout>
      {!isSSR ? (
        <MeetingWindow
          meetingID={meetingID}
          joinState={joinState}
          localVideoTrack={localVideoTrack}
          localAudioTrack={localAudioTrack}
          client={client}
          remoteUsers={remoteUsers}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
          leave={leave}
        />
      ) : (
        <LoadingSpinner text="Looking for a Window." />
      )}
    </Layout>
  )
}

export default Meeting
