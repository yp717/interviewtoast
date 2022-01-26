import * as React from "react"
import Logo from "../../assets/Logo"

const Footer = () => {
  return (
    <div className="max-w-6xl mx-auto text-center flex justify-between items-center px-2 py-4 text-gray-500 text-sm">
      <Logo className="h-8 w-8" />
      <div>No toast was burnt in the making of this project.</div>
    </div>
  )
}

export default Footer
