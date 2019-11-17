import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import Background from "../components/Background";

import firebase from 'firebase'
import { FIREBASE_CONFIG } from "../core/config";
import { stringify } from 'qs';

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
          writeUserData(stringify(this.props.navigation.state.params.JSON_ListView_Clicked_Item))
          console.log(stringify(this.props.navigation.state.params.JSON_ListView_Clicked_Item))     
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
