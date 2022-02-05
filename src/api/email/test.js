export default async function handler(req, res) {
  // const params = req.params[`*`].split(`/`)
  // const recipient = params[0]
  // const html = params[1]

  const sgMail = require("@sendgrid/mail")
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    // Change to your recipient
    to: "yannis.panagis1998@gmail.com",
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
