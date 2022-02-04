import * as React from "react"

import AgoraRTC from "agora-rtc-sdk-ng"

import Layout from "../../components/root/Layout"
import LoadingSpinner from "../../components/root/LoadingSpinner"
import MediaPlayer from "../../components/meeting/MediaPlayer"

import useAgora from "../../hooks/useAgora"
import { SymblProvider } from "../../context/symbl-context"
import MeetingWindow from "../../components/meeting/MeetingWindow"
const isSSR = typeof window === "undefined"

const client = !isSSR && AgoraRTC.createClient({ codec: "h264", mode: "rtc" })

const Meeting = ({ params }) => {
  const { localVideoTrack, join, joinState, remoteUsers } = useAgora(client)
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
        client={client}
        remoteUsers={remoteUsers}
        />
      ) : (
        <LoadingSpinner text="Looking for a Window." />
      )}
    </Layout>
  )
}

export default Meeting
