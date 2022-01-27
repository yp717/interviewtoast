import { Link } from "gatsby"
import React from "react"
import DashboardTable from "../components/dashboard/DashboardTable"
import Layout from "../components/root/Layout"
import { useSessions } from "../context/session-context"

const Dashboard = () => {
  const { sessions } = useSessions()
  return (
    <Layout>
      {sessions.length > 0 ? (
        <>
          <div className="flex items-center justify-end mb-2">
            <Link to="/prepare" className="btn-primary">
              New Session
            </Link>
          </div>
          <DashboardTable />
        </>
      ) : (
        <div className="w-full rounded-lg bg-gray-50 px-4 py-6 flex items-center justify-center flex-col space-y-4 h-64">
          <div className="grid grid-cols-2 gap-x-8 justify-between w-full">
            <Link
              to="/prepare"
              className="text-center rounded-md bg-gray-900 hover:bg-gray-800 py-10 px-5"
            >
              <h2 className="text-2xl font-bold text-white">Practice</h2>
              <p>
                Put your skills to the test by practicing with real interview
                questions we've put together from user submissions.
              </p>
            </Link>
            <Link
              to="/meeting"
              className="text-center rounded-md bg-gray-50 hover:bg-gray-200 border py-10 px-5"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Join Interview
              </h2>
              <p className="text-gray-900">
                Join a live interview and land that next job (or find that new
                team mate).
              </p>
            </Link>
          </div>
          <h2 className="text-gray-900">Create your first session!</h2>
          {/* <Link to="/prepare" className="btn-primary">
            Get Started
          </Link> */}
        </div>
      )}
    </Layout>
  )
}

export default Dashboard
