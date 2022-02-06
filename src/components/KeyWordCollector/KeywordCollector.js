import * as React from "react"
import ActiveKeywords from "./ActiveKeywords"
import KeywordInput from "./KeywordInput"

const KeywordCollector = ({ activeKeywords, setActiveKeywords }) => {
  const addKeyword = value => {
    // Only add the keyword if it isn't already in there
    const index = activeKeywords.findIndex(item => item == value.toLowerCase())

    if (index === -1) {
      setActiveKeywords([...activeKeywords, value.toLowerCase()])
    }
  }

  const removeKeyword = keyword => {
    console.log(
      activeKeywords.filter(activeKeyword => activeKeyword !== keyword)
    )
    setActiveKeywords([
      ...activeKeywords.filter(activeKeyword => activeKeyword !== keyword),
    ])
  }

  return (
    <div className="flex flex-col gap-y-2 my-4">
      <KeywordInput addKeyword={addKeyword} />
      {activeKeywords.length > 0 && (
        <ActiveKeywords
          activeKeywords={activeKeywords}
          removeKeyword={removeKeyword}
        />
      )}
    </div>
  )
}

export default KeywordCollector
