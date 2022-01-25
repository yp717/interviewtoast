import React, { useEffect, useMemo } from "react"
import md5 from "md5"
import { useReactMediaRecorder } from "react-media-recorder"
import VideoStreamPreview from "../components/prepare/VideoStreamPreview"
import Layout from "../components/root/Layout"
import { useAuth } from "../context/auth-context"
import { retrieveFileURL, uploadFile } from "../utils/storageAdapter"
import { addNewSessionDoc } from "../utils/dbAdapter"
import useFocus from "../hooks/useFocus"
import { navigate } from "gatsby"

const Prepare = () => {
  const { user } = useAuth()
  const [streamComplete, setStreamComplete] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [isFocused] = useFocus()
  const [focusLost, setFocusLost] = React.useState(false)
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
    previewStream,
    clearBlobUrl,
    previewAudioStream,
  } = useReactMediaRecorder({
    video: true,
    askPermissionOnMount: true,
  })

  useEffect(() => {
    if (!isFocused) {
      console.log("focused lost")
      setFocusLost(true)
      pauseRecording()
    }
  }, [isFocused, status, setFocusLost, stopRecording])

  const upload = async () => {
    setUploading("Inspecting your video...")
    const blob = await fetch(mediaBlobUrl).then(res => res.blob())
    const videoID = md5(`${user.uid}/${Date.now()}`)
    setUploading("Uploading your video...")
    await uploadFile(blob, `${user.uid}/${videoID}.mp4`)
    setUploading("Binding it to you...")
    await addNewSessionDoc(user.uid, videoID)
    navigate("/review")
    //  const url = await retrieveFileURL(user.uid, videoID)
    // Send Url to Sybml.io
  }

  const reset = () => {
    setFocusLost(false)
    clearBlobUrl()
    setStreamComplete(false)
  }

  const renderJourney = useMemo(() => {
    if (uploading) {
      return (
        <div>
          <h2>Loading..</h2>
          <p>{uploading}</p>
        </div>
      )
    }

    if (focusLost && status === "paused") {
      return (
        <div>
          <h2>Try and stay focused.</h2>
          <p>Interview prep is at it's best when its your only focus.</p>
          <button onClick={reset}>Restart Session</button>
        </div>
      )
    }

    if (!streamComplete) {
      return (
        <div>
          <VideoStreamPreview stream={previewStream} />
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button
            onClick={() => {
              stopRecording()
              setStreamComplete(true)
            }}
          >
            Stop Recording
          </button>
        </div>
      )
    }

    return (
      <div>
        <p>Review your recording and upload if happy</p>
        <video src={mediaBlobUrl} controls />
        <button onClick={reset}>Rerecord</button>
        <button onClick={upload}>Upload</button>
      </div>
    )
  }, [
    setStreamComplete,
    streamComplete,
    previewStream,
    mediaBlobUrl,
    status,
    focusLost,
    reset,
    upload,
  ])

  return <Layout>{renderJourney}</Layout>
}

export default Prepare
