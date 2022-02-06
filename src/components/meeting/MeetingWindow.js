import * as React from "react"

import MediaPlayer from "./MediaPlayer"
import MeetingMenu from "./MeetingMenu"
import Captions from "./Captions"

import { useSymbl } from "../../context/symbl-context"
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
  const { symbl } = useSymbl()

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
      <div
        className={`${
          role === "interviewer" ? "col-span-6" : "col-span-8"
        } w-full h-full rounded overflow-hidden`}
      >
        <div className="relative h-[600px] ">
          <div className="absolute top-0 left-0 m-2 z-50">
            <div className="px-2 py-1 bg-purple-100 rounded-full">
              <p className="text-purple-800 text-sm">{prettifyTime(counter)}</p>
            </div>
          </div>
          {remoteUsers.length === 0 && (
            <div className="h-[600px] w-full flex items-center justify-center bg-gray-900 rounded-t">
              <p className="font-bold text-xl">Waiting for others...</p>
            </div>
          )}
          {remoteUsers.map(user => {
            return (
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 rounded-t">
                  <p className="font-bold text-xl">{user.uid}</p>
                </div>
                <div className="w-full h-full z-20 relative">
                  <MediaPlayer
                    key={user.uid}
                    label={user.uid}
                    videoTrack={user.videoTrack}
                    audioTrack={user.audioTrack}
                    toPoseNet={role === "interviewer" && user.videoTrack}
                  />
                </div>
              </div>
            )
          })}

          <div className="absolute z-40 bottom-0 right-0 m-2 w-56 h-[8rem] flex items-center justify-center overflow-hidden rounded">
            <div className="relative">
              <div className="absolute top-0 z-0 left-0 w-full h-full flex items-center justify-center bg-gray-800">
                <p className="font-bold text-sm">{client.uid}</p>
              </div>
              <div className="relative z-10">
                <MediaPlayer
                  label={joinState && localVideoTrack && client.uid}
                  videoTrack={localVideoTrack}
                  isLittle={true}
                  toPoseNet={false}
                />
              </div>
            </div>
          </div>
        </div>

        <MeetingMenu
          client={client}
          channel={meetingID}
          videoTrack={localVideoTrack}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
          leave={symbl ? leave : false}
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
    </div>
  )
}

export default MeetingWindow
