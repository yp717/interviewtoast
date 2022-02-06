import * as React from "react"

const BigNumber = ({ number, text }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center bg-gray-900 px-4 py-2 rounded-md">
      <p className="text-6xl font-bold">{number}</p>
      <p>{text}</p>
    </div>
  )
}

export default BigNumber
