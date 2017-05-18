'use strict'

import { updateFirebaseProfile } from '../firebase/firebase'


export const UPDATE_PROFILE_BIO = 'UPDATE_PROFILE_BIO'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'


// update user's bio
export function updateBio(newBio) {

  let updates = {bio: newBio}
  updateFirebaseProfile(updates)

  return {
    type: UPDATE_PROFILE_BIO //unsed by reducer
  }
}

// triggers when firebase listener detects change to user's bio
export function updateProfileSuccess(profileData) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    profileData: profileData  // reducer updates state with new bio
  }
}
