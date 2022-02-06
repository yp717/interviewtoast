import * as React from "react"

import MediaPlayer from "./MediaPlayer"
import MeetingMenu from "./MeetingMenu"
import Captions from "./Captions"

import { SymblProvider } from "../../context/symbl-context"
import { useAuth } from "../../context/auth-context"

const MeetingWindow = ({
  joinState,
  localVideoTrack,
  localAudioTrack,
  client,
  remoteUsers,
  meetingID,
  toggleAudio,
  toggleVideo,
  leave,
}) => {
  const [counter, setCounter] = React.useState(0)
  const { role } = useAuth()

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCounter(counter + 1)
    }, [1000])
    return () => clearTimeout(timeout)
  }, [counter])

  function prettifyTime(num) {
    const seconds = (num % 60) + ""
    const minutes = Math.floor(num / 60) + ""
    return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`
  }

  return (
    <div className="grid grid-cols-8 gap-4">
      <SymblProvider meetingID={"meetingID"}>
        <div
          className={`${
            role === "interviewer" ? "col-span-6" : "col-span-8"
          } w-full h-full rounded overflow-hidden`}
        >
          <div className="relative h-[600px] ">
            <div className="absolute top-0 left-0 m-1">
              <div className="px-2 py-1 bg-purple-100 rounded-full">
                <p className="text-purple-800 text-sm">
                  {prettifyTime(counter)}
                </p>
              </div>
            </div>
            {remoteUsers.map(user => {
              return (
                <MediaPlayer
                  key={user.uid}
                  label={user.uid}
                  videoTrack={user.videoTrack}
                  audioTrack={user.audioTrack}
                  toPoseNet={role === "interviewer"}
                />
              )
            })}

            <div className="absolute bottom-0 right-0 m-2 w-56 h-[8rem] flex items-center justify-center overflow-hidden rounded">
              <MediaPlayer
                label={joinState && localVideoTrack && client.uid}
                videoTrack={localVideoTrack}
                isLittle={true}
                toPoseNet={false}
             />
            </div>
          </div>

          <MeetingMenu
            client={client}
            channel={meetingID}
            videoTrack={localVideoTrack}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            leave={leave}
            audioTrack={localAudioTrack}
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
