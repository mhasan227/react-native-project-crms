import React from 'react' ;
import { View, Text , StyleSheet, TextInput} from 'react-native' ;


class CustomInputS extends React.Component {
    
    render() {
        return (
        <View style={styles.container}>
           <TextInput placeholder={this.props.placeholder} 
                      value={this.props.value}
                      onChangeText={this.props.setvalue}
                     
                      secureTextEntry={this.props.secureTextEntry}
                      style={styles.input}/>
            
        </View>
       )
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '100%',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,

      paddingHorizontal: 10,
      marginVertical:5,
    },

    input:{

       
    }
    
  });

export default CustomInputS