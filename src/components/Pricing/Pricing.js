import * as React from "react"

import Logo from "../../assets/Logo"
import ChooseYourPlan from "./ChooseYourPlan"
import PriceCard from "./PriceCard"
import PriceCardWithBorder from "./PriceCardWithBorder"

const Pricing = () => {
  return (
    <div className="max-w-6xl mx-auto lg:flex items-center justify-between md:gap-x-16 px-4">
      <ChooseYourPlan />
      <div className="xl:w-1/2 lg:w-7/12 relative w-full lg:mt-0 mt-12" role="list">
        <Logo className=" pointer-events-none md:h-64 md:w-64 absolute w-full -ml-16 mt-24 opacity-5 rotate-12 " />
        <Logo className=" pointer-events-none md:h-64 md:w-64 absolute w-full ml-48 mt-44 opacity-5 -rotate-12 " />
        <PriceCard
          title="Starter"
          price="FREE"
          description="Full access to all features and no credit card required"
        />
        <PriceCardWithBorder
          title="Personal"
          price="$18/mo"
          description="Unlimited products features and dedicated support channels"
        />
        <PriceCard
          title="Team"
          price="$99/mo"
          description="Up to 10 Interviewer accounts for your team to find the next best toast. I mean candidate..."
        />
      </div>
    </div>
  )
}

export default Pricing
