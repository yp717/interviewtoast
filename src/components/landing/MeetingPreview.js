import * as React from "react"

import dashboard from "../../../static/videoCall.png"

const MeetingPreview = () => {
  return (
    <div className=" max-w-6xl mx-auto items-center justify-between md:gap-x-8 px-4">
      <div className="grid lg:grid-cols-5 gap-16">
        <div className="w-full flex flex-col justify-center col-span-2">
          <p className="text-sm leading-4 uppercase text-gray-600">
            Realtime Insights
          </p>
          <h2 className="md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800">
            Live Video Interviews
          </h2>

          <p
            role="contentinfo"
            className="text-base leading-5 mt-5 text-gray-600"
          >
            Our Interview Assessment tool goes beyond the practice rooms
            straight into the interview battlefield. InterviewToast uses Agora
            to provide real-time transcriptions, key-word and profanity
            detection, and analysis on live interviews.
          </p>
        </div>
        <div
          className="w-full col-span-3 row-start-1 lg:row-start-auto"
          style={{ perspective: "100em" }}
        >
          <img
            src={dashboard}
            className="w-full "
            alt="Screenshot of InterviewToast video chat meeting window"
            // style={{ transform: "translate3d(20deg, -20deg, 20deg)" }}
          />
        </div>
      </div>
    </div>
  )
}

export default MeetingPreview
