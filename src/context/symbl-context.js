import React, { useCallback, useContext, useEffect } from "react"
import { useAuth } from "./auth-context"
import { Symbl } from "symbl-chime-adapter"
import { useToast } from "./toast-context"

import { transcriptHandler } from "../utils/transcriptHandler"
import { captioningHandler } from "../utils/captioningHandler"
import { insightHandler } from "../utils/insightHandler"

const SymblContext = React.createContext()

var symbl

export const SymblProvider = ({ meetingID, ...props }) => {
  const [captionHistory, setCaptionHistory] = React.useState([])

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

      symbl = new Symbl(config)
      
      // symbl.subscribeToTranscriptEvents(transcriptHandler(fireToast))
      symbl.subscribeToCaptioningEvents(
        captioningHandler(setCaptionHistory, user.uid)
      )
      // symbl.subscribeToInsightEvents(insightHandler)

      symbl.start()
    })()
  }, [])

  const getConvoID = async () => {
   
    return symbl?.conversationId
    
    // console.log("Summary URL", summaryUrl)
    // return getSummaryUrl
  }

  return (
    <SymblContext.Provider
      value={{ captionHistory, getConvoID }}
      {...props}
    />
  )
}

export const useSymbl = () => useContext(SymblContext)

export default SymblContext
