
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import Background from "../components/Background";

import firebase from '@firebase/app'
import { ScrollView } from 'react-native-gesture-handler';

export default class ForthPage extends Component{


  constructor() {
    super()
    this.state = {      
      reservas:[],
    }
  }

  componentDidMount () {

    const readUsersData = ()=> {
    const nameRef =  firebase.database().ref('user0001')
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
  const { navigate } = this.props.navigation;


  return (
<Background>
<View>
<ScrollView>
    <Text> Mis reservas: {reservas}</Text>  
    <Button 
        color= 'orange'
        title= 'Ir al Menu Principal'
        onPress={() =>
         {navigate('mainPage')}
        }
         >
         </Button> 
</ScrollView>
  </View>
  </Background>
  )
}
}
