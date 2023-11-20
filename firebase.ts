import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBv-Nq2IWeVpLG3R8TahC2wm2_wC471kA",
    authDomain: "internship-5b3ea.firebaseapp.com",
    projectId: "internship-5b3ea",
    storageBucket: "internship-5b3ea.appspot.com",
    messagingSenderId: "829435639800",
    appId: "1:829435639800:web:78914a1c8663ff53dfc80d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export const initFirebase = () => {
  return app;
};
const db = getFirestore(app)
export {db, auth}