import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Background from "../components/Background";

import firebase from '@firebase/app'
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default class ForthPage extends Component{


  constructor() {
    super()
    this.state = {      
      reservas:[],
    }
  }

  componentDidMount () {

    const readUsersData = ()=> {
    const nameRef =  firebase.database().ref('users')
    nameRef.on('value', (snapshot)=> {
      const state = snapshot.val()
      this.state.reservas =  state
      

  })
  }
  readUsersData()
  const pushAdminData = (data)  => {
    this.setState({data })
  }
  pushAdminData(this.state.reservas)
  }
  
render(){
  const reservas =  JSON.stringify(this.state.reservas)
 

  return (
<Background>
<View>
<ScrollView>
    <Text> Hola {reservas}</Text>  
</ScrollView>
  </View>
  </Background>
  )
}
}

