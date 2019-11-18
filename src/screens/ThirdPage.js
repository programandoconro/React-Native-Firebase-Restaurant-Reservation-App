import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Background from "../components/Background";

import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}
const writeUserData =(userInfo)=> {
  firebase.database().ref('users/').push({
      userInfo
  }).then((data)=>{
      //success callback
      console.log('data ' , data)
  }).catch((error)=>{
      //error callback
      console.log('error ' , error)
  })
}
export default class ThirdPage extends Component {
  render() {    
    const { navigate } = this.props.navigation;
    const reserva = JSON.stringify(this.props.navigation.state.params.JSON_ListView_Clicked_Item)
    return (
      <Background>
      <View>
        <Text>
          Su reserva está en proceso:
        </Text>
        <Text style={styles.TextStyle}>
        {this.props.navigation.state.params.JSON_ListView_Clicked_Item}
        </Text>  
        <Text style={styles.TextStyle}>
        </Text>
        
        <Button 
        color= 'blue'
        title= 'Enviar'
        onPress={() =>
         {
          writeUserData(reserva.replace(/["{[,\}\]]/g , "")
          .split('type:displayName:TextpropTypes:key:nullref:nullprops:style:backgroundColor:whitechildren:'))
          console.log(reserva.replace(/["{[,\}\]]/g, ""))
          navigate('ForthPage')     
         }
         } >
        </Button>
        <Text> </Text>
        <Button 
        color= 'orange'
        title= 'Ir a Mis Reservas'
        onPress={() =>
         {navigate('ForthPage')}
        }
         >
         </Button> 
        
       
      </View>
      </Background>
    );
  }
}
const styles = StyleSheet.create({
  
  TextStyle: {
    fontSize: 23,
    textAlign: 'center',
    color: 'black',
  },
});
