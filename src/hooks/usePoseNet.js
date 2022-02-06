import * as React from "react"
import {
  SupportedModels,
  createDetector,
} from "@tensorflow-models/pose-detection"
import "@tensorflow/tfjs-backend-webgl"
import { useSessions } from "../context/session-context"

function usePosenet(videoRef, enabled = true) {
  const { setDraftSubmission } = useSessions()

  const slouchFrames = React.useRef(0)
  const totalFrames = React.useRef(0)

  React.useEffect(() => {
    if (!videoRef.current || !enabled) return

    const estimateMultiplePoses = async () => {
      const model = SupportedModels.MoveNet
      const detector = await createDetector(model)
      const newPoses = await detector.estimatePoses(videoRef.current, {
        decodingMethod: "single-person",
      })

      if (newPoses.length > 0) {
        const keypointsArr = newPoses[0].keypoints

        const leftShoulder = keypointsArr[5]
        const rightShoulder = keypointsArr[6]
        const leftEye = keypointsArr[1]
        const rightEye = keypointsArr[2]
        const confidence =
          (leftShoulder.score +
            rightShoulder.score +
            leftEye.score +
            rightEye.score) /
          4
        const shoulderDeltaX = leftShoulder.x - rightShoulder.x
        const shoulderDeltaY = leftShoulder.y - rightShoulder.y

        const eyeDeltaX = leftEye.x - rightEye.x

        let slouch = false
        // The distance between your eyes will increase if you move closer to the camera and slouch forwards
        if (eyeDeltaX / shoulderDeltaX > 0.225) {
          console.log("SLOUCHING FORWARDS")
          // fire toast
          slouch = true
        }

        const tanTheta = Math.abs(shoulderDeltaY / shoulderDeltaX)

        if (tanTheta > 0.1) {
          console.log("SLOUCHING", confidence)
          // fire toast
          slouch = true
        }

        slouch && slouchFrames.current++
        totalFrames.current++

        console.log((slouchFrames.current / totalFrames.current) * 100 + "%")
        setDraftSubmission(draftSubmission => ({
          ...draftSubmission,
          slouchPercent: (slouchFrames.current / totalFrames.current) * 100,
        }))
      }
    }

    const intervalID = setInterval(async () => {
      try {
        estimateMultiplePoses()
      } catch (err) {
        clearInterval(intervalID)
        //   setErrorMessage(err.message);
      }
    }, 2000)
    return () => clearInterval(intervalID)
  }, [videoRef, enabled, setDraftSubmission])

  return {
    slouchFrames,
    totalFrames,
    slouchPercent: (slouchFrames.current / totalFrames.current) * 100,
  }
}

export default usePosenet
