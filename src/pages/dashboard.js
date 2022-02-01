import { Link } from "gatsby"
import React from "react"
import DashboardTable from "../components/dashboard/DashboardTable"
import Layout from "../components/root/Layout"
import { useSessions } from "../context/session-context"
import LargeCard from "../components/dashboard/LargeCard"
import { SpeakerphoneIcon, StarIcon } from "@heroicons/react/outline"
import JoinMeeting from "../components/meeting/JoinMeeting"

const Dashboard = () => {
  const { sessions } = useSessions()
  return (
    <Layout>
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4 w-full">
          <div className="md:col-span-2 bg-gray-900 p-4 rounded">
            <div className="w-full border-b-2 mb-2 border-gray-800 group-hover:border-white pb-1">
              <p className="font-medium">Join an Interview</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 pt-1">
              <div>
                <p className="text-sm opacity-80 mb-2">
                  Join a live interview and land that next job (or find that new
                  team mate).
                </p>
              </div>
              <JoinMeeting />
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <div className="w-full border-b-2 mb-2 border-gray-800 group-hover:border-white pb-1">
              <p className="font-medium">Practice Session</p>
            </div>
            <p className="text-sm opacity-80 mb-2">
              Put your skills to the test by practicing with real interview
              questions we've put together from user submissions.
            </p>
            <Link className="btn-primary flex items-center justify-center" to="/prepare" >
              New Practice Session
            </Link>
          </div>
        </div>
        <DashboardTable />
      </div>
    </Layout>
  )
}

export default Dashboard
