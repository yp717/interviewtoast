import { getStorage, ref, uploadBytes } from "firebase/storage"

export const uploadFile = async (blob, storagePath, cb) => {
  const storage = getStorage()
  const storageRef = ref(storage, storagePath)
  const upload = await uploadBytes(storageRef, blob)
  cb(upload)
}
