'use strict';

import React, { Component } from 'react'
import {
  AppRegistry
} from 'react-native'

import { Router, Scene, Actions } from 'react-native-router-flux'

import configureStore from './src/store/configureStore'

import { bindActionCreators } from 'redux'

import * as ProfileActions from './src/actions/profile'
import * as AuthActions from './src/actions/auth'

import { Provider, connect } from 'react-redux'

import Splash from './src/components/Splash'
import Login from './src/components/Login'
import Home from './src/components/Home'


export const store = configureStore()


// map Redux state and actions to component props 
function mapStateToProps(state) {
  return {
    bio: state.profile.bio,
    currentUser: state.auth.currentUser
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...AuthActions, ...ProfileActions }, dispatch)

}

const ConnectedRouter = connect(mapStateToProps, mapDispatchToProps)(Router);

// each scene needs to be connected manually to the states/actions they need access to
// put this in their respective files if you prefer
const ConnectedSplash = connect(mapStateToProps, mapDispatchToProps)(Splash);
const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);


// Create scenes once to prevent them being re-created for each render of your Router
const scenes = Actions.create(
    <Scene key='root'>
      <Scene 
          key="splash"
          component={ConnectedSplash}
          title="Loading"
          hideNavBar={true}
      />
      <Scene 
          key="home"
          component={ConnectedHome}
          title="Home"
      />
      <Scene 
          key="login"
          component={ConnectedLogin}
          title="Log In"
      />
    </Scene>
    
)

export default class RNFacebookFirebase extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
      // create router connected to Redux
      <Provider store={store}>
        <ConnectedRouter scenes={scenes} />
      </Provider>
    )
  }
}
AppRegistry.registerComponent('RNFacebookFirebase', () => RNFacebookFirebase);
