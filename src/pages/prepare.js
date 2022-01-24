import { Link } from "gatsby";
import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import VideoStreamPreview from "../components/prepare/VideoStreamPreview";
import Layout from "../components/root/Layout";

const Prepare = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    previewAudioStream, 
  } = useReactMediaRecorder({ video: true, askPermissionOnMount: true });

  return (
    <Layout>
      <div>
        <p>{status}</p>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <video src={mediaBlobUrl} controls autoPlay loop />
        <VideoStreamPreview stream={previewStream}/>
      </div>
    </Layout>
  );
};

export default Prepare;
