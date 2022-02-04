import * as React from "react"

import MediaPlayer from "./MediaPlayer"

import { SymblProvider } from "../../context/symbl-context"
import { CameraIcon, MicrophoneIcon } from "@heroicons/react/solid"
import { LogoutIcon } from "@heroicons/react/outline"

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

      <MeetingMenu />
      {/* </SymblProvider> */}
    </div>
  )
}

const MeetingMenu = () => {
  return (
    <div className="w-full h-18 bg-gray-900 opacity-70">
      <div className="flex flex-row items-center justify-center space-x-6 px-4">
        <ButtonWithLabelBelow
          Icon={MicrophoneIcon}
          label="Mute"
          onClick={() => console.log("Should mute")}
        />

        <ButtonWithLabelBelow
          Icon={CameraIcon}
          label="Camera"
          onClick={() => console.log("Should Turn Off Camera")}
        />

        <ButtonWithLabelBelow
          Icon={LogoutIcon}
          label="Leave"
          onClick={() => console.log("Should Leave")}
        />
      </div>
    </div>
  )
}

const ButtonWithLabelBelow = ({ Icon, label, onClick }) => {
  return (
    <button
      className="flex flex-col justify-center hover:bg-gray-600 w-16 h-14 rounded-md my-2"
      onClick={onClick}
    >
      <Icon className="w-6 h-6 mx-auto" />
      <p className="mx-auto">{label}</p>
    </button>
  )
}

export default MeetingWindow
