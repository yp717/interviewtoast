import { loginToSymbl } from "../../utils/loginToSymbl"
import { sendURLToSymbl } from "../../utils/sendURLToSymbl"

export default async function handler(req, res) {
  const url = req.params.url
  const alt = req.query.alt
  const token = req.query.token

  const indexOfTheThing = url.lastIndexOf("/")
  const newURL =
    url.substring(0, indexOfTheThing) +
    "%2F" +
    url.substring(indexOfTheThing + 1)
  console.log(`${newURL}?alt=${alt}&token=${token}`)
  const { accessToken } = await loginToSymbl()
  const data = await sendURLToSymbl(
    accessToken,
    `${newURL}?alt=${alt}&token=${token}`
  )
  res.send(data)
}
