import fetch from "node-fetch"

export async function getConversationData(accessToken, conversationID) {
  const routes = ["messages", "analytics", "topics", "questions", "abstract-topics", "follow-ups"]
  let allData = {}
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }

  for await (const route of routes) {
    const response = await fetch(`https://api.symbl.ai/v1/conversations/${conversationID}/${route}`, requestOptions)
    const data = await response.json()
    allData = {...allData, ...data}
  }
  return allData
}
