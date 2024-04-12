import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { updateUsertwo } from '../firebaseConfig';

const EyesCheckScreen = ({ navigation,route})  => {
    const [fontSize, setFontSize] = useState(2); 
    const [responses, setResponses] = useState({}); 
    const { handleLogout,userData } = route.params;
    const increaseFontSize = () => {
      if (fontSize < 100) {
        setFontSize(fontSize + 4);
      }
    };
  
    const handleYes = () => {
      const updatedResponses = { ...responses, [fontSize]: 'Yes' };
      setResponses(updatedResponses); 
      increaseFontSize();
      speak("Yes");
    };

    const speak = (text) => {
        Speech.speak(text); 
      };
  
    const handleNo = () => {
      const updatedResponses = { ...responses, [fontSize]: 'No' };
      setResponses(updatedResponses);
      increaseFontSize();
      speak("No");
    };
  
    const saveData = () => {
      // let formattedResponses = [];
      // Object.keys(responses).forEach((key, index) => {
      //   formattedResponses[index + 1] = responses[key];
      // });
      updateUsertwo(userData["phoneNumber"],fontSize)
      speak("Response Saved");
      //Alert.alert('Formatted Responses', JSON.stringify(formattedResponses));
    };

    const handleReset = () => {
      setResponses({});
      setFontSize(4);
      //alert(JSON.stringify(userData["phoneNumber"]))
      speak("Reset completed");
    };
  
    const getRandomColor = () => {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
      };

      const handleLogoutHome = () => {
        handleLogout();
        navigation.navigate('Login')
      };


    useEffect(() => {
        speak("Welcome , lets check your Eyes Number.");
       speak("Please provide your response if you can see the Number displayed on screen.");
        speak("If number visible clear please select Yes on left side of screen with green colour button");
        speak("If number not visible clear please select NO on left side of screen with red colour button");
    }, []);


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>

    <TouchableOpacity onPress={handleLogoutHome} style={styles.logoutIcon}>
    <Ionicons name="log-out-outline" size={54} color="red" />
  </TouchableOpacity>
  
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Ionicons name="refresh" size={54} color="black" />
      </TouchableOpacity>
      
      <View style={styles.numberContainer}>
      {[...Array(4)].map((_, index) => (
        <Text key={index} style={[styles.number, { fontSize: fontSize, color: getRandomColor() }]}>
          {index + 1}{" "}
        </Text>
      ))}
    </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={handleYes}>
          <Ionicons name="checkmark" size={20} color="white" />
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#F44336' }]} onPress={handleNo}>
          <Ionicons name="close" size={20} color="white" />
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
        <Text style={styles.saveButtonText}>Save and Exit check</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');
const buttonWidth = width * 0.6; 
const buttonHeight = height * 0.4; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  logoutIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  numberContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  number: {
    fontWeight: 'bold',
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    width: buttonWidth,
    height: buttonHeight,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: 'green',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom:10
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EyesCheckScreen;
