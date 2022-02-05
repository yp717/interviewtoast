import * as React from "react"

import { ChatIcon } from "@heroicons/react/solid"

import { useSymbl } from "../../context/symbl-context"

const Captions = () => {
  const { captionHistory } = useSymbl()

  const awesomeWords = ["javascript", "react"]

  React.useEffect(() => {
    var elmnt = document.getElementById("last-caption")
    elmnt?.scrollIntoView()
  }, [captionHistory])

  const renderCaptionMessage = message => {
    let newMessage = message

    awesomeWords.map(awesomeWord => {
      var re = new RegExp(awesomeWord, "g")
      newMessage = newMessage
        .toLowerCase()
        .replace(
          re,
          `<span class="font-bold text-green-500">${awesomeWord}</span>`
        )
    })

    var re = new RegExp("\\*", "g")
    newMessage = newMessage
      .toLowerCase()
      .replace(re, `<span class="font-bold text-red-500">*</span>`)

    return newMessage
  }

  return (
    <div className="px-2 py-2">
      <div className="flex items-center space-x-1 px-1 pb-1">
        <ChatIcon className="w-6 h-6" />
        <p className="text-xs uppercase">Captions</p>
      </div>
      <div className="flex flex-col-reverse space-y-2 opacity-80 h-[600px] overflow-y-auto will-change-scroll">
        {captionHistory.map((caption, i) => {
          return (
            <p
              id={i === captionHistory.length - 1 ? "last-caption" : ""}
              key={caption.message + i}
              className={`${
                caption.owner ? "text-gray-200" : "text-orange-400"
              }`}
              dangerouslySetInnerHTML={{
                __html: renderCaptionMessage(caption.message),
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Captions
