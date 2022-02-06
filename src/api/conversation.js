import { loginToSymbl } from "../utils/loginToSymbl"
import { getConversationData } from "../utils/getConversationData"
import { getSummaryData } from "../utils/getSummaryData"

export default async function handler(req, res) {
  if (req.method === `POST`) {
    const { conversationID } = JSON.parse(req.body)
    const { accessToken } = await loginToSymbl()

    const result = await getConversationData(accessToken, conversationID)

    const meetingText =
      typeof result.messages !== "undefined"
        ? result.messages.map(({ text }) => text).join(` `)
        : ""

    const jobID = await getSummaryData(accessToken, meetingText)

    console.log(jobID)
    res.send(result)
  }
}
