import { useState, useEffect, useCallback } from "react"

import { useAuth } from "../context/auth-context"

import AgoraRTC from "agora-rtc-sdk-ng"

export default function useAgora(client) {
  const { user } = useAuth()
  const [localVideoTrack, setLocalVideoTrack] = useState(undefined)
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined)

  const [joinState, setJoinState] = useState(false)

  const [remoteUsers, setRemoteUsers] = useState([])

  async function createLocalTracks(audioConfig, videoConfig) {
    const [microphoneTrack, cameraTrack] =
      await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig)

    setLocalAudioTrack(microphoneTrack)
    setLocalVideoTrack(cameraTrack)
    console.log("TRACKS INITIALIZED", microphoneTrack, cameraTrack)
    return [microphoneTrack, cameraTrack]
  }

  async function join(channel, token) {
    console.log("Joining")
    console.log("Client", client)
    if (!client) return
    console.log("Joining")
    const [microphoneTrack, cameraTrack] = await createLocalTracks()

    await client.join(
      process.env.GATSBY_AGORA_APP_ID,
      channel,
      token || null,
      user.displayName
    )
    console.log("prepublish")
    await client.publish([microphoneTrack, cameraTrack])

    console.log(microphoneTrack)
    console.log(cameraTrack)
    setJoinState(true)
  }

  const leave = useCallback(
    async (channel, videoRef) => {
      console.log("TRACKS", localAudioTrack, localVideoTrack)
      localAudioTrack?.stop()
      localAudioTrack?.close()
      localVideoTrack?.stop()
      localVideoTrack?.close()

      await client.unpublish(localAudioTrack)
      await client.unpublish(localVideoTrack)

      setRemoteUsers([])
      setJoinState(false)
      await client.leave()

      // const track = videoRef.current.getVideoTracks()[0]
      // const audioTracks = mediaStream.getVideoTracks()
      // track.stop()
    },
    [client, localAudioTrack, localVideoTrack]
  )

  async function toggleAudio() {
    // if (localAudioTrack) {
    // localAudioTrack?._muted = true
    // } else {
    // localAudioTrack?._muted = false
    // }
  }

  // https://docs.agora.io/en/Interactive%20Broadcast/faq/web_camera_light
  async function toggleVideo() {
    // if (localVideoTrack) {
    //   localVideoTrack.stop()
    // } else {
    //   const [microphoneTrack, cameraTrack] = await createLocalTracks()
    //   await client.publish([microphoneTrack, cameraTrack])
    // }
  }

  useEffect(() => {
    if (!client) return

    setRemoteUsers(client.remoteUsers)

    const handleUserPublished = async (user, mediaType) => {
      await client.subscribe(user, mediaType)
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }

    const handleUserUnpublished = user => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }

    const handleUserJoined = user => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }

    const handleUserLeft = user => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }

    client.on("user-published", handleUserPublished)
    client.on("user-unpublished", handleUserUnpublished)
    client.on("user-joined", handleUserJoined)
    client.on("user-left", handleUserLeft)

    client.on("connection-state-change", value => console.log(value))

    return () => {
      client.off("user-published", handleUserPublished)
      client.off("user-unpublished", handleUserUnpublished)
      client.off("user-joined", handleUserJoined)
      client.off("user-left", handleUserLeft)
    }
  }, [client])

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    toggleAudio,
    toggleVideo,
    join,
    remoteUsers,
  }
}
