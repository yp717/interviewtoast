import * as React from "react"
import ActiveKeywords from "./ActiveKeywords"

const KeywordCollector = () => {
  const [activeKeywords, setActiveKeywords] = React.useState([])

  // TODO: could use datalist with the values pulled out from the column in the context
  return (
    <div className="w-full bg-white border-none h-14">
      <ActiveKeywords
        activeKeywords={activeKeywords}
        setActiveKeywords={setActiveKeywords}
      />

      <div>{/* <input /> */}</div>
    </div>
  )
}

export default KeywordCollector
