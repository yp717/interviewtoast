import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

export const uploadFile = async (blob, storagePath, cb) => {
  const storage = getStorage()
  const storageRef = ref(storage, storagePath)
  const upload = await uploadBytes(storageRef, blob)
  return upload
}

export const retrieveFileURL = async (uid,videoID) => {
  const storage = getStorage()
  const gsReference = ref(
    storage,
    `gs://interviewtoast.appspot.com/${uid}/${videoID}.mp4`
  )
  return getDownloadURL(gsReference)
}
