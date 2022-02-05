import React, { useCallback, useContext } from "react"
import LoadingSpinner from "../components/root/LoadingSpinner"
import Layout from "../components/root/Layout"
import { useAuth } from "./auth-context"
import { useUserSessions } from "../utils/dbAdapter"

const SessionContext = React.createContext()

export const SessionProvider = ({ loginRequired, ...props }) => {
  const { user } = useAuth()
  const [loading, error, data, refresh] = useUserSessions(user?.uid)

  const [draftSubmission, setDraftSubmission] = React.useState({
    keywords: [],
    slouchPercent: 0,
  })

  const getSession = useCallback(
    id => {
      return data.find(session => session.sessionID === id)
    },
    [data]
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
        sessions: data,
        refreshSessions: refresh,
        getSession,
        draftSubmission,
        setDraftSubmission,
      }}
      {...props}
    />
  )
}

export const useSessions = () => useContext(SessionContext)

export default SessionContext
