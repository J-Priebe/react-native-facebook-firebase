'use strict'

import React, {Component} from 'react';

import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import { LoginManager, LoginButton, AccessToken} from 'react-native-fbsdk';

import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import {firebaseLogin} from '../firebase/firebase'

import styles from '../styles/styles';


export default class Login extends Component {

  constructor(props){
    super(props);

    this.state =(
      {
        loading: true
      }
    )
  }

  componentDidMount(){
    this.setState({
      loading:false
    })
  }

  render() {
    const content = 
        this.state.loading? <ActivityIndicator size="large" /> :
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Error with facebook login: " + result.error);
              } else if (result.isCancelled) {
                alert("Facebook login cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (accessTokenData) => {
                    this.login(accessTokenData);
                  }
                )
              }
            }
          }
      />

      return (
        <View style={styles.container}>
          <View style={styles.body}>
            {content}
          </View>
        </View>
      )
  }

  login(accessTokenData){

    this.setState({
      loading: true
    })

    firebaseLogin(accessTokenData)
    .then((userData) =>
      {
        Actions.splash()
      }
    ).catch((error) =>
      {
        console.log('login error: ' + error)
      }
    )

  }
}