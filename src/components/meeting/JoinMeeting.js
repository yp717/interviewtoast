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
      // console.log(rtcToken)
      navigate(`/meeting/${value}/${rtcToken}`)
    } catch (e) {
      console.error("Could not generate meeting token", e)
    }
  }
console.log(value)
  return (
   <div className="flex flex-col space-y-4">
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
  )
}

export default JoinMeeting
