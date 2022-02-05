import { Link } from "gatsby"
import React, { useEffect } from "react"
import DashboardTable from "../components/dashboard/DashboardTable"
import Layout from "../components/root/Layout"
import { useSessions } from "../context/session-context"
import JoinMeeting from "../components/meeting/JoinMeeting"

const Dashboard = () => {
  const { resetDraft } = useSessions()

  useEffect(() => {
    resetDraft()
  }, [])

  return (
    <Layout>
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4 w-full">
          {/* if the user is an interviewer show this card */}
          <JoinMeeting />
          {/* <JoinCard /> */}
          <div className="bg-gray-900 p-4 rounded">
            <div className="w-full border-b-2 mb-2 border-gray-800 group-hover:border-white pb-1">
              <p className="font-medium">Practice Session</p>
            </div>
            <p className="text-sm opacity-80 mb-2">
              Put your skills to the test by practicing with real interview
              questions we've put together from user submissions.
            </p>
            <Link
              className="btn-primary flex items-center justify-center"
              to="/prepare"
            >
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
