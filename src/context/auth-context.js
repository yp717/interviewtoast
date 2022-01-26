import React, { useContext } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signOut } from "firebase/auth"
import { navigate } from "gatsby"
import useFirebase from "../hooks/useFirebase"
import LoadingSpinner from "../components/root/LoadingSpinner"
import Layout from "../components/root/Layout"

const AuthContext = React.createContext()

export const AuthProvider = ({ loginRequired, ...props }) => {
  useFirebase()
  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)

  const logout = () => {
    navigate("/login")
    signOut(auth)
  }

  if (!loginRequired) {
    return <AuthContext.Provider value={{ user, logout }} {...props} />
  }
  if (loading) {
    return (
      <AuthContext.Provider value={{ user: null }} {...props}>
        <Layout>
          <LoadingSpinner text="Slicing The Bread..." />
        </Layout>
      </AuthContext.Provider>
    )
  }
  if (error) {
    return <div>Error.</div>
  }
  if (!user && loginRequired) {
    navigate("/login")
  }

  return <AuthContext.Provider value={{ user, logout }} {...props} />
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
