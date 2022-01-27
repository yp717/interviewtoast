import * as React from "react"
import ReactDOM from "react-dom"

import AgoraRTC from "agora-rtc-sdk-ng"

import { options, rtc } from "../constants/constants"
import Layout from "../components/root/Layout"

const Meeting = () => {
  async function handleSubmit(e) {
    try {
      if (channelRef.current.value === "") {
        return console.log("Please Enter Channel Name")
      }

      setJoined(true)

      rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" })
      const uid = await rtc.client.join(
        options.appId,
        channelRef.current.value,
        options.token,
        null
      )

      // Create an audio track from the audio captured by a microphone
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()
      // Create a video track from the video captured by a camera
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack()

      rtc.localVideoTrack.play("local-stream")

      rtc.client.on("user-published", async (user, mediaType) => {
        // Subscribe to a remote user
        await rtc.client.subscribe(user)
        console.log("subscribe success")
        // console.log(user);

        if (mediaType === "video" || mediaType === "all") {
          // Get `RemoteVideoTrack` in the `user` object.
          const remoteVideoTrack = user.videoTrack
          console.log(remoteVideoTrack)

          // Dynamically create a container in the form of a DIV element for playing the remote video track.
          const PlayerContainer = React.createElement("div", {
            id: user.uid,
            className: "stream",
          })
          ReactDOM.render(
            PlayerContainer,
            document.getElementById("remote-stream")
          )

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
  }

  async function handleLeave() {
    try {
      const localContainer = document.getElementById("local-stream")

      rtc.localAudioTrack.close()
      rtc.localVideoTrack.close()

      setJoined(false)
      localContainer.textContent = ""

      // Traverse all remote users
      rtc.client.remoteUsers.forEach(user => {
        // Destroy the dynamically created DIV container
        const playerContainer = document.getElementById(user.uid)
        playerContainer && playerContainer.remove()
      })

      // Leave the channel
      await rtc.client.leave()
    } catch (err) {
      console.error(err)
    }
  }
  const [joined, setJoined] = React.useState(false)
  const channelRef = React.useRef("")
  const remoteRef = React.useRef("")
  const leaveRef = React.useRef("")

  return (
    <Layout>
      <div className="flex gap-x-4 align-center items-center">
        <input
          type="text"
          ref={channelRef}
          id="channel"
          className="bg-white text-gray-900 rounded-sm"
          placeholder="Enter Channel name"
        />
        <input
          type="submit"
          value="Join"
          onClick={handleSubmit}
          className="btn-primary"
          disabled={joined ? true : false}
        />
        <input
          type="button"
          ref={leaveRef}
          value="Leave"
          onClick={handleLeave}
          className="btn-secondary"
          disabled={joined ? false : true}
        />
      </div>
      {joined ? (
        <>
          <div id="local-stream" className="w-72 h-72 local-stream"></div>
          <div
            id="remote-stream"
            ref={remoteRef}
            className="w-72 h-72 remote-stream"
          ></div>
        </>
      ) : null}
    </Layout>
  )
}

export default Meeting
