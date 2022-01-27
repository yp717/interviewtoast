import fetch from "node-fetch"

// https://docs.symbl.ai/docs/developer-tools/authentication/
export async function loginToSymbl() {
  const authOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "application",
      appId: process.env.SYMBL_APP_ID,
      appSecret: process.env.SYMBL_APP_SECRET,
    }),
  }

  const response = await fetch(
    "https://api.symbl.ai/oauth2/token:generate",
    authOptions
  )

  const data = await response.json()
  return data
}
