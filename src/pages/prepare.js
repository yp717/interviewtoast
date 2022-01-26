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
import { useSessions } from "../context/session-context"
import LoadingSpinner from "../components/root/LoadingSpinner"
import clearActiveStreams from "../utils/clearActiveStreams"

const Prepare = () => {
  const { user } = useAuth()
  const [streamComplete, setStreamComplete] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [isFocused] = useFocus()
  const [focusLost, setFocusLost] = React.useState(false)
  const [dates, setDates] = React.useState([])
  const { refreshSessions } = useSessions()
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
    const length = dates[1] - dates[0]
    const blob = await fetch(mediaBlobUrl).then(res => res.blob())
    const videoID = md5(`${user.uid}/${Date.now()}`)
    setUploading("Uploading your video...")
    const url = await uploadFile(blob, `${user.uid}/${videoID}.mp4`)
    setUploading("Binding it to you...")
    await addNewSessionDoc(user.uid, videoID, length, url)
    await refreshSessions()
    navigate(`/review/${videoID}`)
  }

  const reset = () => {
    setFocusLost(false)
    clearBlobUrl()
    setStreamComplete(false)
  }
  console.log(status)

  const renderJourney = useMemo(() => {
    if (status === "acquiring_media") {
      return <LoadingSpinner text="Finding Media Devices..." />
    }
    if (uploading) {
      return <LoadingSpinner text="Uploading to Toast HQ..." />
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
          <div className="relative max-w-4xl mx-auto">
            {status === "recording" && (
              <div className="bg-red-500 animate-ping h-5 w-5 rounded-full absolute top-0 right-0 m-4 z-50"></div>
            )}
            <VideoStreamPreview stream={previewStream} />
          </div>
          <div className="w-full flex items-center justify-center space-x-2 my-4">
            {status !== "recording" ? (
              <button
                className="btn-primary"
                onClick={() => {
                  setDates([Date.now()])
                  startRecording()
                }}
              >
                Start Recording
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={() => {
                  stopRecording()
                  setStreamComplete(true)
                  setDates([dates[0], Date.now()])
                }}
              >
                Stop Recording
              </button>
            )}
          </div>
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
