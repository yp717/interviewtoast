import * as React from "react"

import { Link } from "gatsby"
import { m } from "framer-motion"

import babyYoda from "../../static/baby-yoda-bg-removebg-preview.png"

import Layout from "../components/root/Layout"
import Logo from "../assets/Logo"
const NotFoundPage = () => {
  return (
    <Layout>
      <h1 className="text-6xl font-bold mt-20 mb-6">
        Error 404. This is not the Toast you are looking for.
      </h1>
      <Link className="btn-primary font-bold text-2xl py-2" to="/">
        Go home?
      </Link>
      <div className="w-full h-full items-center justify-center pb-16 relative">
        <img src={babyYoda} className="mx-auto z-10" />
        <div className="absolute top-1/2 left-1/2">
          <m.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 5,
              ease: "linear",
            }}
            className="w-42 h-42 relative left-60 mb-12"
          >
            <Logo className="h-10 w-10 absolute" />
          </m.div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
