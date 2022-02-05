export const captioningHandler = (setCaptionHistory, uid) => {
  return {
    onCaptioningToggled: ccEnabled => {
      console.log("Should toggle captioning")
    },
    onCaptionCreated: caption => {
      console.log({ caption })
      if (caption?.data?.isFinal) {
        // Set the Caption to the Updated Caption
        const currentCaption = `${caption?.data?.punctuated?.transcript}`
        setCaptionHistory(captionHistory => [
          ...captionHistory,
          {
            message: currentCaption,
            owner: caption?.data?.user.userId === uid,
          },
        ])
      }
    },
    onCaptionUpdated: caption => {
      console.log({ caption })
      if (caption?.data?.isFinal) {
        // Set the Caption to the Updated Caption
        const currentCaption = `${caption?.data?.punctuated?.transcript}`
        setCaptionHistory(captionHistory => [
          ...captionHistory,
          {
            message: currentCaption,
            owner: caption?.data?.user.userId === uid,
          },
        ])
      }
    },
  }
}
