import { loginToSymbl } from "../utils/loginToSymbl"
import { getConversationData } from "../utils/getConversationData"

export default async function handler(req, res) {
  if (req.method === `POST`) {
    const { conversationID } = req.body
    const { accessToken } = await loginToSymbl()

    const result = await getConversationData(accessToken, conversationID)
    res.send(result)
  }
}
