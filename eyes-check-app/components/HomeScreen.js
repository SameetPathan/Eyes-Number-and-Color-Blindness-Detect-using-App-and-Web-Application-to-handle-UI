import React,{useEffect,useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const HomeScreen = ({ navigation,route}) => {

  const { handleLogout } = route.params;
  const [allChecksCompleted, setAllChecksCompleted] = useState(false);

  const speak = (text) => {
    Speech.speak(text); 
  };

  const handleEyesCheck = () => {
    navigation.navigate('Eyes Number Check')
  };

  const handleColorCheck = () => {
    navigation.navigate('Eyes Colour Check')
  };

  const handleLogoutHome = () => {
    handleLogout();
    navigation.navigate('Login')
  };

  const handleAllChecksCompleted = () => {
    setAllChecksCompleted(true);
    speak('All checks are completed. You are all set to use the web application. Use same userphone number and password.');
  };

  useEffect(() => {
    speak("Please hold your mobile at laptop screen distance.");
}, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={handleLogoutHome} style={styles.logoutIcon}>
          <Ionicons name="log-out-outline" size={40} color="red" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity onPress={handleEyesCheck} style={styles.button}>
            <Ionicons name="eye-outline" size={48} color="black" />
            <Text style={styles.buttonText}>Eyes Check</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleColorCheck} style={styles.button}>
            <Ionicons name="color-palette-outline" size={48} color="black" />
            <Text style={styles.buttonText}>Color Check</Text>
          </TouchableOpacity>

          {allChecksCompleted && (
            <Text style={styles.message}>
              All checks are completed. You are all set to use the web application.
            </Text>
          )}

          <TouchableOpacity onPress={handleAllChecksCompleted} style={styles.button}>
            <Ionicons name="checkmark-circle-outline" size={48} color="black" />
            <Text style={styles.buttonText3}>All Checks Completed</Text>
          </TouchableOpacity>

          
        </ScrollView>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoutIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop:100,
    marginVertical: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText3: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color:"green",
    marginBottom:10
  },
  message: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
