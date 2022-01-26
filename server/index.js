require("dotenv").config()

const express = require("express")
const app = express()
const routes = require("./routes/routes")
const { checkConnection } = require("./utils/checkConnection")
const { loginToSymbl } = require("./utils/loginToSymbl")
const { getVideoParams } = require("./utils/getVideoParams")
const { fetchVideoData } = require("./utils/fetchVideoData")

const port = process.env.PORT || 3000

// Enable CORS
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma"
  )
  next()
})

app.use("/api/v1", routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  // checkConnection()
})

// POC
app.get("/test", async (req, res) => {
  // 1. Log in to Symbl (response is access token and expiry date)
  const authentication = await loginToSymbl()

  if (!authentication) console.log("We messed up on authentication")

  console.log(authentication)
  // 2. Get relevant params for Video URL
  // const videoParams = getVideoParams(
  //   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjUwODc3ODQzMTUzODc5MDQiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiN2RNTXFEaEVoMUM3QUNSdzZ6RTYwZHNGbUtuM3NSZTFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjQzMjI4NzE0LCJleHAiOjE2NDMzMTUxMTQsImF6cCI6IjdkTU1xRGhFaDFDN0FDUnc2ekU2MGRzRm1LbjNzUmUxIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.RUo4b9es5KdhbGpDsrd_t1uy12d0ELFVguRasJ-RE75JAwkuU6wBpsAlGCG3_BUwcaSOwSgtepYQjI4KoPBcIj-gKlwqdvWmBgs9FuypTqZhoY_c0hkhT9jLC7lAAhxnHXhG_Tqr3ePfcRe3nxC09WDdKebkQ1HOcQe-4UhCgEHxru9f5G2Y-B1uKxS1aoVIfUDqzIKH4XpjFdYhvLsmulSeYlZ6ZvuNQXZy2wXPWoNAqX9BOfCte8z31fEV-pIN9qUiO9-qt3ZU-Tm3UWG5D9NIijP-cr39qujtgmBrNjjwaPnc_Xvx1Z2TUBLe3-oRg86Jyyes2ikKvesa6qVdDA",
  //   "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4"
  // )

  // if (!videoParams) console.log("We messed up on video params")

  // console.log(videoParams)

  // // 3. Get symbl async Video API endpoint

  // // 4. Use Job API to poll for job status

  // // 5. Send Video to processing
  // await fetchVideoData(
  //   videoParams,
  //   "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4"
  // )
})

// Define base route and return HTML file
app.get("/", function (req, res) {
  res.sendFile("index.html", {
    root: __dirname,
  })
})
