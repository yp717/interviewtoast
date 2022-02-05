export default async function handler(req, res) {
  const emailAddress = req.params.email
  const sgMail = require("@sendgrid/mail")
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  console.log(emailAddress)
  const msg = {
    // Change to your recipient

    to: emailAddress,
    from: "interviewtoast@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent")
    })
    .catch(error => {
      console.error(error)
    })

  return
}
