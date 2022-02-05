import * as React from "react"
import { navigate } from "gatsby"

import ButtonWithLabelBelow from "../buttons/ButtonWithLabelBelow"

import { CameraIcon, MicrophoneIcon } from "@heroicons/react/solid"
import { LogoutIcon } from "@heroicons/react/outline"
import useAgora from "../../hooks/useAgora"
import Captions from "./Captions"
import { useAuth } from "../../context/auth-context"
import { useSymbl } from "../../context/symbl-context"

const MeetingMenu = ({ client, channel, videoTrack }) => {
  const { toggleAudio, toggleVideo, leave } = useAgora(client)

  const { role } = useAuth()
  const { getConvoID, stopSymbl } = useSymbl()

  const handleLeave = async () => {
    const convoID = await getConvoID()

    await leave(channel, videoTrack).then(() => {
      stopSymbl()

      videoTrack.stop()

      if (role === "interviewer") {
        navigate(`/feedback/${convoID}`, { replace: false })
      } else {
        navigate("/dashboard", { replace: false })
      }
    })
  }

  return (
    <div className="w-full h-18 bg-gray-900 opacity-70">
      {/* <Captions /> */}
      <div className="flex flex-row items-center justify-center space-x-6 px-4">
        <ButtonWithLabelBelow
          Icon={MicrophoneIcon}
          label="Mute"
          onClick={() => toggleAudio()}
        />

        <ButtonWithLabelBelow
          Icon={CameraIcon}
          label="Camera"
          onClick={() => toggleVideo()}
        />

        <ButtonWithLabelBelow
          Icon={LogoutIcon}
          label="Leave"
          onClick={handleLeave}
        />
      </div>
    </div>
  )
}

export default MeetingMenu
