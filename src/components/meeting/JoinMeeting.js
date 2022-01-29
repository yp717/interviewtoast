import * as React from "react"

import { navigate } from "gatsby"

import { useAuth } from "../../context/auth-context"

const JoinMeeting = () => {
  const [value, setValue] = React.useState("")
  const { user } = useAuth()

  const handleJoin = async () => {
    try {
      const res = await fetch("/api/agora/meeting-token-gen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelName: "apollo",
          uid: user.uid,
        }),
      })

      const { rtcToken } = await res.json()

      navigate(`/meeting/${value}/${rtcToken}`)
    } catch (e) {
      console.error("Could not generate meeting token", e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full pt-12 relative overflow-y-scroll">
      <div className="flex gap-x-4 bg-white p-6 shadow-md rounded-md">
        <input
          type="text"
          onChange={e => setValue(e.target.value)}
          id="channel"
          className="bg-white text-gray-900 border px-2 py-1.5 rounded-sm"
          placeholder="Enter Channel name"
        />
        <button
          type="submit"
          value="Join"
          onClick={handleJoin}
          className="btn-primary"
        >
          Join
        </button>
      </div>
    </div>
  )
}

export default JoinMeeting
