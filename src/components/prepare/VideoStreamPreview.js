import React, { useRef, useEffect } from "react"
import usePosenet from "../../hooks/usePoseNet"

const VideoPreview = ({ stream }) => {
  const videoRef = useRef()
  const {poses} = usePosenet(videoRef)
  console.log(poses)
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
