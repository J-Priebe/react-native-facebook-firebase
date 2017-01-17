'use strict'

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  View,
  Button,
  Dimensions
} from 'react-native';

import { LoginButton, AccessToken} from 'react-native-fbsdk'
import {Actions, ActionConst} from 'react-native-router-flux'

import {firebaseLogout} from '../firebase/firebase'


import styles from '../styles/styles';


export default class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			text: this.props.bio,
			loading: true 
		}
	}

	componentDidMount(){
	  this.setState({
	    loading:false
	  })
	}


	render(){

		const content = (this.props.currentUser == null || this.state.loading )? <ActivityIndicator size="large" /> :
		<View style={{flex: 1, alignItems: 'center' }} >
		<View  style={{flex: 2, justifyContent: 'flex-end' }}>
			<Image
			  style={{width: 150, height: 150}}
			  source={{uri: this.props.currentUser.photoURL}} 
			/>
			<Text style={{fontWeight: 'bold'}} > Bio: </Text><Text> {this.props.bio} </Text>

		</View>
		<View  style={{flex: 1, justifyContent: 'flex-end' }}>
		
			<TextInput
				style={{width: Dimensions.get('window').width - 20}}
				onChangeText={(text) => { 
					this.setState({text}) 
				}}
				value={this.state.text}
			/>
			<Button 
				onPress={() => {this.props.updateBio(this.state.text) }} 
				title="Update Bio" 
			/>
		</View>
		<View  style={{flex: 1, justifyContent: 'flex-end' }}>
			<LoginButton
			  onLogoutFinished={ this.logout.bind(this) }
			/>
		</View>
		</View>

		return(
			<View style={styles.container}>
				{content}
			</View>
		)
	}


	logout(){

		this.setState({
		  loading: true
		})

		firebaseLogout().then((result) => 
		  {
		  	Actions.splash({type: ActionConst.RESET})
		  }
		).catch((error) => 
		  {
		  	console.log("Logout error: " + error)
		  }
		)
	}
}

