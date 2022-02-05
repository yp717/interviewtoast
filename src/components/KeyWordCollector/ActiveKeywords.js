import * as React from "react"
import ActiveKeyword from "./ActiveKeyword"

const ActiveKeywords = ({ activeKeywords, removeKeyword }) => {
  return (
    <div>
      {activeKeywords && (
        <div className="flex-grow p-3 bg-gray-800 h-16 overflow-y-auto rounded-md">
          <div className="flex flex-wrap overflow-y-auto gap-x-3 gap-y-3">
            {activeKeywords.map((text, index) => {
              return (
                <div key={index}>
                  <ActiveKeyword
                    text={text}
                    onClick={() => removeKeyword(text)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ActiveKeywords
