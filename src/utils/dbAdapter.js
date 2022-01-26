import React from "react"
import {
  doc,
  setDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import { useEffect } from "react"
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

export const addNewSessionDoc = async (uid, sessionID, length, url, symblData) => {
  const db = getFirestore()
  await setDoc(doc(db, "sessions", sessionID), {
    owner: uid,
    sessionID,
    name: createSessionName(),
    date: new Date(),
    length,
    url,
    proccessed:false,
    ...symblData
  })
}

export const useUserSessions = uid => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [sessions, setSessions] = React.useState([])
  const db = getFirestore()
  useEffect(() => {
    if (uid) {
      const gatherSessions = async () => {
        try {
          const dbRef = collection(db, "sessions")
          const q = query(dbRef, where("owner", "==", uid))
          const querySnapshot = await getDocs(q)
          const sessionList = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            date: doc.data().date.toDate(),
          }))
          setSessions(sessionList)
          setLoading(false)
        } catch (e) {
          setError(e)
          setLoading(false)
        }
      }
      gatherSessions()
    }
  }, [uid])

  const refresh = async () => {
    try {
      setLoading(true)
      const dbRef = collection(db, "sessions")
      const q = query(dbRef, where("owner", "==", uid))
      const querySnapshot = await getDocs(q)
      const sessionList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        date: doc.data().date.toDate(),
      }))
      setSessions(sessionList)
      setLoading(false)
    } catch (e) {
      setError(e)
      setLoading(false)
    }
  }
  return [loading, error, sessions, refresh]
}
