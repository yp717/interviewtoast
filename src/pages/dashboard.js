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
        <div className="w-full rounded-lg bg-white px-4 py-6 flex items-center justify-center flex-col space-y-4 h-64">
          <h2>Create your first session!</h2>
          <Link to="/prepare" className="btn-primary">
            Get Started
          </Link>
        </div>
      )}
    </Layout>
  )
}

export default Dashboard
