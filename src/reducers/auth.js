'use strict'

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../actions/auth'


// logged in user's profile
const initialState = {
	currentUser: null
}


export default function reducer(state = initialState, action) {

  switch (action.type) {

	  case USER_LOGGED_IN:

	    return {
	      ...state,
	      currentUser: action.user
	    }

	  case USER_LOGGED_OUT:

	  	return {
	  	  ...state,
	  	  currentUser: null
	  	}

	  
	  default:
	    return state
	  }

}