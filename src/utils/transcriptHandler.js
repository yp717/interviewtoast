import * as React from "react"

import Toast from "../components/root/Toast"

export const transcriptHandler = fireToast => {
  return {
    onTranscriptCreated: transcript => {
      console.log("On transcript created", transcript)
      fireToast(
        <Toast duration={3500} title={`Transcript Update`} status="speaker">
          <p>{transcript.message}</p>
        </Toast>
      )
    },
  }
}
