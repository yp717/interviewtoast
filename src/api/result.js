import { getJobStatus } from "../utils/getJobStatus"
import { loginToSymbl } from "../utils/loginToSymbl"
import { getConversationData } from "../utils/getConversationData"

export default async function handler(req, res) {
  if (req.method === `POST`) {
    const { jobID, conversationID } = JSON.parse(req.body)
    const { accessToken } = await loginToSymbl()
    const { status } = await getJobStatus(accessToken, jobID)
    if (status === "completed") {
      const result = await getConversationData(accessToken, conversationID)
      res.send(result)
      return
    }

    if (status === "failed") {
      res.status(500).send(status)
      return
    }
    res.status(102).send(status)
    return
  }
}
