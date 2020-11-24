import React, { Component } from 'react';
import client from "./API.js";
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  getData = async ()=>{  
    try{  
      let user = await AsyncStorage.getItem('user'); 
      console.log(JSON.parse(user).username); 
    }  
    catch(error){  
      alert(error); 
    }  
  } 
  
  handleSubmit(event) {
    this.getData();
    event.preventDefault();
    client
      .post("/auth/users/login/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
        AsyncStorage.setItem("user", JSON.stringify(res.data));
        console.log('ovo je preuzeti:');
        this.getData();     
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
          onChange={this.handleChangeUsername}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
          onChange={this.handleChangePassword}
        />
        
        <Button
          title={'Login'}
          style={styles.input}  
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
