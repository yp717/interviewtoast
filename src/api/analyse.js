import { loginToSymbl } from "../utils/loginToSymbl"
import { sendURLToSymbl } from "../utils/sendURLToSymbl"

export default async function handler(req, res) {
  if (req.method === `POST`) {
    const { url } = JSON.parse(req.body)
    const { accessToken } = await loginToSymbl()
    const data = await sendURLToSymbl(accessToken, url)
    res.send(data)
  }
}
