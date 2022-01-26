require("dotenv").config()
const request = require("request")

const appId = process.env.SYMBL_APP_ID
const appSecret = process.env.SYMBL_APP_SECRET

console.log(appId)

const authOptions = {
  method: "post",
  url: "https://api.symbl.ai/oauth2/token:generate",
  body: {
    type: "application",
    appId: appId,
    appSecret: appSecret,
  },
  json: true,
}

request(authOptions, (err, res, body) => {
  if (err) {
    console.error("error posting json: ", err)
    throw err
  }

  console.log(JSON.stringify(body, null, 2))
})
