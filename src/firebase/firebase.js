'use strict'

import { updateProfileSuccess } from '../actions/profile'
import {userLoggedIn, userLoggedOut} from '../actions/auth'

import * as Firebase from 'firebase';

import config from './config'

// init firebase
const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID
}


const firebaseApp = Firebase.initializeApp(firebaseConfig);

const currentUser = () => {
  return firebaseApp.auth().currentUser
}

export const getAuthState = (store) => new Promise((resolve, reject) => {

  // see https://firebase.google.com/docs/auth/web/manage-users
  const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {

      // User is logged in. connect to firebase and redirect to home
      if (user ) {

        attachProfileListener(store) // listen for changes to profile
        store.dispatch( userLoggedIn( user ) )
        resolve(user)
        return
      } 

      store.dispatch( userLoggedOut() )
      resolve(null)

      unsubscribe()
      return
  });  
})



// login with facebook credential
export const firebaseLogin = (accessTokenData) => new Promise((resolve, reject) => {
  
  let provider = new Firebase.auth.FacebookAuthProvider();

  const credential = Firebase.auth.FacebookAuthProvider.credential(
        accessTokenData.accessToken
  );
   
  firebaseApp.auth().signInWithCredential(credential)
  .then((userData) =>
    {
      resolve(userData)
    }
  ).catch((error) =>
    {
      reject(error)
    }
  )
})


// logout (de-auth facebook) and disconnect listeners
export const firebaseLogout = () => new Promise((resolve, reject) => {
    
    detachProfileListener()

    firebaseApp.auth().signOut().then(() => 
      {
        resolve("logout successful")
      }
    ).catch((error) => 
      {
        reject(error)
      }
    )
})



// firebase update functions go here
export function updateFirebaseProfile(updates){
  const currentUser = firebaseApp.auth().currentUser
	const profileRef = firebaseApp.database().ref().child('users').child(currentUser.uid)

  profileRef.update(
	  updates
	)

}


// listen for changes to firebase and dispatch actions to update app state
function attachProfileListener(store){
  const profileRef = firebaseApp.database().ref().child('users').child(currentUser().uid)

  profileRef.on('value', (snapshot) => {
    store.dispatch( updateProfileSuccess( snapshot.val() ) )
  })
}


// remove listeners
function detachProfileListener(){
  const profileRef = firebaseApp.database().ref().child('users').child(currentUser().uid)
  profileRef.off()
}

