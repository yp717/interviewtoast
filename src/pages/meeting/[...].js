import * as React from "react"

import AgoraRTC from "agora-rtc-sdk-ng"

import Layout from "../../components/root/Layout"
import LoadingSpinner from "../../components/root/LoadingSpinner"
import MediaPlayer from "../../components/meeting/MediaPlayer"

import useAgora from "../../hooks/useAgora"
import { useAuth } from "../../context/auth-context"
import { SymblProvider } from "../../context/symbl-context"

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" })

const Meeting = ({ params }) => {
  const isSSR = typeof window === "undefined"
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
        <SymblProvider meetingID={meetingID}>
          <div className="player-container">
            <div className="local-player-wrapper">
              <p className="local-player-text">
                {localVideoTrack && `localTrack`}
                {joinState && localVideoTrack ? `(${client.uid})` : ""}
              </p>
              <MediaPlayer videoTrack={localVideoTrack}></MediaPlayer>
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
        </SymblProvider>
      ) : (
        <LoadingSpinner text="Looking for a Window." />
      )}
    </Layout>
  )
}

export default Meeting
