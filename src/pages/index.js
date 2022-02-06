import * as React from "react"
import Hero from "../components/landing/Hero"
import Layout from "../components/root/Layout"
import Pricing from "../components/Pricing/Pricing"
import DashboardPreview from "../components/landing/DashboardPreview"
import Devpost from "../components/landing/DevPost"
import MeetingPreview from "../components/landing/MeetingPreview"

const IndexPage = () => {
  return (
    <Layout mainClassName="w-full" title="Landing" description="Don't burn your next interview.">
      <div className="max-w-6xl mx-auto">
        <Hero />
      </div>
      <div className="w-full bg-gray-700 text-white py-4"></div>
      <div className="flex flex-col gap-y-44 w-full bg-gray-100 text-gray-800 py-24">
        <MeetingPreview />
        <DashboardPreview />
        <Pricing />
      </div>
      <Devpost />
    </Layout>
  )
}

export default IndexPage
