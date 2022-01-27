import React from 'react' ;
import { View, Text , StyleSheet, Pressable,StatusBar,TouchableOpacity,DrawerLayoutAndroid, Alert} from 'react-native' ;
import ToolbarAndroid from '@react-native-community/toolbar-android';
import {useNavigation} from '@react-navigation/native'
import VersionText from '../../components/VersionText';
import Icon from 'react-native-vector-icons/Ionicons';


const navIcon = Icon.getImageSourceSync('md-menu', 24, 'black');
class InformationScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        const data1 = this.props.route.params.data;
       // let data = this.props.params;
        this.openDrawer = this.openDrawer.bind(this);
        this.onToolbarIconClick = this.onToolbarIconClick.bind(this);
        this.state = {

            mydata : data1.result.result.result,
            mydatauser : data1.result.result.userId,
            tanentId : data1.result.result.tanentId,
            userPhone: data1.result.result.userPhone

        }
    
    
    }

    openDrawer() {
        this.drawer.openDrawer();
    }

    onToolbarIconClick(position) {
        if (position === 0) {
          Alert.alert('Warning', 'You pressed settings')
        } else if (position === 1) {
            this.props.navigation.navigate('SignInScreen');
        }
    }

    render() {
        
        var drawer = (
            <View style={styles.drawer}>
              <View style={styles.temp}>
                <TouchableOpacity style={{
            width: 50,
            height: 50,
            marginLeft: 5,
            marginTop : 600
          }} onPress={() => {this.drawer.closeDrawer(); this.props.navigation.navigate('SignInScreen')}}>
                 <Icon 
          name='menu'
          size={25}
          color='white'
          />
            <Text >Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.drawer.closeDrawer(); this.props.navigation.navigate('HomeScreen')}}>
                  <Text>Home</Text>
                </TouchableOpacity>
              </View>
            </View>
        );
        
        return (


            <DrawerLayoutAndroid renderNavigationView={() => drawer} drawerWidth={300} ref={_drawer => (this.drawer = _drawer)}>
                <View>
                    
                    <StatusBar backgroundColor="#0a254b" barStyle="light-content"/>
                    <ToolbarAndroid style={styles.toolbar} title="Maxis Cr.MS" titleColor="white"
                    //logo={require('../../../assets/images/maxislogo.png')}
                    navIcon={navIcon}
                    actions={[
                        { title: 'Settings', iconName: 'md-help', iconSize: 30, show: 'never' },
                        { title: 'Logout', iconName: 'md-help', iconSize:30, show: 'never' },
                    ]}
                    overflowIconName="md-more" onIconClicked={this.openDrawer} onActionSelected={this.onToolbarIconClick}
                    />
                    <Text>Information my app page 3</Text>
                    <Text>Hello your username {this.state.mydatauser}</Text>
                    <Text>Hello your Phone {this.state.userPhone}</Text>
                    <Text>Hello your tanentId : {this.state.tanentId}</Text>
                   
                </View>
            </DrawerLayoutAndroid>
       )
    }
}
const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#3498db',
        height: 56
    },
    drawer: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    temp: {
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-around'
    }
});



export default InformationScreen