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


import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import { getAuthState } from '../firebase/firebase'

import styles from '../styles/styles';


export default class Splash extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // set app state according to whether user is logged in or not
    getAuthState(this.props.store).then((user) => {
      if(user) {
        Actions.home({type: ActionConst.RESET})
      }else{
        Actions.login({type: ActionConst.RESET})
      }
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
