export const rtc = {
  // For the local client
  client: null,
  // For the local audio and video tracks
  localAudioTrack: null,
  localVideoTrack: null,
}

export const options = {
  appId: process.env.GATSBY_AGORA_APP_ID,
  // Set the channel name.
  //   channel: "test",
  // Pass a token if your project enables the App Certificate
  // token: process.env.GATSBY_AGORA_RTC_TOKEN,
}
