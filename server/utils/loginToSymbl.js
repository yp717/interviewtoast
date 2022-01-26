require("dotenv").config()

const request = require("request")

async function loginToSymbl() {
  const authOptions = {
    method: "post",
    url: "https://api.symbl.ai/oauth2/token:generate",
    body: {
      type: "application",
      appId: process.env.SYMBL_APP_ID,
      appSecret: process.env.SYMBL_APP_SECRET,
    },
    json: true,
  }

  await request(authOptions, (err, res, body) => {
    if (err) {
      console.error("error posting json: ", err)
      throw err
    }

    console.log(JSON.stringify(body, null, 2))
    return body
  })
}

module.exports = {
  loginToSymbl,
}
