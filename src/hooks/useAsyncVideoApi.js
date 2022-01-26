import * as React from "react"

export const useAsyncVideoApi = (data, query) => {
  const { token } = useAuth()
  const { conversationData, setConversationData } = useConversation()
  const [sentForProcessing, setSentForProcessing] = React.useState(false)
  const [jobStatus, setJobStatus] = React.useState(null)

  React.useEffect(() => {
    const isFile = data instanceof File

    async function fetchData() {
      const urlVideo = isFile
        ? `https://api.symbl.ai/v1/process/video${query}`
        : `https://api.symbl.ai/v1/process/video/url${query}`
      const requestOptions = {
        method: "GET",
        headers: {
          "x-api-key": token,
        },
      }
      async function getFileOrUrlOptions() {
        if (isFile) {
          const file = data
          const requestOptionsVideo = {
            method: "POST",
            headers: {
              "x-api-key": token,
              "Content-Type": "video/mp4",
            },
            body: file,
            json: true,
          }
          return requestOptionsVideo
        } else {
          const url = data
          const requestOptionsVideo = await {
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
        }
      }

      async function check(jobId) {
        const checkJob = await fetch(
          `https://api.symbl.ai/v1/job/${jobId}`,
          requestOptions
        )
        const checkJobJson = await checkJob.json()
        setJobStatus(checkJobJson)
        if (checkJobJson.status === "in_progress") {
          check(jobId)
          return
        } else {
          setSentForProcessing(false)
        }
      }
      try {
        if (!jobStatus) {
          setSentForProcessing(true)
          const requestOptionsVideo = await getFileOrUrlOptions()
          const processingResponse = await fetch(urlVideo, requestOptionsVideo)
          console.log(processingResponse)
          const processingResponseJson = await processingResponse.json()
          console.log(processingResponseJson)
          check(processingResponseJson.jobId)
          setConversationData(processingResponseJson)
        }
      } catch (err) {
        console.error(err, err.message)
      }
    }

    data && fetchData().catch(err => console.log(err.message))
  }, [data, conversationData, setConversationData])

  return {
    jobStatus,
    setJobStatus,
    sentForProcessing,
  }
}
