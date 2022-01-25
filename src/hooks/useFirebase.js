import firebase from "firebase/compat/app"
import "firebase/compat/auth"

export default function useFirebase() {
  const config = {
    apiKey: "AIzaSyA_yYTOs1EtebxkzJGGQi3XXSgcaGez2DI",
    authDomain: "interviewtoast.firebaseapp.com",
    projectId: "interviewtoast",
    storageBucket: "interviewtoast.appspot.com",
    messagingSenderId: "375173186576",
    appId: "1:375173186576:web:f905830e11683f3747b695",
  }
  firebase.initializeApp(config)
  return firebase
}
