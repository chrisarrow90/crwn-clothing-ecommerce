import { initializeApp } from 'firebase/app'
import { writeBatch, collection, getDoc, setDoc, doc, getFirestore } from 'firebase/firestore'
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const batch = writeBatch(db)

  objectsToAdd.forEach((obj) => {
    console.log(obj)
    const newDocRef = doc(collection(db, collectionKey))
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (Collections) => {
  const transformedCollection = []

  Collections.forEach((doc) => {
    const { title, items } = doc.data()

    transformedCollection.push({
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    })
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

export const auth = getAuth()
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

export default firebase
