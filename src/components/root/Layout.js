import * as React from "react"

import Seo from "./SEO"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({
  title,
  description,
  children,
  mainClassName = "py-6 px-4 max-w-6xl mx-auto",
}) => {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="bg-gray-800 text-white">
        <Seo title={title} description={description} />
        <Header />
        <main className={mainClassName}>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
