// For now assume that the input is a URL to where the video is hosted
function getVideoParams(token, data) {
  // Check if data is a string
  const isURL = typeof data === "string"

  if (isURL) {
    const url = data
    const requestOptionsVideo = {
      method: "POST",
      headers: {
        "x-api-key": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        confidenceThreshold: 0.6,
        timezoneOffset: 0,
      }),
    }
    return requestOptionsVideo
  } else {
    console.error("Received Invalid File Type")
    return undefined
  }
}

module.exports = {
  getVideoParams,
}
