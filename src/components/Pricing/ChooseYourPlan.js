import { Link } from "gatsby"
import * as React from "react"

import Logo from "../../assets/Logo"

const ChooseYourPlan = () => {
  return (
    <div className="lg:w-1/2 w-full relative z-20">
      <Logo className="z-10 pointer-events-none md:h-96 md:w-96 absolute w-full -ml-16 -mt-24 opacity-5 -rotate-12" />
      <div className="relative z-20">
        <p className="text-sm leading-4 uppercase text-gray-600">
          Choose your plan
        </p>
        <h2
          role="heading"
          className="md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800"
        >
          Our pricing plan
        </h2>
        <p role="contentinfo" className="text-base leading-5 mt-5 text-gray-600">
          We're working hard on making InterviewToast the best place to prepare
          for your next interview or find your next dream candidate. We can’t
          wait to hear what you think.
        </p>
        <p className="text-sm opacity-70 italic mt-2 mb-10">
          *disclaimer: all pricing is fictional. This is not yet a purchasable
          product and prices are for demonstration purposes only. Future prices
          may vary.
        </p>

        <Link
          to="/dashboard"
          className="uppercase bg-orange-500 focus:ring-orange-500 focus:outline-none text-semibold text-lg text-white rounded-lg py-4 px-6"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default ChooseYourPlan
