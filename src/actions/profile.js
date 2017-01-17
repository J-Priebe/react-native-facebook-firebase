'use strict'

import { updateFirebaseProfile } from '../firebase/firebase'


export const UPDATE_PROFILE_BIO = 'UPDATE_PROFILE_BIO'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'


export function updateBio(newBio) {

  let updates = {bio: newBio}
  updateFirebaseProfile(updates)

  return {
    type: UPDATE_PROFILE_BIO
  }
}

export function updateProfileSuccess(profileData) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    profileData: profileData
  }
}
