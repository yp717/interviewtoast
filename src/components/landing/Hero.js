import React from "react"
import { m } from "framer-motion"
import { Link } from "gatsby"
import Logo from "../../assets/Logo"

const Hero = () => (
  <div className="flex flex-col items-center justify-center py-8 md:py-16 rounded md:rounded-lg bg-gray-800 text-white relative">
    <div className="flex items-center">
      <h1 className="text-4xl md:text-6xl font-bold">Interview</h1>
      <Logo className="h-16 w-16" />
      <h1 className="text-4xl md:text-6xl font-bold">.</h1>
    </div>
    <p>Interviews are like toast. Don't burn your next interview.</p>
    <Link
      to="/login"
      className="bg-white hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xl mt-4"
    >
      Get started
    </Link>
  </div>
)

export default Hero
