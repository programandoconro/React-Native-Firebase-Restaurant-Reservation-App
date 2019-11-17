import React, { Component, memo} from 'react';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Background from "../components/Background";

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      phone :'',
      email :'',
      comensales:'',
      fecha:'',
      hora:'',
      
    };
  } 
  render() {
    const { navigate } = this.props.navigation;
    return (

      <Background>  
      <View> 
      <ScrollView>

      <Text style={{fontStyle:'italic'}}>  </Text>

        <TextInput
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
          placeholder={' Nombre: '}
          style={styles.input}
          placeholderTextColor='black'
          

        />
        <TextInput
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
          placeholder={' Teléfono: '}
          placeholderTextColor='black'
          style={styles.input}
          
        />

        <TextInput
          value={this.state.comensales}
          onChangeText={comensales => this.setState({ comensales })}
          placeholder={' N# Comensales:                                        '}
          style={styles.input}
          placeholderTextColor='black'

        />
       
        <TextInput
          value={this.state.fecha}
          onChangeText={ fecha => this.setState({ fecha })}
          placeholder={' Fecha: '}
          style={styles.input}
          placeholderTextColor='black'          

        />

        <TextInput
          value={this.state.hora}
          onChangeText={hora => this.setState({ hora })}
          placeholder={' Hora: '}
          style={styles.input}
          placeholderTextColor='black'
          
        />
      <View style={styles.button}>
        <Button
          title="Reservar"
          color="#F6820D"
          onPress={() =>
            navigate('SecondPage', {
              JSON_ListView_Clicked_Item: " Nombre: "+ this.state.username +  " Email: " + this.state.email  + " Comensales: " + this.state.comensales+ " Fecha: " + this.state.fecha+  " Hora: "+this.state.hora,

            })            
          }
        />
        </View>
      
      </ScrollView>
</View>
      
</Background>

    );
  }
}
const styles = StyleSheet.create({
  input: {
    flex:1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#D3D3D3',
    borderRadius:20,
        
  },

  button:{
    borderRadius:40,
    backgroundColor:"#F6820D",
    
  },
  
});

export default memo (FirstPage)
