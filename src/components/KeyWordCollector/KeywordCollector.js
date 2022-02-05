import * as React from "react"
import ActiveKeywords from "./ActiveKeywords"
import KeywordInput from "./KeywordInput"

const KeywordCollector = () => {
  const [activeKeywords, setActiveKeywords] = React.useState([])

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

  // TODO: could use datalist with the values pulled out from the column in the context
  return (
    <div className="flex flex-col gap-y-2 my-4">
      <KeywordInput addKeyword={addKeyword} />
      <ActiveKeywords
        activeKeywords={activeKeywords}
        removeKeyword={removeKeyword}
      />
    </div>
  )
}

export default KeywordCollector
