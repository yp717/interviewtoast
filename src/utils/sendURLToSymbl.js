import fetch from "node-fetch"

// https://docs.symbl.ai/docs/developer-tools/authentication/
export async function sendURLToSymbl(accessToken, url) {
  const urlVideo = `https://api.symbl.ai/v1/process/video/url`

  const requestOptionsVideo = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url,
    }),
  }

  const response = await fetch(urlVideo, requestOptionsVideo)
  const data = await response.json()

  return data
}
