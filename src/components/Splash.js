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

    AccessToken.getCurrentAccessToken().then(
      (accessTokenData) => {
        checkFirebaseAuth(accessTokenData, this.props.store).then((user) => {
          
          if (user){
            Actions.home({type: ActionConst.RESET})
          }else{
            Actions.login({type: ActionConst.RESET})
          }

        })

      })
  }

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
