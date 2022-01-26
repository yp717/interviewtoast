import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

export const uploadFile = async (blob, storagePath, cb) => {
  const storage = getStorage()
  const storageRef = ref(storage, storagePath)
  await uploadBytes(storageRef, blob)
  const url = await getDownloadURL(storageRef)
  return url
}

export const retrieveFileURL = async (uid, videoID) => {
  const storage = getStorage()
  const gsReference = ref(
    storage,
    `gs://interviewtoast.appspot.com/${uid}/${videoID}.mp4`
  )
  const url = await getDownloadURL(gsReference)
  return url
}
