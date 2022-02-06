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
    if (!client) return
    const [microphoneTrack, cameraTrack] = await createLocalTracks()

    await client.join(
      process.env.GATSBY_AGORA_APP_ID,
      channel,
      token || null,
      user.displayName
    )
    await client.publish([microphoneTrack, cameraTrack])
    setJoinState(true)
  }

  const leave = async () => {
    localAudioTrack?.stop()
    localAudioTrack?.close()
    localVideoTrack?.stop()
    localVideoTrack?.close()
    await client.unpublish(localAudioTrack)
    await client.unpublish(localVideoTrack)
    setLocalAudioTrack(null)
    setLocalVideoTrack(null)
    client.remoteUsers.forEach(user => {
      if (user.hasVideo) {
        removeVideoContainer(user.uid) // Clean up DOM
      }
      client.unsubscribe(user) // unsubscribe from the user
    })

    client.removeAllListeners() // Clean up the client object to avoid memory leaks

    setRemoteUsers([])
    setJoinState(false)
    await client.leave()
  }

  async function toggleAudio() {
    if (localAudioTrack) {
      localAudioTrack?.stop()
      localAudioTrack?.close()
      await client.unpublish(localAudioTrack)
      setLocalAudioTrack(null)
    } else {
      await client.unpublish()
      const [microphoneTrack, videoTrack] = await createLocalTracks()
      await client.publish([microphoneTrack, videoTrack])
    }
  }

  async function toggleVideo() {
    if (localVideoTrack) {
      localVideoTrack?.stop()
      localVideoTrack?.close()
      await client.unpublish(localVideoTrack)
      setLocalVideoTrack(null)
    } else {
      await client.unpublish()
      const [microphoneTrack, videoTrack] = await createLocalTracks()
      await client.publish([microphoneTrack, videoTrack])
    }
  }

  /**
   * @name removeVideoContainer
   * @param uid - uid of the user
   * @description Helper function to remove the video stream from "remote-container".
   */
  function removeVideoContainer(uid) {
    let remDiv = document.getElementById(uid)
    remDiv && remDiv.parentNode.removeChild(remDiv)
  }

  useEffect(() => {
    if (!client) return

    setRemoteUsers(client.remoteUsers)

    const handleUserPublished = async (user, mediaType) => {
      console.log("User published", user, mediaType)
      await client.subscribe(user, mediaType)
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }

    const handleUserUnpublished = async (incomingUser, mediaType) => {
      if (mediaType === "video" && incomingUser.uid === user.uid) {
        client.unpublish(localVideoTrack) // stops sending video to agora
        localVideoTrack?.stop() // stops video track and removes the player from DOM
        localVideoTrack?.close() // Releases the resource
      } else if (mediaType === "audio" && incomingUser.uid === user.uid) {
        client.unpublish(localAudioTrack) // stops sending audio
        localAudioTrack?.stop() // stops audio track
        localAudioTrack?.close() // Releases the resource
      } else {
        client.unpublish() // stops sending video & video to agora
        localVideoTrack?.stop() // stops video track and removes the player from DOM
        localVideoTrack?.close() // Releases the resource
        localAudioTrack?.stop() // stops audio track
        localAudioTrack?.close() // Releases the resource

        // client.remoteUsers.forEach(user => {
        //   if (user.hasAudio) {
        //     removeVideoContainer(user.uid) // Clean up DOM
        //   }
        //   client.unsubscribe(user) // unsubscribe from the user
        // })
        // client.removeAllListeners() // Clean up the client object to avoid memory leaks
      }

      // if (mediaType === "video") {
      // //   removeVideoContainer(user.uid) // removes the injected container
      // }

      // setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }

    const handleUserJoined = user => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }

    const handleUserLeft = user => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }

    client.on("user-published", handleUserPublished)
    // client.on("user-unpublished", handleUserUnpublished)
    client.on("user-joined", handleUserJoined)
    client.on("user-left", handleUserLeft)

    client.on("connection-state-change", value => console.log(value))

    return () => {
      client.off("user-published", handleUserPublished)
      // client.off("user-unpublished", handleUserUnpublished)
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
