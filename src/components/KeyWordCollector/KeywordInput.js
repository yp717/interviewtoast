import * as React from "react"

const KeywordInput = ({ addKeyword }) => {
  const [value, setValue] = React.useState("")

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      addKeyword(value)
      setValue("")
    }
  }

  return (
    <div>
      <input
        className="w-full py-2 rounded-md text-gray-900"
        placeholder="Add key words to track in the meeting"
        type="text"
        name="keyword-input"
        value={value}
        onKeyDown={onKeyDown}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default KeywordInput
