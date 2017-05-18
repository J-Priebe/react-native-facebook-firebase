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

function isUserEqual(facebookAuthResponse, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === Firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          providerData[i].uid === facebookAuthResponse.userID) {
        // We don't need to re-auth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

export const checkFirebaseAuth = (accessTokenData, store) => new Promise((resolve, reject) => {

  if (accessTokenData) {

     // User is signed-in Facebook.
      const unsubscribe = firebaseApp.auth().onAuthStateChanged(function(firebaseUser) {

       unsubscribe();

       // Check if we are already signed-in Firebase with the correct user.
       if (!isUserEqual(accessTokenData, firebaseUser)) {

         // Build Firebase credential with the Facebook auth token.
         var credential = Firebase.auth.FacebookAuthProvider.credential(
             accessTokenData.accessToken);

         // Sign in with the credential from the Facebook user.
         firebaseApp.auth().signInWithCredential(credential)
         .then((newUser) =>
           {

              attachProfileListener(store) 
              store.dispatch( userLoggedIn( newUser ) )
              resolve(newUser)
              return

           }
         ).catch((error) =>
           {

             reject(error)
             return

           }
         )

       } else {

         // User is already signed-in Firebase with the correct user.
         attachProfileListener(store) 
         store.dispatch( userLoggedIn( firebaseUser ) )
         resolve(firebaseUser)
         return
       }


     });
   
   } else {
     // User is signed-out of Facebook.
     firebaseApp.auth().signOut().then(() => 
       {
         store.dispatch( userLoggedOut() )
         resolve(null)
         return
       }
     ).catch((error) => 
       {
         reject(error)
         return
       }
     )
   }

})

// firebase update functions go here
// called by corresponding redux actions (see actions/profile.js)
export function updateFirebaseProfile(updates){
  const currentUser = firebaseApp.auth().currentUser
	const profileRef = firebaseApp.database().ref().child('users').child(currentUser.uid)

  profileRef.update(
	  updates
	)
}

// listen for changes to firebase and dispatch actions to update app state
function attachProfileListener(store){


  const dbRef = firebaseApp.database().ref()
  dbRef.once('value').then(function(snapshot) {

    if (snapshot.hasChild('users')){
      console.log("Users table already exists.")

    }else{

      console.log("Users table does not exist. Creating.")
      let updates = {bio: "ayy lmao"}
      updateFirebaseProfile(updates)
    }

  });

  const profileRef = firebaseApp.database().ref().child('users').child(currentUser().uid)

  profileRef.on('value', (snapshot) => {
    store.dispatch( updateProfileSuccess( snapshot.val() ) )
  })
}
