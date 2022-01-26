require("dotenv").config()

const express = require("express")
const app = express()
const routes = require("./routes/routes")
const { checkConnection } = require("./utils/checkConnection")

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
  checkConnection()
})

// Define base route and return HTML file
app.get("/", function (req, res) {
  res.sendFile("index.html", {
    root: __dirname,
  })
})
