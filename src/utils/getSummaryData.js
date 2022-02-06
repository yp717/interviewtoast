import fetch from "node-fetch"

export async function getSummaryData(accessToken, text) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          payload: {
            content: text,
            contentType: "text/plain"
          }
        }
      ]
    }),
  }

    const response = await fetch(
      `https://api-labs.symbl.ai/v1/process/text?enableSummary=true`,
      requestOptions
    )
    const data = await response.json()

  
  return data
}
