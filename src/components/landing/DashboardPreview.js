import * as React from "react"

import dashboard from "../../../static/dashboard.png"

const DashboardPreview = () => {
  return (
    <div class=" max-w-6xl mx-auto items-center justify-between md:gap-x-8 px-4">
      <div className="grid lg:grid-cols-5 gap-16">
        <div className="w-full col-span-3 row-start-2 lg:row-start-auto">
          <div className="pt-5 bg-gray-600 rounded border-2 border-zinc-700 relative">
            <div className="absolute top-0 left-0 m-1 flex items-center space-x-1">
              <div className="h-3 w-3 bg-red-400 rounded-full" />
              <div className="h-3 w-3 bg-yellow-400 rounded-full" />
              <div className="h-3 w-3 bg-green-400 rounded-full" />
            </div>
            <img src={dashboard} className="w-full" />
          </div>
        </div>
        <div className="w-full flex flex-col justify-center col-span-2">
          <p class="text-sm leading-4 uppercase text-gray-600">
            Analyze Your Data
          </p>
          <h2 class="md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800">
            Custom Dashboards
          </h2>

          <p role="contentinfo" class="text-base leading-5 mt-5 text-gray-600">
            Get the most out of your live interviews and practice sessions. With
            InterviewToasts customized dashboard, both candidates and
            interviewers can really dig deep into the data to understand their
            strenghts and weaknesses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPreview
