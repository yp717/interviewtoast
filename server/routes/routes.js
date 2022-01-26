const express = require("express")
const request = require("request")
const router = express.Router()

// TODO: Define or import API routes here

router.post("/", async (req, res) => {
  const payload = {
    url: "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4",
    // A valid url string. The URL must be a publicly accessible url.
    name: "BusinessMeeting",
    // <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>
    // 'webhookUrl': "https://yourdomain.com/jobs/callback",
    // <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>
    // 'customVocabulary': ['Platform', 'Discussion', 'Targets'],
    // <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.
    // 'confidenceThreshold': 0.6,
    // <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized.>
    // 'detectPhrases': true,
    // <Optional, boolean| detect_phrases |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API.>
    // 'languageCode': "en-US"  // <Optional, boolean| language_code> |code of language of recording.>
  }

  const videoOption = {
    url: "https://api.symbl.ai/v1/process/video/url",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    // qs: {
    //   webhookUrl: webhookUrl,
    //   entities: [{
    //     "customType": "Custom_Entity_Type",
    //     "text": "Custom Entity to be searched in transcript"
    //   }]
    // },
    body: JSON.stringify(payload),
  }

  req.post(videoOption, (err, response, body) => {
    const statusCode = response.statusCode
    if (error || Object.keys(responses).indexOf(statusCode.toString()) !== -1) {
      throw new Error(responses[statusCode])
    }
    console.log("Status code: ", statusCode)
    console.log("Body", response.body)
  })
})

module.exports = router
