import { RtcTokenBuilder } from "agora-access-token"

const AGORA_APP_ID = process.env.AGORA_APP_ID
const AGORA_APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE

export default async function handler(req, res) {
  if (req.method === `POST`) {
    const { channelName, uid, expiryTime = 3600 } = req.body

    console.log(channelName)

    if (!channelName) {
      return res.status(500).json({ error: "channel is required" })
    }
    if (!uid || uid === "") {
      return res.status(500).json({ error: "uid is required" })
    }

    const currentTime = Math.floor(Date.now() / 1000)
    const privilegeExpireTime = currentTime + expiryTime

    if (!uid) {
      return res.status(500).json({ error: "uid is invalid" })
    }

    const token = RtcTokenBuilder.buildTokenWithUid(
      AGORA_APP_ID,
      AGORA_APP_CERTIFICATE,
      channelName,
      uid,
      "publisher",
      privilegeExpireTime
    )

    return res.json({ rtcToken: token })
  }
}
