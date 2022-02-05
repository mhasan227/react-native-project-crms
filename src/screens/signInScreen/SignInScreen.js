import React from 'react' ;
import { View, Text , Image ,StyleSheet,ScrollView} from 'react-native' ;
import { withRouter } from 'react-router-dom'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logo from '../../../assets/images/maxislogo.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import VersionText from '../../components/VersionText';
import {useNavigation} from '@react-navigation/native'
import { ScaledSheet } from 'react-native-size-matters';
//


class SignInScreen extends React.Component {
    
    
    constructor(props) {
        super(props);
        //const showMeasage = this.props.route.params.responseMeasage
        this.state={
            username: '',
            password: '',
            
            test: '',

            enable: '',
            text: 'LOGIN',
            responseMessage: '',
            loggedIn: false

        }
    }

    
    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }

    handleChange = e => {
        this.setState({ username: e.target.value });
      }

    async doLogin(){
       
        if (!this.state.username) {
            this.setState({
                responseMessage: "Username is empty"
            });
            this.setState({
                enable: '',
                text: 'LOGIN'
            });
            return
        }

        if (!this.state.password) {
            this.setState({
                responseMessage: "Password is empty",
            });
            this.setState({
                enable: '',
                text: 'LOGIN'
            });
            return
        }
        
        const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

        try {
            let res = await fetch(gwUrl + 'maxisservice-authentication-service/endpoint/oauth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();

            
            //console.warn(result.result.userId);
            //console.warn(result.result.message);
            if(result.result.result=== 'SUCCESS'){
                this.props.navigation.navigate('HomeScreen',{result});
            }
            this.setInputValue( "responseMessage", result.result.message );
            //this.state.test = result.result.message;
            

            
            

        }catch (e) {
            
        }
        
        //console.warn('api');
        
       
    }

    render() {
        return (
        <View style={styles.root}>
            
            <ScrollView showsVerticalScrollIndicator={false}>
            
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
            <CustomInput placeholder="Username" 
                        
                         setvalue={(text) => this.setState({username: text})}
             />
           
            <CustomInput placeholder="Password"
                        setvalue={(text) => this.setState({password: text})}
                         secureTextEntry={true}
                    />

            <CustomButton  text="Sign In"
                          onPress={() => this.doLogin()}/>

                          {<Text>{this.state.responseMessage}</Text>}
            <VersionText/>
            </ScrollView>    
        </View>
       )
    }
}


const styles = ScaledSheet.create({
    logo: {
      width:'99%',
      height:280,
      padding: '60@s'
    },

    custom:{
        padding: '70@s'
    },
    root:{

        alignItems: 'center',
        padding: '60@s'
        
    }
    
  });

export default SignInScreen