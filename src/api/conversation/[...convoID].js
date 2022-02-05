import { loginToSymbl } from "../../utils/loginToSymbl"
import { getConversationData } from "../../utils/getConversationData"

export default async function handler(req, res) {
  const conversationID = req.params.convoID;
  const { accessToken } = await loginToSymbl()

  const result = await getConversationData(accessToken, conversationID)
  res.send(result)

  return
}
