import { Link } from "gatsby";
import React from "react";
import DashboardTable from "../components/dashboard/DashboardTable";
import Layout from "../components/root/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex items-center justify-end mb-2">
        <Link to="/prepare" className="btn-primary">
          New Session
        </Link>
      </div>
      <DashboardTable />
    </Layout>
  );
};

export default Dashboard;
