export default async function handler(req, res) {
  const emailAddress = req.params.email
  const sgMail = require("@sendgrid/mail")
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  console.log(emailAddress)
  const msg = {
    // Change to your recipient

    to: emailAddress,
    from: "interviewtoast@gmail.com",
    subject: "Your Interview Toast Meeting Summary",
    html: "<strong></strong>", // createDynamicEmailTemplate()
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
  return
}
