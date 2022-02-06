import React, { useCallback, useContext, useEffect } from "react"
import { useAuth } from "./auth-context"
import { Symbl } from "symbl-chime-adapter"
import { useToast } from "./toast-context"

import { transcriptHandler } from "../utils/transcriptHandler"
import { captioningHandler } from "../utils/captioningHandler"
import { insightHandler } from "../utils/insightHandler"

const SymblContext = React.createContext()

export const SymblProvider = ({ meetingID, ...props }) => {
  const [captionHistory, setCaptionHistory] = React.useState([])
  const [symbl, setSymbl] = React.useState(null)
  const { user, role } = useAuth()
  const { fireToast } = useToast()

  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/access-token")
      const { accessToken } = await res.json()

      const config = {
        attendeeId: user.uid,
        meetingId: meetingID,
        userName: user.uid,
        meeting: meetingID,
      }

      Symbl.ACCESS_TOKEN = accessToken
      const symblInstance = {}
      symblInstance.instance = new Symbl(config)
      setSymbl(symblInstance.instance)

      symblInstance.instance.subscribeToCaptioningEvents(
        captioningHandler(setCaptionHistory, user.uid)
      )

      symblInstance.instance.start()
      return () => {
        symblInstance.instance.stop()
        symblInstance.instance.disconnect()
        delete symblInstance.instance
      }
    })()
  }, [meetingID])

  const stopSymbl = () => {
    symbl.stop()
    symbl.disconnect()
    setSymbl(null)
  }

  const getConvoID = async () => {
    return symbl?.conversationId
  }

  return (
    <SymblContext.Provider
      value={{ captionHistory, getConvoID, stopSymbl, symbl }}
      {...props}
    />
  )
}

export const useSymbl = () => useContext(SymblContext)

export default SymblContext
