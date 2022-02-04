import * as React from "react"

import MediaPlayer from "./MediaPlayer"

import { SymblProvider } from "../../context/symbl-context"

const MeetingWindow = ({
  meetingID,
  joinState,
  localVideoTrack,
  client,
  remoteUsers,
}) => {
  /***
   * 1. If we are the only user we are the big media player
   * 3. Follow Google Meet Pattern where it uses tiles and splits it into equal tiles at all time (easier)
   */
  return (
    <div className="w-full h-full border-white rounded-md">
      {/* <SymblProvider meetingID={"meetingID"}> */}
      <div className="grid grid-cols-12">
        <div className={`col-span-${remoteUsers.length === 0 ? "12" : "6"}`}>
          <MediaPlayer
            label={joinState && localVideoTrack && `(${client.uid})`}
            videoTrack={localVideoTrack}
          ></MediaPlayer>
        </div>

        {remoteUsers.map(user => {
          return (
            <div className="col-span-6" key={user.uid}>
              <MediaPlayer
                label={`remoteVideo(${user.uid})`}
                videoTrack={user.videoTrack}
                audioTrack={user.audioTrack}
              ></MediaPlayer>
            </div>
          )
        })}
      </div>
      {/* </SymblProvider> */}
    </div>
  )
}

export default MeetingWindow
