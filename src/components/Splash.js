'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  ActivityIndicator,
  View
} from 'react-native';

import { AccessToken } from 'react-native-fbsdk';

import { Actions, ActionConst } from 'react-native-router-flux';

import styles from '../styles/styles';

import {checkFirebaseAuth} from '../firebase/firebase'


export default class Splash extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

    // Check if we have a facebook access token (can be null)
    AccessToken.getCurrentAccessToken().then(
      (accessTokenData) => {

        // returns the current user is facebook token is valid and firebase login was succesful
        checkFirebaseAuth(accessTokenData).then((user) => {
          
          if (user){
            Actions.home({type: ActionConst.RESET})

          }else{ // user needs to login to get a Facebook auth token
            Actions.login({type: ActionConst.RESET})
          }
        })
      })
  }


  // Display loading indicator until redirect to Login or Home
  render(){

    return(
      <View style={styles.container}>
        <View style={styles.body}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    )
  }
}
