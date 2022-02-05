import { loginToSymbl } from "../../utils/loginToSymbl"
import { getConversationData } from "../../utils/getConversationData"

export default async function handler(req, res) {
  const params = req.params[`*`].split(`/`)
  const conversationID = params[0]
  const { accessToken } = await loginToSymbl()

  const result = await getConversationData(accessToken, conversationID)
  res.send(result)

  return
}
