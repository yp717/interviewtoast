import * as React from "react"
import { Link } from "gatsby"

const NotFoundPage = () => {
  return (
    <main>
      <h1>You're lost</h1>
      <Link to="/">Go home</Link>.
    </main>
  )
}

export default NotFoundPage
