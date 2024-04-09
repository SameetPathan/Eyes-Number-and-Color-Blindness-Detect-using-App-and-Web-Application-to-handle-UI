import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground,ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { register } from '../firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';

const RegisterScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const speak = (text) => {
    Speech.speak(text); 
  };

  const handleRegister = () => {

    if (phoneNumber.length !== 10) {
      //Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
      speak("Please enter a valid 10-digit phone number")
      return;
    }

    if (!fullName.trim()) {
      //Alert.alert('Invalid Full Name', 'Please enter your full name');
      speak("Please enter your full name")
      return;
    }

    if (!age.trim() || isNaN(age)) {
      //Alert.alert('Invalid Age', 'Please enter a valid age');
      speak("Please enter a valid age")
      return;
    }

    if (!gender.trim()) {
      //Alert.alert('Invalid Gender', 'Please select your gender');
      speak("Please select your gender")
      return;
    }

    if (!address.trim()) {
      //Alert.alert('Invalid Address', 'Please enter your address');
      speak("Please enter your address")
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      //Alert.alert('Invalid Email', 'Please enter a valid email address');
      speak("Please enter a valid email address")
      return;
    }

    if (password.length < 8) {
      //Alert.alert('Invalid Password', 'Password must be at least 8 characters long');
      speak("Password must be at least 8 characters long")
      return;
    }

    if (password !== confirmPassword) {
      //Alert.alert('Passwords Mismatch', 'The passwords entered do not match');
      speak("The passwords entered do not match")
      return;
    }
    register(phoneNumber, fullName, age,gender,address,email,password,confirmPassword)
    //Alert.alert('Welcome', 'Register successfuly');
    speak("Register successfuly")
    navigation.navigate('Login')
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
    
      <View style={styles.container}>
      <FontAwesome name="user-circle-o" size={70} color="white" />

        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>
        <View style={styles.inputContainer}>
        <FontAwesome name="transgender" size={24} color="black" style={styles.icon} />
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="address-book" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
      
    </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:25
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
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
    backgroundColor: 'white',
  },
  registerButton: {

    backgroundColor: '#4CAF50', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
