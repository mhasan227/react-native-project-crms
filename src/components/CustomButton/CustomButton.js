import React from 'react' ;
import { View, Text , StyleSheet, Pressable, TouchableOpacity} from 'react-native' ;


class CustomButton extends React.Component {
    
    render() {
        return (
        
        <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
           <Text style={styles.text}>{this.props.text}</Text>
            
        </TouchableOpacity>
        
       )
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#0a254b',
      width: '100%',
      
      
      borderRadius: 5,

      padding: 15,
      marginVertical:5,

      alignItems : 'center'

    },

    text:{

        fontWeight: 'bold',
        color: 'white',
        fontSize: 17
       
    }
    
  });

export default CustomButton