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
      className="video-player w-full h-96 rounded-md"
      // style={{ width: "320px", height: "240px" }}
    ></div>
  )
}

export default MediaPlayer
