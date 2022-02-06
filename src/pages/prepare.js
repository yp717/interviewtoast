import React, { useEffect, useMemo, useState } from "react"
import md5 from "md5"
import { useReactMediaRecorder } from "react-media-recorder"
import {
  CheckCircleIcon,
  FlagIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/solid"
import VideoStreamPreview from "../components/prepare/VideoStreamPreview"
import Layout from "../components/root/Layout"
import { useAuth } from "../context/auth-context"
import { uploadFile } from "../utils/storageAdapter"
import { addNewSessionDoc } from "../utils/dbAdapter"
import { navigate } from "gatsby"
import LoadingSpinner from "../components/root/LoadingSpinner"

const Prepare = () => {
  const { user } = useAuth()
  const [streamComplete, setStreamComplete] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  // const [isFocused] = useFocus()
  const [focusLost, setFocusLost] = React.useState(false)
  const [dates, setDates] = React.useState([])
  const [questions, setQuestions] = React.useState([
    "Please introduce yourself",
    "What made you apply for this role?",
    "What are your strengths?",
  ])
  const [question, setQuestion] = React.useState("")
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [questionDuration, setQuestionDuration] = React.useState(30)
  const [showCam, setShowCam] = useState(true)
  const [questionsSubmitted, setQuestionsSubmitted] = React.useState(null)
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    clearBlobUrl,
  } = useReactMediaRecorder({
    video: true,
    askPermissionOnMount: true,
  })

  const upload = async () => {
    setUploading("Inspecting your video...")
    const length = dates[1] - dates[0]
    const blob = await fetch(mediaBlobUrl).then(res => res.blob())
    const videoID = md5(`${user.uid}/${Date.now()}`)
    setUploading("Uploading your video...")
    const url = await uploadFile(blob, `${user.uid}/${videoID}.mp4`)
    setUploading("Starting Analysis...")
    const symblResponse = await fetch(`/api/analyse`, {
      method: "POST",
      body: JSON.stringify({ url }),
    })
    const symblData = await symblResponse.json()
    setUploading("Binding it to you...")
    await addNewSessionDoc(
      user.uid,
      videoID,
      length,
      url,
      symblData,
      questions,
      questionDuration
    )

    navigate(`/review/${videoID}`)
  }

  const reset = () => {
    setFocusLost(false)
    clearBlobUrl()
    setStreamComplete(false)
  }

  useEffect(() => {
    if (status === "recording") {
      const timeoutID = setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
        } else {
          stopRecording()
          setStreamComplete(true)
          setDates([dates[0], Date.now()])
        }
      }, questionDuration * 1000)
      return () => clearTimeout(timeoutID)
    }
  }, [
    status,
    currentQuestion,
    setCurrentQuestion,
    setStreamComplete,
    dates,
    stopRecording,
    questionDuration,
    questions.length,
  ])

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

    if (!questionsSubmitted) {
      return (
        <div className="flex flex-col items-center justify-center space-y-2 max-w-xl mx-auto py-6">
          <div className="bg-gray-900 rounded p-4 space-y-6">
            <div className="text-xl font-bold flex items-center space-x-1">
              <FlagIcon className="h-5 w-5" />
              <h2>Welcome to Interview Prep</h2>
            </div>
            <p>
              This is a tool that helps you prepare for interviews. Record a
              video of yourself, and then analyse it to help you find how you
              can improve.
            </p>
            <div>
              <p className="text-sm uppercase">Question Duration</p>
              <div className="flex items-center space-x-2">
                <p>Show each question for </p>
                <input
                  className="input text-white bg-gray-800 px-3 rounded w-16 border-2 border-orange-400"
                  value={questionDuration}
                  type="number"
                  onChange={e => setQuestionDuration(e.target.value)}
                />{" "}
                <p>seconds.</p>
              </div>
            </div>
            <div>
              <p className="text-sm uppercase">Questions</p>
              <div className="space-y-4">
                {questions.map((q, i) => (
                  <div className="grid grid-cols-12 mt-2 gap-1 md:w-[500px]">
                    <div className="text-right">
                      <p>{i + 1}.</p>
                    </div>
                    <div className="col-span-10 w-full flex items-center space-x-1">
                      <input
                        readOnly
                        className="input text-white bg-gray-800 px-3 rounded w-full border-2 border-orange-400"
                        value={q}
                        onChange={e => setQuestion(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setQuestions([...questions.filter((_, j) => j !== i)])
                        }}
                      >
                        <TrashIcon className="h-4 w-4 text-orange-400" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-12 mt-2 gap-1 md:w-[500px]">
                  <div />
                  <div className="col-span-10 w-full flex items-center space-x-1">
                    <input
                      className="input text-white bg-gray-800 px-3 rounded w-full border-2 border-orange-400"
                      value={question}
                      onChange={e => setQuestion(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        setQuestions([...questions, question])
                        setQuestion("")
                      }}
                    >
                      <PlusCircleIcon className="h-4 w-4 text-orange-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-sm uppercase">Settings</p>
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-orange-400 rounded"
                  checked={showCam}
                  onChange={() => setShowCam(!showCam)}
                />
                <span className="ml-2 ">See my webcam while practising</span>
              </label>
            </div>
            <button
              className="btn-primary ml-auto"
              onClick={() => setQuestionsSubmitted(true)}
            >
              Start
            </button>
          </div>
        </div>
      )
    }

    if (!streamComplete) {
      return (
        <div className="flex flex-col items-center justify-center space-y-2 max-w-4xl mx-auto relative">
          <div className="relative w-full">
            {status === "recording" && (
              <div className="bg-red-500 animate-ping h-5 w-5 rounded-full absolute top-0 right-0 m-4 z-50"></div>
            )}
            <div
              className={`${
                status === "recording"
                  ? "absolute bottom-0 right-0 m-2 w-32"
                  : ""
              }`}
            >
              {((status === "recording" && showCam) ||
                status !== "recording") && (
                <VideoStreamPreview stream={previewStream} />
              )}
            </div>
            {status === "recording" && (
              <div className="w-full h-96 bg-gray-900 text-orange-400 p-6 flex items-center text-center justify-center text-4xl md:text-6xl font-medium">
                <p>{questions[currentQuestion]}</p>
              </div>
            )}
          </div>
          <div className="rounded w-full bg-gray-900 space-y-2 flex flex-col items-center justify-center p-2">
            <p className="text-xl p-1">Ready to start the interview?</p>
            <div className="space-x-2">
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
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center space-y-2 max-w-4xl mx-auto">
        <div className="rounded bg-gray-900 overflow-hidden w-full relative ">
          <div className="absolute z-20 w-full flex items-center justify-center mt-2">
            <div className="bg-gray-900 px-2 py-1 rounded-full mx-auto flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5" />
              <p>Session Recorded</p>
            </div>
          </div>
          <video src={mediaBlobUrl} controls className="w-full z-10" />
        </div>
        <div className="rounded w-full bg-gray-900 space-y-2 flex flex-col items-center justify-center p-2">
          <p className="text-xl p-1">Ready to analyze?</p>
          <div className="space-x-2">
            <button className="btn-secondary" onClick={reset}>
              Rerecord
            </button>
            <button className="btn-primary" onClick={upload}>
              Analyze
            </button>
          </div>
        </div>
      </div>
    )
  }, [
    setStreamComplete,
    streamComplete,
    previewStream,
    mediaBlobUrl,
    status,
    focusLost,
    currentQuestion,
    reset,
    upload,
    dates,
    question,
    questionDuration,
    questions,
    questionsSubmitted,
    showCam,
    startRecording,
    stopRecording,
    uploading
  ])

  return <Layout>{renderJourney}</Layout>
}

export default Prepare
