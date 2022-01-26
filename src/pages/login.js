import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/root/Layout"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import useFirebase from "../hooks/useFirebase"
import Logo from "../assets/Logo"

const Login = () => {
  const firebase = useFirebase()
  const firebaseUIConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/dashboard",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
  }
  return (
    <Layout>
      <div className="relative">
        <div className="mx-auto mt-12 md:mt-32 w-96 text-center bg-gray-700 rounded shadow-lg relative z-50">
          <div className="flex items-center justify-center font-bold group text-white border-b  space-x-1 border-gray-600 py-3">
            <h1 className="text-base">Login</h1>
          </div>
          <div className="px-2 py-4">
            <p className="text-sm">
              Login with your favorite provider to get started.
            </p>
            <StyledFirebaseAuth
              uiConfig={firebaseUIConfig}
              firebaseAuth={firebase.auth()}
            />
            <Link to="/privacy" className="text-xs uppercase text-orange-400">
              Privacy Policy
            </Link>
          </div>
        </div>
        <Logo className=" pointer-events-none w-32 h-32 md:h-64 md:w-64 absolute top-0 left-0 -mt-12 opacity-5 rotate-12 " />
        <Logo className="hidden md:block pointer-events-none w-32 h-32 md:h-64 md:w-64 absolute bottom-0 -mb-12 left-full md:left-0 opacity-5 -rotate-45 mb-2 -ml-32 md:ml-64" />
        <Logo
          className=" pointer-events-none w-32 h-32 md:h-64 md:w-64 absolute bottom-0 opacity-5 "
          style={{ left: "80%", transform: "rotate(-75deg)" }}
        />
        <Logo
          className="hidden md:block pointer-events-none w-32 h-32 md:h-64 md:w-64 absolute top-0 opacity-5 "
          style={{ left: "55%", transform: "rotate(75deg)" }}
        />
      </div>
    </Layout>
  )
}

export default Login
