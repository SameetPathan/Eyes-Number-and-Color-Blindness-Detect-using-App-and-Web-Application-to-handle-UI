import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Constants } from 'expo';
import { getDatabase, ref, child, get } from "firebase/database";
import * as Speech from 'expo-speech';

const LoginScreen = ({ navigation,route }) => {

  const { setUserData } = route.params;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const speak = (text) => {
    Speech.speak(text); 
  };

  const handleLogin = async ()  => {
    if (phoneNumber.length !== 10) {
      speak("Please enter a valid 10-digit phone number");
      //Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
      return;
    }

    if (password.length < 8) {
      speak("Password must be at least 8 characters long")
      //Alert.alert('Invalid Password', 'Password must be at least 8 characters long');
      return;
    }

    try {
      const db = getDatabase();
      const snapshot = await get(child(ref(db), `EyesCheckApplication/users/${phoneNumber}`));
  
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.password === password) {
          //Alert.alert('Welcome', 'Login success.');
          speak("Login success");
          setUserData(userData)
          navigation.navigate('Home')
          return userData;
          
        } else {
          speak("Invalid Password");
          //Alert.alert('Error', 'Invalid Password');
          return null;
        }
      } else {
        speak("Invalid Phone Number Details");
       // Alert.alert('Error', 'Invalid Phone Number Details.');
        return null;
      }
    } catch (error) {
      speak("try Again Later");
      //Alert.alert('Error', 'Try again later.');
      return null;
    }

   
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
     
      <View style={styles.container}>
      <FontAwesome name="user-circle-o" size={70} color="white" />
      <Text style={[styles.title, { color: 'white' }]}>Login</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={24} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={24} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="white"
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.createAccountText, { color: 'white' }]}>Don't have an account? Create one</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIcons: {
    alignItems: 'center',
    marginBottom: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'white',
  },
  createAccountText: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
