import * as React from "react"
import { navigate } from "gatsby"

import ButtonWithLabelBelow from "../buttons/ButtonWithLabelBelow"

import { CameraIcon, MicrophoneIcon } from "@heroicons/react/solid"
import { LogoutIcon } from "@heroicons/react/outline"
import useAgora from "../../hooks/useAgora"

const MeetingMenu = ({ client }) => {
  const { toggleAudio, toggleVideo, leave } = useAgora(client)

  const handleLeave = () => {
    navigate("/")
  }

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
          onClick={handleLeave}
        />
      </div>
    </div>
  )
}

export default MeetingMenu
