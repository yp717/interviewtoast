import * as React from "react"

import AgoraRTC from "agora-rtc-sdk-ng"

import Layout from "../../components/root/Layout"
import LoadingSpinner from "../../components/root/LoadingSpinner"
import MeetingWindow from "../../components/meeting/MeetingWindow"
import MediaPlayer from "../../components/meeting/MediaPlayer"

import useAgora from "../../hooks/useAgora"

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" })

const Meeting = ({ params }) => {
  const isSSR = typeof window === "undefined"
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
  } = useAgora(client)
  // Note: the tokenID could have a slash so split on index of first slash
  const allParams = params[`*`]
  const meetingID = allParams.substring(0, allParams.indexOf("/"))
  const tokenID = allParams.substring(
    allParams.indexOf("/") + 1,
    allParams.length
  )

  React.useEffect(() => {
    console.log("should do this once ffs")
    join(meetingID, tokenID)
  }, [meetingID, tokenID])

  // Check if they join a valid channel

  return (
    <Layout>
      {!isSSR ? (
        <div className="player-container">
          <div className="local-player-wrapper">
            <p className="local-player-text">
              {localVideoTrack && `localTrack`}
              {joinState && localVideoTrack ? `(${client.uid})` : ""}
            </p>
            <MediaPlayer
              videoTrack={localVideoTrack}
            ></MediaPlayer>
          </div>
          {remoteUsers.map(user => (
            <div className="remote-player-wrapper" key={user.uid}>
              <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p>
              <MediaPlayer
                videoTrack={user.videoTrack}
                audioTrack={user.audioTrack}
              ></MediaPlayer>
            </div>
          ))}
        </div>
      ) : (
        <LoadingSpinner text="Looking for a Window." />
      )}
    </Layout>
  )
}

export default Meeting
