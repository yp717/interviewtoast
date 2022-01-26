require("dotenv").config()

const express = require("express")

const app = express()
const port = process.env.PORT || 3000

// enable CORS
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

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.post("/api", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
