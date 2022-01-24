import * as React from "react"

import SEO from "./SEO"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ title, description, children }) => {
  return (
    <div className="min-h-screen overflow-hidden">
      <SEO title={title} description={description} />
      <Header />
      <div className="mt-24">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
