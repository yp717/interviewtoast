import React, { useRef, useEffect } from "react"

const VideoPreview = ({ stream }) => {
  const videoRef = useRef()

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
      className="w-full max-w-4xl h-auto mx-auto"
      autoPlay
      controls
    />
  )
}

export default VideoPreview
