import React from "react"
import { m } from "framer-motion"
import Logo from "../../assets/Logo"

const LoadingSpinner = ({ text }) => (
  <div className="flex flex-col items-center justify-center py-16 md:py-48">
    <m.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "linear",
      }}
      className="w-32 h-32 relative mb-12"
    >
      <Logo className="h-10 w-10 absolute top-1/2 left-0 -m-5" />
      {/* <Logo className="h-10 w-10 absolute bottom-0 left-1/2 -rotate-90 -m-5 opacity-75" /> */}
      <Logo className="h-10 w-10 absolute top-1/2 right-0 rotate-180 -m-5 opacity-50" />
      {/* <Logo className="h-10 w-10 absolute top-0 left-1/2 rotate-90 -m-5 opacity-25" /> */}
    </m.div>
    <p className="text-sm font-medium animate-pulse">{text}</p>
  </div>
)

export default LoadingSpinner
