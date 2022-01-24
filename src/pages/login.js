import * as React from "react";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import useFirebase from "../hooks/useFirebase";

const Login = () => {
  const firebase = useFirebase();
  const firebaseUIConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/dashboard',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };
  return (
    <Layout>
      <StyledFirebaseAuth
        uiConfig={firebaseUIConfig}
        firebaseAuth={firebase.auth()}
      />
    </Layout>
  );
};

export default Login;
