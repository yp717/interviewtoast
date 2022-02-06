import * as React from "react"

const KeyWordSummary = ({ keywords, transcript }) => {
  return (
    <div className="py-4 space-y-2">
      <p className="font-bold text-2xl">
        Your keywords were mentioned{" "}
        {keywords.reduce((acc, cur) => {
          return acc + (transcript.split(cur.toLowerCase()).length - 1)
        }, 0)}{" "}
        times:
      </p>
      <div className="flex flex-wrap overflow-y-auto gap-x-3 gap-y-3">
        {keywords.length > 0 &&
          keywords.map(keyword => (
            <div className="flex items-center py-1 my-0 rounded-md align-center bg-purple-100 hover:bg-purple-200">
              <span className="px-2 text-2xl font-semibold text-purple-700">
                {keyword} ({transcript.split(keyword.toLowerCase()).length - 1})
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default KeyWordSummary
