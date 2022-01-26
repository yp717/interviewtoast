import React from "react"
import { m } from "framer-motion"
import { Link } from "gatsby"
import Logo from "../../assets/Logo"
import { useAuth } from "../../context/auth-context"
import { ArrowRightIcon } from "@heroicons/react/outline"
import FlowDiagram from "./FlowDiagram"

const Hero = () => {
  const { user } = useAuth()
  return (
    <div className="flex flex-col items-center justify-center py-24  rounded md:rounded-lg bg-gray-800 text-white overflow-visible relative">
      <Logo className=" pointer-events-none w-32 h-32 md:h-64 md:w-64 absolute top-0 left-0 opacity-5 rotate-12 " />
      <Logo className=" pointer-events-none w-32 h-32 md:h-64 md:w-64 absolute bottom-0 left-full md:left-0 opacity-5 -rotate-45 mb-2 -ml-32 md:ml-64" />
      {/* <Logo
        className=" pointer-events-none w-32 h-32 md:h-64 md:w-64 absolute bottom-0 opacity-5 "
        style={{ left: "80%", transform: "rotate(-75deg)" }}
      />
      <Logo
        className=" pointer-events-none w-32 h-32 md:h-64 md:w-64 absolute top-0 opacity-5 "
        style={{ left: "50%", transform: "rotate(75deg)" }}
      /> */}
      <div className="grid md:grid-cols-2 px-4 md:px-2">
        <div className="md:py-24 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            We think <span className="text-orange-400">interviews</span> are
            like <span className="text-orange-400">toast</span>.
          </h1>
          <p>
            Whether you're a an applicant or an interviewer - interviews suck.
            Powered by AI, Interview Toast gives you everything you need to make
            interviews a positive experience. Don't burn your next interview.
          </p>
          <Link to={user ? "/dashboard" : "/login"} className="inline-block">
            <div className="bg-white hover:bg-gray-200 text-gray-800 px-4 py-2 font-medium rounded-full text-2xl mt-4 flex items-center space-x-2">
              <p>{user ? "Your Dashboard" : "Get started"}</p>
              <ArrowRightIcon className="h-6 w-6" />
            </div>
          </Link>
        </div>
        <div className="w-full h-full pointer-events-none -mr-12">
          <FlowDiagram
            elements={[
              {
                id: "1",
                data: { label: "Practice" },
                position: { x: 0, y: 0 },
                sourcePosition: "right",
                targetPosition: "bottom",
              },
              {
                id: "4",
                data: { label: "Arrange" },
                position: { x: 0, y: 300 },
                sourcePosition: "bottom",
                targetPosition: "right",
              },
              {
                id: "5",
                data: { label: "Interview" },
                position: { x: -8, y: 500 },
                sourcePosition: "right",
              },
              {
                id: "6",
                type: "output",
                data: { label: "Feedback" },
                position: { x: 400, y: 498 },
                targetPosition: "left",
              },
              {
                id: "2",
                data: { label: "Upload" },
                position: { x: 435, y: 0 },
                targetPosition: "left",
                sourcePosition: "bottom",
              },
              {
                id: "3",
                data: { label: "Review" },
                position: { x: 435, y: 200 },
                targetPosition: "top",
                sourcePosition: "left",
              },
              {
                id: "e1",
                source: "1",
                target: "2",
                animated: true,
                type: "smoothstep",
              },
              {
                id: "e2",
                source: "2",
                target: "3",
                animated: true,
                type: "smoothstep",
                label: "AI Magic",
              },
              {
                id: "e3",
                source: "3",
                target: "1",
                animated: true,
                type: "smoothstep",
                label: "Not Ready",
              },
              {
                id: "e4",
                source: "3",
                target: "4",
                animated: true,
                type: "smoothstep",
                label: "Ready",
              },
              {
                id: "e5",
                source: "4",
                target: "5",
                animated: true,
                type: "smoothstep",
              },
              {
                id: "e6",
                source: "5",
                target: "6",
                animated: true,
                type: "smoothstep",
                label: "Automatic",
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
