'use strict'

import {
  UPDATE_PROFILE_SUCCESS
} from '../actions/profile'


// logged in user's profile
const initialState = {
	bio: null
}


export default function reducer(state = initialState, action) {

  switch (action.type) {

	  case UPDATE_PROFILE_SUCCESS:

	    return {
	      ...state,
	      bio: action.profileData.bio
	    }
	  
	  default:
	    return state
	  }

}