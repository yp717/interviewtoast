import * as React from "react"
import AgoraRTC from "agora-rtc-sdk-ng"
import { rtc, options } from "../../constants/constants"
import { navigate } from "gatsby"
import { useAuth } from "../../context/auth-context"

// need meetingId + token
const MeetingWindow = ({ meetingID, tokenID }) => {
  const {user} = useAuth()
  const remoteRef = React.useRef("")
  const [playerContainerId, setPlayerContainerId] = React.useState(null)

  React.useEffect(() => {
    ;(async () => {
      try {
        //   if (channelRef.current.value === "") {
        //     return console.log("Please Enter Channel Name")
        //   }
        rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" })

        console.log(
          options.appId,
          meetingID,
          tokenID,
          user.uid
        )
        
        const uid = await rtc.client.join(
          options.appId,
          meetingID,
          tokenID,
          user.uid
        )
        console.log(uid)

        // Create an audio track from the audio captured by a microphone
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()

        // Create a video track from the video captured by a camera
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack()

        rtc.localVideoTrack.play("local-stream")

        rtc.client.on("user-published", async (user, mediaType) => {
          // Subscribe to a remote user
          await rtc.client.subscribe(user)

          console.log("Success subscribing to remote user")

          if (mediaType === "video" || mediaType === "all") {
            // Get `RemoteVideoTrack` in the `user` object.
            const remoteVideoTrack = user.videoTrack

            console.log(remoteVideoTrack)

            setPlayerContainerId(user.uid)

            user.videoTrack.play(`${user.uid}`)
          }

          if (mediaType === "audio" || mediaType === "all") {
            // Get `RemoteAudioTrack` in the `user` object.
            const remoteAudioTrack = user.audioTrack
            // Play the audio track. Do not need to pass any DOM element
            remoteAudioTrack.play()
          }
        })

        rtc.client.on("user-unpublished", user => {
          // Get the dynamically created DIV container
          const playerContainer = document.getElementById(user.uid)
          console.log(playerContainer)
          // Destroy the container
          playerContainer.remove()
        })

        // Publish the local audio and video tracks to the channel
        await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack])

        console.log("publish success!")
      } catch (error) {
        console.error(error)
      }
    })()
  })

  async function handleLeave() {
    try {
      // TODO: loading spinner to show you're leaving meeting
      const localContainer = document.getElementById("local-stream")

      rtc.localAudioTrack.close()
      rtc.localVideoTrack.close()

      localContainer.textContent = ""

      // Traverse all remote users
      rtc.client.remoteUsers.forEach(user => {
        // Destroy the dynamically created DIV container
        const playerContainer = document.getElementById(user.uid)
        playerContainer && playerContainer.remove()
      })

      // Leave the channel
      await rtc.client.leave()

      // TODO: navigate from page for now back to the join page
      navigate("/join")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <div id="local-stream" className="w-72 h-72 local-stream"></div>
      <div
        id="remote-stream"
        ref={remoteRef}
        className="w-72 h-72 remote-stream"
      >
        <div id={playerContainerId} className="stream"></div>
      </div>

      {/* Should kill RTC feed and navigate you to another page */}

      <button onClick={handleLeave}>Leave Meeting</button>
    </div>
  )
}

export default MeetingWindow
