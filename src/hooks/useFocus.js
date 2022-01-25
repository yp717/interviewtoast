import React from "react"

function useFocus() {
  const [isFocused, setIsFocused] = React.useState(true)
  const onFocusFunction = () => {
    setIsFocused(true)
  }
  const onBlurFunction = () => {
    setIsFocused(false)
  }
  React.useEffect(() => {
    window.addEventListener("focus", onFocusFunction)
    window.addEventListener("blur", onBlurFunction)
    return () => {
      window.removeEventListener("focus", onFocusFunction)
      window.removeEventListener("blur", onBlurFunction)
    }
  }, [])
  return [isFocused]
}

export default useFocus
