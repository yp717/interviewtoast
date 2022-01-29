import * as React from "react"

import JoinMeeting from "../components/meeting/JoinMeeting"
import MeetingWindow from "../components/meeting/MeetingWindow"
import Layout from "../components/root/Layout"

const Meeting = () => {
  return (
    <Layout>
      {/* check what happens if they join a channel that doesn't exist */}
      <JoinMeeting />
    </Layout>
  )
}

export default Meeting
