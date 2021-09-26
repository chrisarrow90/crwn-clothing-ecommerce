import { initializeApp } from 'firebase/app'
import { getDoc, setDoc, doc, getFirestore } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'crwn-ecommerce-503cd.firebaseapp.com',
  projectId: 'crwn-ecommerce-503cd',
  storageBucket: 'crwn-ecommerce-503cd.appspot.com',
  messagingSenderId: '761064821181',
  appId: '1:761064821181:web:0b0a20e3dd3d33a11602d4',
  measurementId: 'G-37KFDZMNF8'
}

const firebase = initializeApp(config)
export const db = getFirestore()

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return
  const userRef = doc(db, 'users', userAuth.uid)
  const snapshot = await getDoc(userRef)

  if (!snapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const auth = getAuth()
export const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => signInWithPopup(auth, provider)

export default firebase
