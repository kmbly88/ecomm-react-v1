
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
// https://firebase.google.com/docs/auth/web/start
// https://firebase.google.com/docs/auth/web/google-signin
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,    
    GoogleAuthProvider } from "firebase/auth";

//https://firebase.google.com/docs/firestore/quickstart
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_Wm1IPQbsx8im4KIrM3Nt33xnj1Hq-2o",
  authDomain: "ecomm-v1-db.firebaseapp.com",
  projectId: "ecomm-v1-db",
  storageBucket: "ecomm-v1-db.appspot.com",
  messagingSenderId: "41887452187",
  appId: "1:41887452187:web:0df3d958e9bdb139877cbe"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    // users is collection here
    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }

    }
    return userDocRef;

} 