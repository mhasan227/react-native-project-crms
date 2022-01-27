import React from 'react' ;
import { View, Text , StyleSheet, Pressable} from 'react-native' ;


class CustomButton extends React.Component {
    
    render() {
        return (
        <Pressable onPress={this.props.onPress} style={styles.container}>
           <Text style={styles.text}>{this.props.text}</Text>
            
        </Pressable>
       )
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#3498db',
      width: '100%',
      
      
      borderRadius: 5,

      padding: 15,
      marginVertical:5,

      alignItems : 'center'

    },

    text:{

        fontWeight: 'bold',
        color: 'white'
       
    }
    
  });

export default CustomButton