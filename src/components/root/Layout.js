import * as React from "react"

import Seo from "./SEO"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ title, description, children }) => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Seo title={title} description={description} />
      <Header />
      <main className="py-6 px-2 max-w-6xl mx-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
