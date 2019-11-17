import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import Background from "../components/Background";

import firebase from 'firebase'
import { FIREBASE_CONFIG } from "../core/config"

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}
export default class ForthPage extends Component{
  constructor(){
    super()
    this.state = {
      name:'Carlos'
    }
  }
  componentDidMount () {
    const nameRef = firebase.database().ref().child('reservas').child('datos')
    nameRef.on('value', (snapshot)=> {
      this.setState({
        name: snapshot.val()
      })
    })
  }

render(){
  return (
<Background>
<View>
  <Text>Hola {this.state.name}</Text>
  </View>
  </Background>
  )
}
}

