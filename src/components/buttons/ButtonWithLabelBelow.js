import * as React from "react"

const ButtonWithLabelBelow = ({
  Icon,
  label,
  onClick,
  needsStrikeThrough = false,
}) => {
  return (
    <button
      className="flex flex-col justify-center hover:bg-gray-600 w-16 h-14 rounded-md my-2 relative"
      onClick={onClick}
    >
      {needsStrikeThrough && (
        <div className="absolute top-0 w-full h-8 flex items-center justify-center">
          <div className="h-0.5 w-8 bg-red-400 transform rotate-45 rounded-full" />
        </div>
      )}
      <Icon className="w-6 h-6 mx-auto" />
      <p className="mx-auto">{label}</p>
    </button>
  )
}

export default ButtonWithLabelBelow
