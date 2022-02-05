import { XIcon } from "@heroicons/react/outline"
import { CheckCircleIcon } from "@heroicons/react/solid"
import * as React from "react"

const CopyToClipboardSuccess = ({ setShowAlert }) => {
  return (
    <div className="w-screen absolute top-2 left-0 z-50 opacity-100">
      <div className=" flex bg-green-100  py-4 px-6 max-w-6xl mx-auto rounded-md  w-full">
        <div className="flex-grow flex flex-row">
          <CheckCircleIcon className="h-6 text-green-500" />
          <p className="text-green-800 mx-4">Copied to Clipboard!</p>
        </div>
        <div className="flex-end h-full mr-4">
          <button onClick={() => setShowAlert(false)}>
            <XIcon className="h-4 pl-1 text-green-800 inline-block" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CopyToClipboardSuccess
