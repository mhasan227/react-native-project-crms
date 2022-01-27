import React from 'react' ;
import { View, Text , StyleSheet, Pressable} from 'react-native' ;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/signInScreen';
import HomeScreen from '../screens/HomeScreen';
import InformationScreen from '../screens/InformationScreen';

const Stack = createNativeStackNavigator();
class Navigation extends React.Component {
    
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="SignInScreen" component={SignInScreen} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="InformationScreen" component={InformationScreen} />

                </Stack.Navigator>
            </NavigationContainer>
       )
    }
}



export default Navigation