import React, { useCallback, useContext } from "react"
import LoadingSpinner from "../components/root/LoadingSpinner"
import Layout from "../components/root/Layout"
import { useAuth } from "./auth-context"
import { useUserSessions } from "../utils/dbAdapter"

const defaultSubmission = {
  keywords: [],
  slouchPercent: 0,
}

const SessionContext = React.createContext()

export const SessionProvider = ({ loginRequired, ...props }) => {
  const { user } = useAuth()
  const [loading, error, sessions, meetings, refresh] = useUserSessions(user?.uid)

  const [draftSubmission, setDraftSubmission] =
    React.useState(defaultSubmission)

  const resetDraft = useCallback(() => {
    setDraftSubmission(defaultSubmission)
  }, [setDraftSubmission])

  const getSession = useCallback(
    id => {
      return sessions.find(session => session.sessionID === id)
    },
    [sessions]
  )

  const getMeeting = useCallback(
    id => {
      return meetings.find(meetings => meetings.sessionID === id)
    },
    [meetings]
  )

  if (!user || !loginRequired) {
    return <SessionContext.Provider value={{ sessions: [] }} {...props} />
  }

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner text="Turning Bread Into Toast..." />
      </Layout>
    )
  }

  if (error) {
    return <div>Error.</div>
  }

  return (
    <SessionContext.Provider
      value={{
        sessions,
        meetings,
        refreshSessions: refresh,
        getSession,
        getMeeting,
        draftSubmission,
        setDraftSubmission,
        resetDraft,
      }}
      {...props}
    />
  )
}

export const useSessions = () => useContext(SessionContext)

export default SessionContext
