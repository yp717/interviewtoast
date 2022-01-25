import { Link } from "gatsby"
import React from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import VideoStreamPreview from "../components/prepare/VideoStreamPreview"
import Layout from "../components/root/Layout"

const Prepare = () => {
  const [streamComplete, setStreamComplete] = React.useState(false)
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    previewAudioStream,
  } = useReactMediaRecorder({
    video: true,
    askPermissionOnMount: true,
    onStop: (blobUrl, blob) => {
      console.log(blobUrl)
      setStreamComplete(true)
    },
  })
  const payload = async () => {
    console.log(mediaBlobUrl)
    // var file = new File([blob], "file_name", { lastModified: 1534584790000 });
  }

  if (!streamComplete) {
    return (
      <Layout>
        <div>
          <VideoStreamPreview stream={previewStream} />
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <div>
        <p>Recording Captured!</p>
        <video src={mediaBlobUrl} controls />
        <button onClick={payload}>Log Payload</button>
      </div>
    </Layout>
  )
}

export default Prepare
