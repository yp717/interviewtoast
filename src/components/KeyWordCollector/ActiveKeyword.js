import { XIcon } from "@heroicons/react/outline"
import * as React from "react"

const ActiveKeyWord = ({ text, onClick }) => {
  const [hovered, setHovered] = React.useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center py-0 my-0 pr-0.5 rounded-md align-center bg-purple-100 hover:bg-purple-200"
    >
      <span className="px-2 font-semibold text-purple-700">{text}</span>
      {hovered && <XIcon className="w-4 h-4 text-purple-700" />}
    </button>
  )
}

export default ActiveKeyWord
