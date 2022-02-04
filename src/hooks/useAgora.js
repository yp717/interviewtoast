import { useState, useEffect } from "react"

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
    return [microphoneTrack, cameraTrack]
  }

  async function join(channel, token, uid) {
    console.log("Joining")
    console.log("Client", client)
    if (!client) return
    console.log("Joining")
    const [microphoneTrack, cameraTrack] = await createLocalTracks()

    await client.join(
      process.env.GATSBY_AGORA_APP_ID,
      channel,
      token || null,
      user.uid
    )
    await client.publish([microphoneTrack, cameraTrack])

    window.client = client
    window.videoTrack = cameraTrack

    setJoinState(true)
  }

  async function leave() {
    if (localAudioTrack) {
      await localAudioTrack.stop()
      await localAudioTrack.close()
    }
    if (localVideoTrack) {
      await localVideoTrack.stop()
      await localVideoTrack.close()
    }
    setRemoteUsers([])
    setJoinState(false)
    await client?.leave()
  }

  async function toggleAudio() {
    if (localAudioTrack) {
      localAudioTrack.stop()
    } else {
      const [microphoneTrack, cameraTrack] = await createLocalTracks()
      await client.publish([microphoneTrack, cameraTrack])

      window.client = client
      window.videoTrack = cameraTrack
    }
  }

  async function toggleVideo() {
    if (localVideoTrack) {
      localVideoTrack.stop()
    } else {
      const [microphoneTrack, cameraTrack] = await createLocalTracks()
      await client.publish([microphoneTrack, cameraTrack])

      window.client = client
      window.videoTrack = cameraTrack
    }
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
