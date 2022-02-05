import React, { useRef, useEffect } from "react"

const MediaPlayer = props => {
  const container = useRef(null)
  useEffect(() => {
    if (!container.current) return
    props.videoTrack?.play(container.current)

    return () => {
      props.videoTrack?.stop()
    }
  }, [container, props.videoTrack])

  useEffect(() => {
    props.audioTrack?.play()
    return () => {
      props.audioTrack?.stop()
    }
  }, [props.audioTrack])

  return (
    <div
      ref={container}
      className={` ${
        props.isLittle ? "h-[8rem] w-56" : "h-[600px] w-full"
      } rounded-md relative`}
    >
      {props.label && (
        <div className="text-sm absolute bg-zinc-800 font-medium bottom-1 px-1 py-1 left-0.5 z-50 opacity-70 rounded-md">
          {props.label}
        </div>
      )}
    </div>
  )
}

export default MediaPlayer
