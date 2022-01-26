const request = require("request")

async function fetchVideoData(requestOptionsVideo, query) {
  var jobStatus = undefined

  const urlVideo = `https://api.symbl.ai/v1/process/video/url${query}`

  async function check(jobId) {
    const reqOptions = {
      method: "GET",
      url: `https://api.symbl.ai/v1/job/${jobId}`,
      headers: {
        "x-api-key":
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjUwODc3ODQzMTUzODc5MDQiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiN2RNTXFEaEVoMUM3QUNSdzZ6RTYwZHNGbUtuM3NSZTFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjQzMjI4NzE0LCJleHAiOjE2NDMzMTUxMTQsImF6cCI6IjdkTU1xRGhFaDFDN0FDUnc2ekU2MGRzRm1LbjNzUmUxIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.RUo4b9es5KdhbGpDsrd_t1uy12d0ELFVguRasJ-RE75JAwkuU6wBpsAlGCG3_BUwcaSOwSgtepYQjI4KoPBcIj-gKlwqdvWmBgs9FuypTqZhoY_c0hkhT9jLC7lAAhxnHXhG_Tqr3ePfcRe3nxC09WDdKebkQ1HOcQe-4UhCgEHxru9f5G2Y-B1uKxS1aoVIfUDqzIKH4XpjFdYhvLsmulSeYlZ6ZvuNQXZy2wXPWoNAqX9BOfCte8z31fEV-pIN9qUiO9-qt3ZU-Tm3UWG5D9NIijP-cr39qujtgmBrNjjwaPnc_Xvx1Z2TUBLe3-oRg86Jyyes2ikKvesa6qVdDA",
      },

      json: true,
    }

    const checkJob = await request(reqOptions, (err, res, body) => {
      if (err) {
        console.error("error posting json: ", err)
        throw err
      }

      console.log(JSON.stringify(body, null, 2))
      return body
    })

    const checkJobJson = await checkJob.json()

    jobStatus = checkJobJson

    if (checkJobJson.status === "in_progress") {
      check(jobId)
      return
    } else {
      console.error("Did not send for processing")
    }
  }

  try {
    if (!jobStatus) {
      console.log("SENT FOR PROCESSING")

      const requestTextOptions = {
        method: "POST",
        url: `https://api.symbl.ai/v1/process/text`,
        headers: {
          "x-api-key":
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjUwODc3ODQzMTUzODc5MDQiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiN2RNTXFEaEVoMUM3QUNSdzZ6RTYwZHNGbUtuM3NSZTFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjQzMjI4NzE0LCJleHAiOjE2NDMzMTUxMTQsImF6cCI6IjdkTU1xRGhFaDFDN0FDUnc2ekU2MGRzRm1LbjNzUmUxIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.RUo4b9es5KdhbGpDsrd_t1uy12d0ELFVguRasJ-RE75JAwkuU6wBpsAlGCG3_BUwcaSOwSgtepYQjI4KoPBcIj-gKlwqdvWmBgs9FuypTqZhoY_c0hkhT9jLC7lAAhxnHXhG_Tqr3ePfcRe3nxC09WDdKebkQ1HOcQe-4UhCgEHxru9f5G2Y-B1uKxS1aoVIfUDqzIKH4XpjFdYhvLsmulSeYlZ6ZvuNQXZy2wXPWoNAqX9BOfCte8z31fEV-pIN9qUiO9-qt3ZU-Tm3UWG5D9NIijP-cr39qujtgmBrNjjwaPnc_Xvx1Z2TUBLe3-oRg86Jyyes2ikKvesa6qVdDA",
          "Content-Type": "application/json",
        },
        body: query,
      }

      const processingResponse = await request(
        requestTextOptions,
        (err, res, body) => {
          if (err) {
            console.error("error posting json: ", err)
            throw err
          }

          console.log(JSON.stringify(body, null, 2))
          return body
        }
      )

      console.log(processingResponse)
      const processingResponseJson = await processingResponse.json()
      console.log(processingResponseJson)
      check(processingResponseJson.jobId)
      console.log(processingResponseJson)
    }
  } catch (err) {
    console.error(err, err.message)
  }
}

module.exports = {
  fetchVideoData,
}
