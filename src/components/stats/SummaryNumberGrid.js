import * as React from "react"

import BigNumber from "./BigNumber"

const SummaryNumberGrid = ({
  meetingDuration,
  totalInterruptionSeconds,
  meetingTalkSeconds,
  meetingSilenceSeconds,
  talkToSilenceRatio,
}) => {
  return (
    <div className="grid md:grid-cols-6 gap-4">
      {typeof meetingDuration !== "undefined" && (
        <div className="md:col-span-2">
          <BigNumber
            number={`${meetingDuration.toFixed(2)}s`}
            text={"Meeting Duration"}
          />
        </div>
      )}

      {typeof totalInterruptionSeconds !== "undefined" && (
        <div className="md:col-span-2">
          <BigNumber
            number={`${totalInterruptionSeconds.toFixed(2)}s`}
            text={"of Interruption"}
          />
        </div>
      )}

      {typeof meetingTalkSeconds !== "undefined" && (
        <div className="md:col-span-2">
          <BigNumber
            number={`${meetingTalkSeconds.toFixed(2)}s`}
            text={"Total Speaking Time"}
          />
        </div>
      )}

      {typeof meetingSilenceSeconds !== "undefined" && (
        <div className="md:col-span-3">
          <BigNumber
            number={`${meetingSilenceSeconds.toFixed(2)}s`}
            text={"Total Silence Time"}
          />
        </div>
      )}

      {typeof talkToSilenceRatio !== "undefined" && (
        <div className="md:col-span-3">
          <BigNumber
            number={`${talkToSilenceRatio.toFixed(2)}`}
            text={"Speaking to Silence Ratio"}
          />
        </div>
      )}
    </div>
  )
}

export default SummaryNumberGrid
