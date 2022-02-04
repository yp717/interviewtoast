import { loginToSymbl } from "../utils/loginToSymbl"
import { sendURLToSymbl } from "../utils/sendURLToSymbl"

export default async function handler(req, res) {
  const { accessToken } = await loginToSymbl()
  res.send({ accessToken })
}
