import * as React from "react"

const Transcript = ({ transcript, user }) => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <p className="uppercase text-base">Transcript</p>
      <div className="flex flex-col space-y-2 h-96 overflow-y-auto">
        {transcript.map(({ from: { name }, text }, index) => (
          <div
            className={`${
              name === user.uid
                ? "ml-auto text-right bg-orange-400"
                : "mr-auto bg-gray-800"
            } text-white max-w-[80%]  px-2 py-1 rounded-md`}
          >
            <p
              className={`${
                name === user.uid ? " text-right" : ""
              } text-white `}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Transcript
