import React from "react";
import { LazyMotion, domMax } from "framer-motion";
import { AuthProvider } from "./src/context/auth-context";

const publicRoutes = ["/", "/login"];

const AuthWrapper = ({ children, pathname }) => {
  return (
    <AuthProvider loginRequired={!publicRoutes.includes(pathname)}>
      {children}
    </AuthProvider>
  );
};

export const wrapPageElement = ({ element, props }) => {
  return (
    <LazyMotion strict features={domMax}>
      <AuthWrapper pathname={props.location.pathname}>{element}</AuthWrapper>
    </LazyMotion>
  );
};
