import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Background from "../components/Background";

import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}
const writeUserData =(userInfo)=> {
  firebase.database().ref('user0001').push({
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
    const reserva = JSON.stringify(this.props.navigation.state.params.data)
    return (
      <Background>
      <View>
      <Text>
      Su reserva está en proceso:
      </Text>
      <Text style={styles.TextStyle}>
      {this.props.navigation.state.params.data}
      </Text>  
      <Text style={styles.TextStyle}>
      </Text>
      
      <Button 
      color= 'orange'
      title= 'Enviar'
      onPress={() =>
        {
          writeUserData(reserva.replace(/["{[,\}\]]/g , "")
          .split('type:displayName:TextpropTypes:key:nullref:nullprops:style:backgroundColor:whitechildren:'))
          console.log(reserva.replace(/["{[,\}\]]/g, ""))
          navigate('ForthPage')  
          alert('Su reserva está en proceso')   
        }
      } >
      </Button>
      <Text> </Text>
      
      <Button
      title="Cancelar" 
      color="red"          
      onPress={() =>
        navigate('FirstPage')
        
      } 
      />
      
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
  