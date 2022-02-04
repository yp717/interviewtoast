import * as React from "react"

import MediaPlayer from './MediaPlayer'

import { SymblProvider } from "../../context/symbl-context"

const MeetingWindow = ({
  meetingID,
  joinState,
  localVideoTrack,
  client,
  remoteUsers,
}) => {
  return (
    <div className="w-full h-full border-white rounded-md">
      <SymblProvider meetingID={meetingID}>
        <div className="player-container">
          <div className="local-player-wrapper">
            <p className="local-player-text">
              {localVideoTrack && `localTrack`}
              {/* TODO: can we get the client name in here */}
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
    </div>
  )
}

export default MeetingWindow
