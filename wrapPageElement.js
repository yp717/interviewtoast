import React from "react"
import { LazyMotion, domMax } from "framer-motion"
import { AuthProvider } from "./src/context/auth-context"
import { SessionProvider } from "./src/context/session-context"
import { ToastProvider } from "./src/context/toast-context"

const publicRoutes = ["/", "/login"]

const AuthWrapper = ({ children, pathname }) => {
  return (
    <AuthProvider loginRequired={!publicRoutes.includes(pathname)}>
      {children}
    </AuthProvider>
  )
}

const SessionWrapper = ({ children, pathname }) => {
  if (!publicRoutes.includes(pathname)) {
    return (
      <SessionProvider loginRequired={!publicRoutes.includes(pathname)}>
        {children}
      </SessionProvider>
    )
  }
  return <>{children}</>
}

export const wrapPageElement = ({ element, props }) => {
  return (
    <LazyMotion strict features={domMax}>
      <AuthWrapper pathname={props.location.pathname}>
        <ToastProvider>
          <SessionWrapper pathname={props.location.pathname}>
            {element}
          </SessionWrapper>
        </ToastProvider>
      </AuthWrapper>
    </LazyMotion>
  )
}
