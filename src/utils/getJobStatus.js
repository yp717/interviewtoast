import fetch from "node-fetch"

export async function getJobStatus(accessToken, jobID) {
  const apiURL = `https://api.symbl.ai/v1/job/${jobID}`

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }

  const response = await fetch(apiURL, requestOptions)
  const data = await response.json()

  return data
}
