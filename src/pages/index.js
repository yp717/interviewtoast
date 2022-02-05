import * as React from "react"
import Hero from "../components/landing/Hero"
import Layout from "../components/root/Layout"
import { ArrowRightIcon } from "@heroicons/react/outline"
import Pricing from "../components/Pricing/Pricing"
import DashboardPreview from "../components/DashboardPreview/DashboardPreview"

const IndexPage = () => {
  return (
    <Layout mainClassName="w-full">
      <div className="max-w-6xl mx-auto">
        <Hero />
      </div>
      <div className="w-full bg-gray-700 text-white py-4"></div>
      <div className="flex flex-col gap-y-44 w-full bg-gray-100 text-gray-800 py-24">
        {/* One about the hackathon we are submitting to */}
        {/* Meeting Window screenshot */}
        <DashboardPreview />
        <Pricing />
      </div>
    </Layout>
  )
}

export default IndexPage
