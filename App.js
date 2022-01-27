/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  
  StyleSheet,
  Text,
 
  
} from 'react-native';

import SignInScreen from './src/screens/signInScreen';
import Navigation from './src/navigation';


const App = () => {
  
  return (
    <SafeAreaView style={styles.root}>
      
      <Navigation/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
  
});

export default App;
