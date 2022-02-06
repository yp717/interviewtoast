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

export const addNewSessionDoc = async (
  uid,
  sessionID,
  length,
  url,
  symblData,
  questions,
  questionDuration
) => {
  const db = getFirestore()
  await setDoc(doc(db, "sessions", sessionID), {
    owner: uid,
    sessionID,
    name: createSessionName(),
    date: new Date(),
    length,
    url,
    processed: false,
    sesionQuestions: questions,
    questionDuration,
    ...symblData,
  })
}

export const addNewMeetingDoc = async (sessionID, symblData, uid) => {
  try {
    const db = getFirestore()
    await setDoc(doc(db, "meetings", sessionID), {
      name: sessionID,
      sessionID,
      date: new Date(),
      processed: true,
      users: [...symblData.members.map(member => member.userId), uid],
      ...symblData,
    })
  } catch (e) {
    console.error(e)
  }
}

export const updateProcessedState = async (
  sessionID,
  symblData,
  slouchPercent
) => {
  const db = getFirestore()
  await setDoc(
    doc(db, "sessions", sessionID),
    {
      processed: true,
      slouchPercent,
      ...symblData,
    },
    { merge: true }
  )
}

export const useUserSessions = uid => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [sessions, setSessions] = React.useState([])
  const [meetings, setMeetings] = React.useState([])
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
        } catch (e) {
          setError(e)
        }
      }
      const gatherMeetings = async () => {
        try {
          const dbRef = collection(db, "meetings")
          const q = query(dbRef, where("users", "array-contains", uid))
          const querySnapshot = await getDocs(q)
          const meetingList = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            date: doc.data().date.toDate(),
          }))
          setMeetings(meetingList)
        } catch (e) {
          console.error(e)
          setError(e)
        }
      }

      ;(async () => {
        await gatherSessions()
        await gatherMeetings()
        setLoading(false)
      })()
    }
  }, [uid, db])

  const refresh = React.useCallback(async () => {
    try {
      console.log("refreshing")
      setLoading(true)
      const dbRef = collection(db, "sessions")
      const q = query(dbRef, where("owner", "==", uid))
      const querySnapshot = await getDocs(q)
      const sessionList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        date: doc.data().date.toDate(),
      }))
      setSessions(sessionList)
      const dbRef2 = collection(db, "meetings")
      const q2 = query(dbRef2, where("users", "array-contains", uid))
      const querySnapshot2 = await getDocs(q2)
      const meetingList = querySnapshot2.docs.map(doc => ({
        ...doc.data(),
        date: doc.data().date.toDate(),
      }))
      setMeetings(meetingList)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }, [uid, db, setLoading, setSessions])
  return [loading, error, sessions, meetings, refresh]
}
