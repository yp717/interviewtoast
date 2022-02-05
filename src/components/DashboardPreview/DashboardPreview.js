import * as React from "react"

import dashboard from "../../../static/dashboard.png"

const DashboardPreview = () => {
  return (
    <div class=" max-w-6xl mx-auto items-center justify-between md:gap-x-8 px-4">
      <div className="w-full lg:w-1/2">
        <img src={dashboard} className="w-full max-w-xl" />
      </div>
      <div className="w-full lg:w-1/2">
        <p class="text-sm leading-4 uppercase text-gray-600">
          Analyze Your Data
        </p>
        <h2 class="md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800">
          Custom Dashboards
        </h2>

        <p role="contentinfo" class="text-base leading-5 mt-5 text-gray-600">
          Get the most out of your live interviews and practice sessions. With
          InterviewToasts customized dashboard, both candidates and interviewers
          can really dig deep into the data to understand their strenghts and
          weaknesses.
        </p>
      </div>
    </div>
  )
}

export default DashboardPreview
