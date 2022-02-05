import React, { useEffect } from "react"
import {
  SupportedModels,
  createDetector,
} from "@tensorflow-models/pose-detection"
import "@tensorflow/tfjs-backend-webgl"

function usePosenet(videoRef) {
  const [poses, setPoses] = React.useState(null)
  const estimateMultiplePoses = async () => {
    const model = SupportedModels.MoveNet
    const detector = await createDetector(model)
    const newPoses = await detector.estimatePoses(videoRef.current, {
      decodingMethod: "single-person",
    })
    setPoses(newPoses.length > 0 ? newPoses[0] : null)
  }
  useEffect(() => {
    if (videoRef.current) {
      const intervalID = setInterval(async () => {
        try {
          estimateMultiplePoses()
        } catch (err) {
          clearInterval(intervalID)
          //   setErrorMessage(err.message);
        }
      }, 2000)
      return () => clearInterval(intervalID)
    }
  }, [videoRef, videoRef.current])

  return { poses }
}

export default usePosenet
