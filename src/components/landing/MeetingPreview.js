import * as React from "react"

import dashboard from "../../../static/dashboard.png"

const MeetingPreview = () => {
  return (
    <div className=" max-w-6xl mx-auto items-center justify-between md:gap-x-8 px-4">
      <div className="grid lg:grid-cols-5 gap-16">
        <div className="w-full flex flex-col justify-center col-span-2">
          <p className="text-sm leading-4 uppercase text-gray-600">
            Analyze Your Data
          </p>
          <h2 className="md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800">
            Custom Dashboards
          </h2>

          <p role="contentinfo" className="text-base leading-5 mt-5 text-gray-600">
            Get the most out of your live interviews and practice sessions. With
            InterviewToasts customized dashboard, both candidates and
            interviewers can really dig deep into the data to understand their
            strenghts and weaknesses.
          </p>
        </div>
        <div
          className="w-full col-span-3 row-start-1 lg:row-start-auto"
          style={{ perspective: "100em" }}
        >
          <img
            src={dashboard}
            className="w-full skew-3d"
            alt="Screenshot of InterviewToast video chat meeting window"
            // style={{ transform: "translate3d(20deg, -20deg, 20deg)" }}
          />
        </div>
      </div>
    </div>
  )
}

export default MeetingPreview
