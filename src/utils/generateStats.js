// LIVE INTERVIEW
// total silence - long pauses of silence / convo was flowing freely
// You asked X follow up questions
// Key topics
// Key words + transcript
// swearing
// link to symbl summary

// PRACTISE ONLY
// Questions you Practiced with
// Question Duration
// Question Duration vs Length -> Not enough detail in all questions.
// Transcript
// Key topics
// Pace -> members[0].pace.wpm

export const generateStats = data => {
  const {
    date,
    followUps,
    length,
    members,
    messages,
    metrics,
    name,
    sessionQuestions,
    slouchPercent,
    topics,
    questionDuration,
    keywords,
  } = data
  // Calculate Meeting Duration in Seconds
  const meetingDuration = calculateMeetingDuration(length)

  const {
    totalInterruptionSeconds, // score
    interruptionFeedback,
    meetingTalkSeconds,
    meetingSilenceSeconds,
    talkToSilenceRatio, // score
    talkToSilenceFeedback,
  } = calculateSpeakingTimeMetrics(metrics)

  const { slouchFeedback } = calculateSlouching(slouchPercent) // score

  return {
    date,
    messages,
    name,
    meetingDuration,
    totalInterruptionSeconds,
    interruptionFeedback,
    meetingTalkSeconds,
    meetingSilenceSeconds,
    talkToSilenceRatio,
    slouchFeedback,
    sessionQuestions,
    questionDuration,
    topics,
    members,
    transcript: messages
      .map(({ text }) => text)
      .join(" ")
      .toLowerCase(),
    followUps,
    talkToSilenceFeedback,
    keywords,
    slouchPercent: slouchPercent && slouchPercent.toFixed(0),
  }
}

/**
 * Calculates Meeting duration by converting ms to seconds
 */
function calculateMeetingDuration(timeLength) {
  return timeLength / 1000
}

/**
 * Process Symbl speaking time metrics and return data on
 */
function calculateSpeakingTimeMetrics(metrics) {
  let metricsObj = {}

  metrics.forEach(metric => {
    metricsObj[metric.type] = {
      percent: metric.percent,
      seconds: metric.seconds,
    }
  })

  const { totalInterruptionSeconds, interruptionFeedback } =
    calculateInterruptions(metricsObj["total_overlap"].seconds)

  const meetingTalkSeconds = metricsObj["total_talk_time"].seconds
  const meetingSilenceSeconds = metricsObj["total_silence"].seconds

  const talkToSilenceRatio = meetingTalkSeconds / meetingSilenceSeconds
  const talkToSilenceFeedback = evaulateTalkToSilence(talkToSilenceRatio)

  return {
    totalInterruptionSeconds,
    interruptionFeedback,
    meetingTalkSeconds,
    meetingSilenceSeconds,
    talkToSilenceRatio,
    talkToSilenceFeedback,
  }
}

/**
 * Calculate Metrics specifically for interruptions
 * Returns both numeric value and feedback string
 */
function calculateInterruptions(overlapMetrics) {
  const totalInterruptionSeconds = overlapMetrics

  let interruptionFeedback = ""
  if (totalInterruptionSeconds < 10) {
    interruptionFeedback =
      "The candidate was attentive and did not interrupt during the meeting. This usually indicates that both participants are active listeners in the conversation and engaged with the content."
  } else if (totalInterruptionSeconds < 20) {
    interruptionFeedback =
      "The candidate was attentive and did not interrupt much during the meeting. The occassional interruption can happen but the candidate should aim to make sure that the other person in a meeting or conversation finishes their thought before the starting their own"
  } else if (totalInterruptionSeconds > 20) {
    interruptionFeedback =
      "The candidate was highly interruptive was highly interruptive. Frequent interruptions of other people's thoughts are usually indicative that an individual is not listening or unengaged with the conversation."
  }

  return { interruptionFeedback, totalInterruptionSeconds }
}

/**
 * Evaluate total meeting talk to silence ratio
 */
function evaulateTalkToSilence(talkToSilence) {
  console.log(talkToSilence >= 2)
  if (typeof talkToSilence !== "undefined") {
    if (talkToSilence >= 2) {
      return "The conversation was very active and both participants spoke for most of the meeting. There were very few periods of silence in the meeting."
    } else if (talkToSilence >= 1) {
      return "There were some periods of silence but the meeting still had more speaking than silence. This is usually indicative of a free flowing conversation."
    } else if (talkToSilence < 1) {
      return "There were very long periods of silence in your meeting. This usually indicates that something is wrong and there may have been periods of awkward silence."
    }
  }
  return "The Speaking to Silence Ratio could not be evaluated."
}

/**
 * Calculate Slouch Metrics
 * Returns feebdack string
 */
function calculateSlouching(slouchPercent) {
  let slouchFeedback = ""
  if (slouchPercent) {
    switch (slouchPercent) {
      case slouchPercent < 30:
        slouchFeedback =
          "The candidate had great posture throughout the session and maintained good eye contact with the camera."
        break
      case slouchPercent < 60:
        slouchFeedback =
          "The candidates posture was okay but it could use some improvement. Try to maintain eye level with the camera and sit up straight!"
        break
      case slouchPercent > 100:
        slouchFeedback =
          "The candidates posture was poor and could use significant improvement. Improving eye contact and practicing sitting up straight could make the candidate appear much more professional in interviews and calls online."
        break
      default:
        console.error("Shouldn't happen")
    }
  }

  return { slouchFeedback }
}
