import React, { useRef, useEffect } from "react"
import usePosenet from "../../hooks/usePoseNet"

const MediaPlayer = ({
  videoTrack,
  toPoseNet,
  audioTrack,
  isLittle,
  label,
}) => {
  const container = useRef(null)
  usePosenet(container, toPoseNet)
  useEffect(() => {
    if (!container.current) return
    videoTrack?.play(container.current)

    return () => {
      videoTrack?.stop()
    }
  }, [container, videoTrack])

  useEffect(() => {
    audioTrack?.play()
    return () => {
      audioTrack?.stop()
    }
  }, [audioTrack])

  return (
    <div
      ref={container}
      className={` ${
        isLittle ? "h-[8rem] w-56" : "h-[600px] w-full"
      } rounded-md relative`}
    >
      {label && (
        <div className="text-sm absolute bg-zinc-800 font-medium bottom-1 px-1 py-1 left-0.5 z-50 opacity-70 rounded-md">
          {label}
        </div>
      )}
    </div>
  )
}

export default MediaPlayer
