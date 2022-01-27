import React from 'react' ;
import { View, Text , StyleSheet, TextInput} from 'react-native' ;
import { Colors } from 'react-native/Libraries/NewAppScreen';


class VersionText extends React.Component {
    
    render() {
        return (
        <View style={styles.container}>
           <Text style={styles.text}>V.1.0.0</Text>
            
        </View>
       )
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      marginRight : 200,
      marginTop: 195,
     
      
    },

    text:{
        textShadowColor: 'black',
        textDecorationColor: 'black',
        fontWeight: 'bold'
       
    }
    
  });

export default VersionText