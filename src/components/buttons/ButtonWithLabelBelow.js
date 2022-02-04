import * as React from "react"

const ButtonWithLabelBelow = ({ Icon, label, onClick }) => {
  return (
    <button
      className="flex flex-col justify-center hover:bg-gray-600 w-16 h-14 rounded-md my-2"
      onClick={onClick}
    >
      <Icon className="w-6 h-6 mx-auto" />
      <p className="mx-auto">{label}</p>
    </button>
  )
}

export default ButtonWithLabelBelow
