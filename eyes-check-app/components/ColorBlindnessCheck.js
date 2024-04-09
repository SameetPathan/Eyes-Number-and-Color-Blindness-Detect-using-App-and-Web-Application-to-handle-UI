import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Dimensions,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const ColorBlindnessCheck =({ navigation,route})  => {

    const { handleLogout } = route.params;
    const [shapes, setShapes] = useState([
        { id: 1, color: 'lightseagreen', name: 'Circle' },
        { id: 2, color: 'green', name: 'Square' },
        { id: 3, color: 'blue', name: 'Triangle' },
        { id: 4, color: 'cyan', name: 'Pentagon' },
        { id: 5, color: 'magenta', name: 'Hexagon' },
        { id: 6, color: 'yellow', name: 'Octagon' },
        { id: 7, color: 'orange', name: 'Ellipse' },
        { id: 8, color: 'red', name: 'Dolphin' },
        { id: 9, color: 'lightgoldenrodyellow', name: 'Whale' },
        { id: 10, color: 'lightcyan', name: 'Mountain' },
        { id: 11, color: 'lightcoral', name: 'Volcano' },
        { id: 12, color: 'lightsteelblue', name: 'Lighthouse' },
        { id: 13, color: 'lightsalmon', name: 'Castle' },
        { id: 14, color: 'lightgreen', name: 'Knight' },
        { id: 15, color: 'lightyellow', name: 'Dragon' },
        { id: 16, color: 'lightskyblue', name: 'Mermaid' },
        { id: 17, color: 'lightcoral', name: 'Unicorn' },
      ]);
      
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    speak("Welcome to the Color Blindness Check. Please indicate if you can see the color correctly.");
  }, []);

  const speak = (text) => {
    Speech.speak(text);
  };

  const handleResponse = (response) => {
    const updatedResponses = { ...responses, [currentShapeIndex]: response };
    setResponses(updatedResponses);
    speak(response);
    if (currentShapeIndex < shapes.length - 1) {
      setCurrentShapeIndex(currentShapeIndex + 1);
    } else {
      speak("Color blindness check completed.");
    }
  };

   
  const saveData = () => {
    let formattedResponses = {};
    Object.keys(responses).forEach((key, index) => {
      formattedResponses[index + 1] = responses[key];
    });
    speak("Response Saved");
    Alert.alert('Formatted Responses', JSON.stringify(formattedResponses));
  };

  const handleReset = () => {
    setResponses({});
    setCurrentShapeIndex(0);
    speak("Color blindness check reset completed");
  };

  const renderShape = () => {
    const shape = shapes[currentShapeIndex];
    return (
      <TouchableOpacity
        style={[styles.shape, { backgroundColor: shape.color }]}
        onPress={() => handleResponse('Yes')}>
        <Text style={styles.shapeText}>{shape.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleLogoutHome = () => {
    handleLogout();
    navigation.navigate('Login')
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Ionicons name="refresh" size={54} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogoutHome} style={styles.logoutIcon}>
    <Ionicons name="log-out-outline" size={54} color="red" />
  </TouchableOpacity>

      <View style={styles.shapeContainer}>
        {renderShape()}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={() => handleResponse('Yes')}>
          <Ionicons name="checkmark" size={20} color="white" />
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#F44336' }]} onPress={() => handleResponse('No')}>
          <Ionicons name="close" size={20} color="white" />
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>

    

      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
      <Text style={styles.saveButtonText}>Save and Exit check</Text>
    </TouchableOpacity>

    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');
const buttonWidth = width * 0.6; 
const buttonHeight = height * 0.4; 


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoutIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  resetButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  shapeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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
  shape: {
    width: 150,
    height: 150,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shapeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  responseButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  responseButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  responseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'green',
    marginTop: 50,
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

export default ColorBlindnessCheck;
