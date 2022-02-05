import React, { useRef, useEffect } from "react"
import { useSessions } from "../../context/session-context"
import usePosenet from "../../hooks/usePoseNet"

// 1. detect posture
// 2. detect facing camera
const VideoPreview = ({ stream }) => {
  const videoRef = useRef()
  usePosenet(videoRef)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  if (!stream) {
    return null
  }

  return (
    <video
      ref={videoRef}
      id="video-stream"
      className="w-full max-w-4xl h-auto mx-auto rounded-lg"
      autoPlay
    />
  )
}

export default VideoPreview
