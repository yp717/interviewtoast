import { navigate } from "gatsby"

export const joinMeeting = async (value, user) => {
  try {
    const res = await fetch("/api/agora/meeting-token-gen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channelName: value,
        uid: user.displayName,
      }),
    })

    const { rtcToken } = await res.json()
    // console.log(rtcToken)
    navigate(`/meeting/${value}/${rtcToken}`)
  } catch (e) {
    console.error("Could not generate meeting token", e)
  }
}
