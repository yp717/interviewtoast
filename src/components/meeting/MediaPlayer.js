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
    <div ref={container} className="w-full h-96 rounded-md relative">
      {props.label && (
        <div className="absolute bg-zinc-800 bottom-0.5 px-1 py-1 left-0.5 z-50 opacity-70 rounded-md">
          {props.label}
        </div>
      )}
    </div>
  )
}

export default MediaPlayer
