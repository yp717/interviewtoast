import * as React from "react"

import MediaPlayer from "./MediaPlayer"
import MeetingMenu from "./MeetingMenu"
import Captions from "./Captions"

import { SymblProvider } from "../../context/symbl-context"
import { useAuth } from "../../context/auth-context"

const MeetingWindow = ({
  joinState,
  localVideoTrack,
  client,
  remoteUsers,
  meetingID,
}) => {
  const { role } = useAuth()

  return (
    <div className="grid grid-cols-8 gap-4">
      <SymblProvider meetingID={"meetingID"}>
        <div
          className={`${
            role === "interviewer" ? "col-span-6" : "col-span-8"
          } w-full h-full rounded overflow-hidden`}
        >
          <div className="relative h-[600px] ">
            {remoteUsers.map(user => {
              return (
                <MediaPlayer
                  key={user.uid}
                  label={user.uid}
                  videoTrack={user.videoTrack}
                  audioTrack={user.audioTrack}
                ></MediaPlayer>
              )
            })}

            <div className="absolute bottom-0 right-0 m-2 w-56 h-[8rem] flex items-center justify-center overflow-hidden rounded">
              <MediaPlayer
                label={joinState && localVideoTrack && client.uid}
                videoTrack={localVideoTrack}
                isLittle={true}
              ></MediaPlayer>
            </div>
          </div>

          <MeetingMenu
            client={client}
            channel={meetingID}
            videoTrack={localVideoTrack}
          />
        </div>
        <div
          className={`${
            role !== "interviewer" && "hidden"
          } col-span-2 w-full h-full bg-gray-900 rounded p-1`}
        >
          <Captions />
        </div>
      </SymblProvider>
    </div>
  )
}

export default MeetingWindow
