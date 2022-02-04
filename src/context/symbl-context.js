import React, { useCallback, useContext, useEffect } from "react"
import { useAuth } from "./auth-context"
import { Symbl } from "symbl-chime-adapter"
import Toast from "../components/root/Toast"
import { useToast } from "./toast-context"

const SymblContext = React.createContext()

var symbl

export const SymblProvider = ({ meetingID, ...props }) => {
  const { user, role } = useAuth()
  const { fireToast } = useToast()
  useEffect(() => {
    ;(async () => {
      if(role === "interviewer") {
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
        const transcriptHandler = {
          onTranscriptCreated: transcript => {
            console.log("On transcript created", transcript)
            fireToast(
              <Toast duration={3500} title={`Transcript Update`} status="speaker">
                <p>{transcript.message}</p>
              </Toast>
            )
          },
        }
        symbl.subscribeToTranscriptEvents(transcriptHandler)
        symbl.start()
      }
    
    })()
  }, [])
  return <SymblContext.Provider value={{}} {...props} />
}

export const useSymbl = () => useContext(SymblContext)

export default SymblContext
