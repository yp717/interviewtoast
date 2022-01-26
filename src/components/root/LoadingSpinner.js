import React from "react"
import { m } from "framer-motion"
import Logo from "../../assets/Logo"

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-16">
    <m.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "linear",
      }}
      className="w-32 h-32 relative "
    >
      <Logo className="h-10 w-10 absolute top-1/2 left-0 -m-5" />
      {/* <Logo className="h-10 w-10 absolute bottom-0 left-1/2 -rotate-90 -m-5 opacity-75" /> */}
      <Logo className="h-10 w-10 absolute top-1/2 right-0 rotate-180 -m-5 opacity-50" />
      {/* <Logo className="h-10 w-10 absolute top-0 left-1/2 rotate-90 -m-5 opacity-25" /> */}
    </m.div>
  </div>
)

export default LoadingSpinner
