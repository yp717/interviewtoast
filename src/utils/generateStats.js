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

  // Calculate meeting talk to silence ratio

  // Score 1-5
  // OFFLINE
  // 1. posture
  // 2. 
  // ONLINE

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
    transcript: messages.map(({text}) => text).join(" ").toLowerCase(),
    followUps,
    talkToSilenceFeedback,
    keywords
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
    interruptionFeedback = "candidate was attentive and did not interrupt much"
  } else if (totalInterruptionSeconds < 20) {
    interruptionFeedback = "candidate was attentive and did not interrupt much"
  } else if (totalInterruptionSeconds < 30) {
    interruptionFeedback = "candidate was highly interruptive"
  }

  return { interruptionFeedback, totalInterruptionSeconds }
}

/**
 * Evaluate total meeting talk to silence ratio
 */
function evaulateTalkToSilence(talkToSilence) {
  let talkToSilenceFeedback = ""
  if (talkToSilence) {
    switch (talkToSilence) {
      case talkToSilence > 2:
        talkToSilenceFeedback = "The conversation was very active"
        break
      case talkToSilence > 1:
        talkToSilenceFeedback =
          "There were some periods of silence but the meeting still had more speaking than silence"
        break
      case talkToSilence < 1:
        talkToSilenceFeedback =
          "There were very long periods of silence in your meeting."
        break
      default:
        console.error("Shouldn't happen")
    }
  }

  return talkToSilenceFeedback
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
        slouchFeedback = "Candidate has great posture"
        break
      case slouchPercent < 60:
        slouchFeedback = "Candidate posture was okay"
        break
      case slouchPercent > 100:
        slouchFeedback = "Candidate posture was okay"
        break
      default:
        console.error("Shouldn't happen")
    }
  }

  return { slouchFeedback }
}
