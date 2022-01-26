function clearActiveStreams() {
  let tracks = window.localstream.getTracks()
  let video = document.querySelector("#video-stream")
  tracks.forEach(function (track) {
    if (track.kind === "video") {
      if (track.enabled) {
        track.stop()
        track.enabled = false
      }
    }
  })
  video.srcObject = null
}
export default clearActiveStreams
