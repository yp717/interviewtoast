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
      <div className="w-full bg-gray-700 text-white py-6">
        {/* <p className="text-center font-bold text-2xl opacity-50">With you every step of the way.</p> */}
        <div className="max-w-6xl mx-auto flex items-center justify-center space-x-12 md:text-2xl font-medium text-gray-200">
          <p>Prepare</p>
          <ArrowRightIcon className="h-8 w-8" />
          <p>Interview</p>
          <ArrowRightIcon className="h-8 w-8" />
          <p>Feedback</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-12 w-full bg-gray-100 text-gray-800 py-24">
        <DashboardPreview />
        <Pricing />
      </div>
    </Layout>
  )
}

export default IndexPage
