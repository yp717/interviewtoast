import * as React from "react"
import { Link } from "gatsby"

import Logo from "../../assets/Logo"
import { useAuth } from "../../context/auth-context"
import { ArrowRightIcon } from "@heroicons/react/outline"
import FlowDiagram from "./FlowDiagram"
import flowDiagramElements from "../../data/flowDiagramElements.json"

const Hero = () => {
  const { user } = useAuth()
  return (
    <div className="flex flex-col items-center justify-center py-24  rounded md:rounded-lg bg-gray-800 text-white overflow-visible relative">
      <Logo className=" pointer-events-none w-32 h-32 md:h-64 md:w-64 absolute top-0 left-0 opacity-5 rotate-12 " />
      <Logo className=" pointer-events-none w-32 h-32 md:h-64 md:w-64 absolute bottom-0 left-full md:left-0 opacity-5 -rotate-45 mb-2 -ml-32 md:ml-64" />
      <div className="grid md:grid-cols-2 px-4 md:px-2">
        <div className="md:py-18 space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold">
            <span className="text-orange-400">Interviews</span> are like{" "}
            <span className="text-orange-400">toast</span>.
          </h1>
          <p>
            Whether you're a an applicant or an interviewer - interviews suck.
            Powered by AI, Interview Toast gives you everything you need to make
            interviews a positive experience. Don't burn your next interview.
          </p>
          <Link to={user ? "/dashboard" : "/login"} className="inline-block">
            <div className="bg-white hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-xl mt-4 flex items-center space-x-2">
              <p>{user ? "Your Dashboard" : "Get started"}</p>
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </Link>
        </div>
        <div className="w-full h-96 mt-12 md:mt-0 md:h-full pointer-events-none md:-mr-12">
          <FlowDiagram elements={flowDiagramElements} />
        </div>
      </div>
    </div>
  )
}

export default Hero
