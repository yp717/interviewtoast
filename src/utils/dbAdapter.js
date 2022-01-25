import { doc, setDoc, getFirestore } from "firebase/firestore"
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
} from "unique-names-generator"

function createSessionName() {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors],
  })
  return randomName
}

export const addNewSessionDoc = async (uid, sessionID) => {
  const db = getFirestore()
  await setDoc(doc(db, "sessions", sessionID), {
    owner: uid,
    sessionID,
    name: createSessionName(),
  })
}
