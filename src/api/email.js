const sgMail = require("@sendgrid/mail")

export default async function handler(req, res) {
  if (req.method === `POST`) {
    const { email } = JSON.parse(req.body)

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    console.log(email)

    const msg = {
      // Change to your recipient
      to: email,
      from: "interviewtoast@gmail.com",
      subject: "Your Interview Toast Meeting Summary",
      html: "<strong>There was text here</strong>", // createDynamicEmailTemplate()
    }

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent")
        res.status(200)
      })
      .catch(error => {
        console.error(error)
        res.status(500).send(error)
      })

    res.status(102)
  }

  return
}
