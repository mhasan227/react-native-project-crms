import React from 'react' ;
import { View, Text , StyleSheet, Pressable,StatusBar,TouchableOpacity,DrawerLayoutAndroid,FlatList,ScrollView, Alert,LogBox,BackHandler,ToastAndroid } from 'react-native' ;
import ToolbarAndroid from '@react-native-community/toolbar-android';
import {useNavigation} from '@react-navigation/native'
import VersionText from '../../components/VersionText';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomInputS from '../../components/CustomInputS';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import Logo from '../../../assets/images/ic_launcher.png';
import { ScaledSheet } from 'react-native-size-matters';



let colorchange= true;
let c=0;
var today = new Date(),

    date = today.getFullYear() + '-' +'0' + (today.getMonth() + 1) + '-' + today.getDate();
const navIcon = Icon.getImageSourceSync('md-menu', 24, 'black');
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        const data = this.props.route.params;
        
       // let data = this.props.params;
        this.openDrawer = this.openDrawer.bind(this);
        this.onToolbarIconClick = this.onToolbarIconClick.bind(this);
        this.handleDropDown1Change = this.handleDropDown1Change.bind(this);
        this.handleDropDown2Change = this.handleDropDown2Change.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
        this.issueBtnClick = this.issueBtnClick.bind(this);
        this.collectionBtnClick= this.collectionBtnClick.bind(this);
        this.handleBackPress=this.handleBackPress.bind(this);
        this.state = {
            userinfo: data,
            mydata : data.result.result.result,
            mydatauser : data.result.result.userId,
            token : data.result.result.authResponse.id_token,
            tenantId: data.result.result.tanentId,
            open: null,
            check: "",
            check1: '',
            alldata:{},
            checkUserCode: [],
            viaarray: [],
            finalArray:[],
            dropDownTwo: [],
           
            item: [],
            items : '',
            itemss : '',

            flag : 0,
            onClickedIssue: false,
            onClickedCollection: false,
            onClickedfollowUp: false,

            invoiceNumber: '',
            creditAmount: '',
            invoiceDate:"",
            followDate:"",
            followAMT :"",

            firstDropdownHandlerId: '',
            twoDropdownCustomerNumber: '',
            issuResponse:'',
            collectionResponse: '',

            formsectionissue: false,
            formsectioncollection: false,
            formsectionFollowUp: false,
            mReceiptNumber : '',
            collectionAmount: '',
            collectionDate : '',
            issueListView:[],
            collectionListView:[],

            listViewIssueShow: false,
            collectionViewIssueShow: false,
            salerCustomerShow: false,
            listViewFollowUpShow: false,

            salerPhone:'',
            customerName: '',
            customerShop:'',

            responseMessage: '',

            done: '',
            followUps: '',
            TGT:'',
            ACH:'',
            active: 0,
            Due: '', 

            followUpList:[],
            timePassed: false,
            currentDate: date,
            backBtnDisable: true,
            
        }
    
        
    }

    issueBtnClick(){
      this.setState({
        onClickedIssue: true
     });
     this.setState({ active: 0 })
     this.setState({ formsectionissue: true });
     this.setState({ formsectioncollection: false });
     this.setState({ listViewIssueShow: true });
     this.setState({ formsectionFollowUp: false });
     this.setState({ listViewFollowUpShow: false});
     this.setState({ collectionViewIssueShow: false });  // issu button press then no collection list show
     this.issueListViewApi();
    }

    followUpBtnClick(){
      this.setState({
        onClickedfollowUp: true
     });
     this.setState({ active: 1 })
     this.setState({ formsectionFollowUp: true });
     this.setState({ formsectionissue: false });
     this.setState({ formsectioncollection: false });
     this.setState({ listViewIssueShow: false });
     this.setState({ listViewFollowUpShow: true});
     this.setState({ collectionViewIssueShow: false });  // issu button press then no collection list show
     //this.issueListViewApi();
     this.followUpListViewApi();
    }

    collectionBtnClick(){
      
      this.setState({
        onClickedCollection: true
     });
     this.setState({ active: 2 })
     this.setState({ formsectionFollowUp: false });
     this.setState({ formsectionissue: false });
     this.setState({ formsectioncollection: true });
     this.setState({ listViewIssueShow: false });
     this.setState({ collectionViewIssueShow: true });
     this.setState({ listViewFollowUpShow: false});

     this.collectionListViewApi();
     
    }
    handleDropDown1Change(selectedVariantValue) {
        this.setState({ items: selectedVariantValue });
        //alert(selectedVariantValue);
        this.setState({firstDropdownHandlerId: selectedVariantValue});
        let demoArray=[];
        for( let i=0;i<this.state.finalArray.length;i++){

            if(selectedVariantValue===this.state.finalArray[i].handelerId){

              demoArray.push({

                    label: this.state.finalArray[i].label,
                    value: this.state.finalArray[i].value,
              });

            }

        }

        for( let i=0;i<this.state.alldata.result.response.length;i++){

          if(selectedVariantValue===this.state.alldata.result.response[i].userId){

            this.setInputValue("salerPhone",this.state.alldata.result.response[i].phoneNumber);
          }

      }
        this.setInputValue("dropDownTwo",demoArray);

        
      }

      handleDropDown2Change(selectedVariantValue) {
        
        this.setState({ itemss: selectedVariantValue });
        this.setState({ flag: 1 });
        //alert(selectedVariantValue);
        this.setState({ twoDropdownCustomerNumber: selectedVariantValue});
       // this.setState({ formsectionissue: true });
     //this.setState({ formsectioncollection: false });
        //this.setState({ formsectionissue: true });

        if(c==0){
          this.setState({ formsectionissue: true });
          this.setState({ listViewIssueShow: true });

        }
        c=c+1;
        if(this.state.formsectioncollection=== true){

              this.state.formsectionissue = false;
        }

        else if( this.state.formsectionissue === true){

          this.state.formsectioncollection = false;

        }

        for(let i = 0 ; i< this.state.finalArray.length; i++){

            if(selectedVariantValue===this.state.finalArray[i].value){

              this.setInputValue("customerName",this.state.finalArray[i].label);
              this.setInputValue("customerShop",this.state.finalArray[i].shop);
            }
        }

        this.setState({ salerCustomerShow: true });
        this.dashBoardInfo();
        this.issueListViewApi();
        this.collectionListViewApi();
        this.dashBoardInfoTotalDue(selectedVariantValue);
        this.setState({ currentDate: date });
        this.followUpListViewApi1stCall(date);
        
        
      }

    setOpen(open) {
        this.setState({
          open
        });
      }

      setInputValue(property, val) {
        this.setState({ [property]: val });
      }
    
      setValue(callback) {
        this.setState(state => ({
          value: callback(state.value)
        }));
      }
    
      setItems(callback) {
        this.setState(state => ({
          items: callback(state.items)
        }));
      }
    

      

    openDrawer() {
     
      this.drawer.openDrawer();
      
    }

    toggleDrawer(){
      this.props.navigation.navigate('DrawerToggle');
    }

    onToolbarIconClick(position) {
        if (position === 0) {
          this.props.navigation.navigate('InformationScreen',{data : this.state.userinfo});
        } else if (position === 1) {
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'SignInScreen' }],
          });
          //this.props.navigation.navigate('SignInScreen');
        }
    }

    
  handleBackPress = () => {

  if(this.state.backBtnDisable)
  {
    return true;
  } 
  else
  {
    return false
  }
}
    
    componentDidMount() {
     
      this.customer303DropDown();
      //this.midLevel302DropDown();
      this.salesOfficerDropDown();
      
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      //this.issueListViewApi();
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      LogBox.ignoreLogs(['Animated: `useNativeDriver`','componentWillReceiveProps']); // using for off error and warning message;
     }

     componentWillUnMount()
    {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

     async dashBoardInfo(){
         let userName=this.state.firstDropdownHandlerId;
      const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

      try {
          let res = await fetch(gwUrl + 'maxisservice-service/endpoint/entity/sosummary', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  token: "Bearer " + this.state.token,
                  userid: this.state.mydatauser
              },
              body: JSON.stringify({

                userId: userName,
                tanentId: this.state.tenantId,
              })
          });

          let result = await res.json();  
          

          
          this.setInputValue("done",result.done);
          this.setInputValue("followUps",result.followUps);
          this.setInputValue("TGT",result.target);
          this.setInputValue("ACH",result.achieved);
 
      }catch (e) {
          
      }

     }


     async collectionListViewApi(){

      const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

      try {
          let res = await fetch(gwUrl + 'maxisservice-service/endpoint/credit-collection/get-tenant-collection', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  token: "Bearer " + this.state.token,
                  userid: this.state.mydatauser
              },
              body: JSON.stringify({

                tenantId: this.state.tenantId,
              })
          });

          let result = await res.json();  
          let array=[];
          let checkIdfromDropDown=this.state.twoDropdownCustomerNumber;
          
          for (let i = 0; i < result.creditCollection.length; i++) {
                if(checkIdfromDropDown===result.creditCollection[i].customer){

                    array.push(result.creditCollection[i]);

                }
          }

          array.reverse();
          this.setInputValue("collectionListView",array);
          
 
      }catch (e) {
          
      }

     }

     async issueListViewApi(){

      const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

      try {
          let res = await fetch(gwUrl + 'maxisservice-service/endpoint/credit-sale/get-tenant-sale', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  token: "Bearer " + this.state.token,
                  userid: this.state.mydatauser
              },
              body: JSON.stringify({

                tenantId: this.state.tenantId,
              })
          });

          let result = await res.json();  
          let array=[];
          let checkIdfromDropDown=this.state.twoDropdownCustomerNumber;
          
          for (let i = 0; i < result.creditSales.length; i++) {
                if(checkIdfromDropDown===result.creditSales[i].customer){

                    array.push(result.creditSales[i]);

                }
          }

          array.reverse();
          this.setInputValue("issueListView",array);
          
 
      }catch (e) {
          
      }

     }

     async followUpListViewApi1stCall(dateToday){

      let date= dateToday.replace(/-/g,'');
      //alert(this.state.currentDate);
       
      //alert(date);

      const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

      try {
          let res = await fetch(gwUrl + 'maxisservice-service/endpoint/followup/get-bh-so-date-range', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  token: "Bearer " + this.state.token,
                  userid: this.state.mydatauser
              },
              body: JSON.stringify({

                businessHouseId: this.state.tenantId,
                saleOfficerId: this.state.firstDropdownHandlerId,
                followUpDateLongFrom: date,
                followUpDateLongTo: date
              })
          });

          let result = await res.json();  
          //alert(result[0].status);
          let array=[];
          let checkIdfromDropDown=this.state.twoDropdownCustomerNumber;
          
          for (let i = 0; i < result.length; i++) {
                

                    array.push(result[i]);

                
          }
          this.setInputValue("followUpList",array);
          
 
      }catch (e) {
          
      }

     }

     async followUpListViewApi(d){

      //let date= "2022-01-13".replace(/-/g,'');
       
      //alert(date);

      const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

      try {
          let res = await fetch(gwUrl + 'maxisservice-service/endpoint/followup/get-bh-so-date-range', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  token: "Bearer " + this.state.token,
                  userid: this.state.mydatauser
              },
              body: JSON.stringify({

                businessHouseId: this.state.tenantId,
                saleOfficerId: this.state.firstDropdownHandlerId,
                followUpDateLongFrom:  d.replace(/-/g,''),
                followUpDateLongTo: d.replace(/-/g,'')
              })
          });

          let result = await res.json();  
          //alert(result[2].customerCredit.name);
          //alert(result.status);
          let array=[];
          let checkIdfromDropDown=this.state.twoDropdownCustomerNumber;
          
          for (let i = 0; i < result.length; i++) {
                

                    array.push(result[i]);

                
          }
          this.setInputValue("followUpList",array);
          
 
      }catch (e) {
          
      }

     }

     async saveCollectionForm(){

      /*this.setState({
        onClickedIssue: true
     });
     this.setState({ formsectionissue: true });
     this.setState({ formsectioncollection: false });*/
      

      let handlerId= this.state.firstDropdownHandlerId;
      let receipt = "";
      let tenantId = this.state.tenantId;
      let userId   =this.state.mydatauser;
      let customer =this.state.twoDropdownCustomerNumber;
      let mReceiptNumber= this.state.mReceiptNumber;
      let collectionDate  = this.state.collectionDate;
      let collectionAmount= this.state.collectionAmount;
      let followDate= this.state.followDate;
      let followAMT= this.state.followAMT;
     
      //alert(followAMT);

      const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

      try {
          let res = await fetch(gwUrl + 'maxisservice-service/endpoint/credit-collection/add', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  token: "Bearer " + this.state.token,
                  userid: userId
              },
              body: JSON.stringify({

                tenantId: tenantId,

                userId: userId,
                receipt: receipt,
                moneyReceiptNumber: mReceiptNumber,
                collectionDate : collectionDate,
                handlerId  :  handlerId,
                
                customer  : customer,
                amount  : collectionAmount,
                followUpDate: followDate,
                followUpAmount: followAMT

              })
          });

          let result = await res.json();         
          this.setInputValue("collectionResponse",result.status);

 
      }catch (e) {
          
      }
      this.collectionListViewApi();
      this.dashBoardInfo();

      this.setInputValue("mReceiptNumber",'');
      this.setInputValue("collectionDate",'');
      this.setInputValue("collectionAmount",'');
      this.setInputValue("followDate",'');
      this.setInputValue("followAMT",'');
     }

     async saveFollowUpForm(){

      /*this.setState({
        onClickedIssue: true
     });
     this.setState({ formsectionissue: true });
     this.setState({ formsectioncollection: false });*/
      

      let handlerId= this.state.firstDropdownHandlerId;
      let receipt = "";
      let tenantId = this.state.tenantId;
      let userId   =this.state.mydatauser;
      let customer =this.state.twoDropdownCustomerNumber;
      let mReceiptNumber= this.state.mReceiptNumber;
      let collectionDate  = this.state.collectionDate;
      let collectionAmount= this.state.collectionAmount;
      let followDate= this.state.followDate;
      let followAMT= this.state.followAMT;
     
      //alert(followAMT);

      const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

      try {
          let res = await fetch(gwUrl + 'maxisservice-service/endpoint/followup/save', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  token: "Bearer " + this.state.token,
                  userid: userId
              },
              body: JSON.stringify({

                businessHouseId: tenantId,

                //userId: userId,
                //receipt: receipt,
                //moneyReceiptNumber: mReceiptNumber,
                //collectionDate : collectionDate,
               // businessHouseId  :  handlerId,
                saleOfficerId : handlerId,
                customerCreditId  : customer,
                //amount  : collectionAmount,
                followUpDateString: followDate,
                followUpAmount: followAMT

              })
          });

          let result = await res.json();         
          this.setInputValue("collectionResponse",result.status);
          //alert(result.status);
 
      }catch (e) {
          
      }
      
      this.setInputValue("mReceiptNumber",'');
      this.setInputValue("collectionDate",'');
      this.setInputValue("collectionAmount",'');
      this.setInputValue("followDate",'');
      this.setInputValue("followAMT",'');
     }


    async saveIssueForm(){

      let handlerId= this.state.firstDropdownHandlerId;
      let saleType = "CREDIT_SALE";
      let tenantId = this.state.tenantId;
      let userId   =this.state.mydatauser;
      let customer =this.state.twoDropdownCustomerNumber;
      let invoiceNumber= this.state.invoiceNumber;
      let invoiceDate  = this.state.invoiceDate;
      let invoiceAmount= this.state.creditAmount;
      

      
      const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

      try {
          let res = await fetch(gwUrl + 'maxisservice-service/endpoint/credit-sale/add', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  token: "Bearer " + this.state.token,
                  userid: userId
              },
              body: JSON.stringify({

                tenantId: tenantId,

                userId: userId,
                saleType: saleType,
                invoiceNumber: invoiceNumber,
                invoiceDate : invoiceDate,
                handlerId  :  handlerId,
                
                customer  : customer,
                amount  : invoiceAmount

              })
          });

          let result = await res.json();         
          this.setInputValue("issuResponse",result.status);
 
      }catch (e) {
          
      }
      //this.state.invoiceNumber.clear();
      this.issueListViewApi(); // api call for after saving user can see instant update.
      this.setInputValue("invoiceNumber",'');
      this.setInputValue("invoiceDate",'');
      this.setInputValue("creditAmount",'');

    }
   

    async salesOfficerDropDown(){

      const gwUrl = 'http://onboard-apigw-maxis.nagadpay.com/';

      try {
          let res = await fetch(gwUrl + 'authorization-service/endpoint/user/list-partner-role', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  token: "Bearer " + this.state.token
              },
              body: JSON.stringify({

                accountId: 'bht02a01',

                onBoardingStatus: 'null',
                role: 'Maxis-Business-House-Sales-Officer',
                userId: 'bht02a01',
                  
              })
          });

          let result = await res.json();

          for (let i = 0; i < result.result.response.length; i++) {
            this.state.item.push({
              label: result.result.response[i].name,
              value: result.result.response[i].userId
            });
          }
          
          this.setInputValue("alldata",result);
            
         /* this.setState({ check1: "myname" }, () => {                              
            //callback
            console.log(this.state.check1) // myname
          });*/
      }catch (e) {
          
      }
  }

    async customer303DropDown(){

    const gwUrl = 'http://onboard-apigw-maxis.nagadpay.com/';

    try {
        let res = await fetch(gwUrl + 'authorization-service/endpoint/user/list-partner-role', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                token: "Bearer " + this.state.token,
               
            },
            body: JSON.stringify({

              accountId: 'bht02a01',

              onBoardingStatus: 'null',
              role: 'Maxis-Services-LM-Customer',
              userId: 'bht02a01',
                
            })
        });

        let result = await res.json();

        for (let i = 0; i < result.result.response.length; i++) {
          this.state.viaarray.push({
            label: result.result.response[i].name,
            value: result.result.response[i].userId,
            shop : result.result.response[i].creatorOrganizationId
          });
        }
        
        //this.setInputValue("alldata",result);
          
       /* this.setState({ check1: "myname" }, () => {                              
          //callback
          console.log(this.state.check1) // myname
        });*/
    }catch (e) {
        
    }

    this.midLevel302DropDown();
  }

    async midLevel302DropDown(){

  const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

  try {
      let res = await fetch(gwUrl + 'maxisservice-authorization-service/endpoint/api/user/list-partner-role-2', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              token: "Bearer " + this.state.token,
              userid: this.state.mydatauser
          },
          body: JSON.stringify({

            accountId: 'bht02a01',

            onBoardingStatus: 'null',
            role: 'Maxis-Services-LM-Customer',
            userId: 'bht02a01',
              
          })
      });

      let result = await res.json();
      
      for (let i = 0; i < result.length; i++) {
        this.state.checkUserCode.push({
          label: result[i].userCode,
          value: result[i].id
        });
      }
      let checkArrayCustomer = this.state.viaarray;
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < checkArrayCustomer.length; j++) {
          if(result[i].userCode === checkArrayCustomer[j].value){
            this.state.finalArray.push({
              label: checkArrayCustomer[j].label,
              value: checkArrayCustomer[j].value,
              handelerId: result[i].handlerId,
              shop: checkArrayCustomer[j].shop
            });
          }
       }
     }
     //console.warn(result[8].userCode);
     //console.warn(checkArrayCustomer[7].value);
      //this.setInputValue("alldata",result);
        
     /* this.setState({ check1: "myname" }, () => {                              
        //callback
        console.log(this.state.check1) // myname
      });*/
  }catch (e) {
      
  }
  }

  async dashBoardInfoTotalDue(selectedVariantValue){
    let userName=this.state.firstDropdownHandlerId;
    let userPhone=this.state.twoDropdownCustomerNumber;
 const gwUrl = 'http://maxisservice-api-gateway-maxis.nagadpay.com/';

 try {
     let res = await fetch(gwUrl + 'maxisservice-service/endpoint/entity-settings/get', {
         method: "POST",
         headers: {
             'Content-Type': 'application/json',
             token: "Bearer " + this.state.token,
             userid: this.state.mydatauser
         },
         body: JSON.stringify({

           //userId: userName,
           tanentId: selectedVariantValue
         })
     });

     let result = await res.json();  
     
     
     
     this.setInputValue("Due",result[0].ledgerSummary);
     
 }catch (e) {
     
 }

}
 /* componentDidUpdate(prevProps, prevState) {
    if (prevState.finalArray !== this.state.finalArray) {
      // this.getAllUnitOfMeasure();
      // uomm=this.state.uom.label;
      this.setState({ finalArray: this.state.finalArray });
    }
  }*/

    render() {
        const { open, value, items,itemss } = this.state;
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
          name='person-circle'
          size={25}
          color='white'
          
          />
            <Text >Log Out</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => { this.drawer.closeDrawer(); this.props.navigation.navigate('InformationScreen',{data : this.state.userinfo})}}>
                  <Text>Information</Text>
                </TouchableOpacity>
              </View>
            </View>
        );
        
        return (

            
            <DrawerLayoutAndroid renderNavigationView={() => drawer} drawerWidth={300} ref={_drawer => (this.drawer = _drawer)}>
               <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    
                    <StatusBar backgroundColor="#0a254b" barStyle="light-content"/>
                    <ToolbarAndroid style={styles.toolbar} title="  Grip" titleColor="white" logo={Logo}
                    //logo={require('../../../assets/images/maxislogo.png')}
                    navIcon={navIcon}
                    actions={[
                        { title: 'Information', iconName: 'md-help', iconSize: 30, show: 'never' },
                        { title: 'Logout', iconName: 'md-help', iconSize:30, show: 'never' },
                    ]}
                    overflowIconName="md-more" onActionSelected={this.onToolbarIconClick}
                    />
                         
                   
                </View>
               
           <View style={styles.dropDownSection} >
                <Picker
                    
                    selectedValue={items}
                    style={styles.dropDown}
                    onValueChange={this.handleDropDown1Change}
                     >
                     <Picker.Item label="Select Sales officer" value="" style={styles.ddcolor} />
                     {this.state.item.map((data, key) =>(
          
                    <Picker.Item key={key} label={data.label} value={data.value} style={styles.ddcolorList} />
                   ))}
                 </Picker>
            
                 <Picker
                    
                    selectedValue={itemss}
                    style={styles.dropDown}
                    onValueChange={this.handleDropDown2Change}
                     >
                     <Picker.Item label="Select Customer officer" value="" style={styles.ddcolor}/>
                      {this.state.dropDownTwo.map((data, key) =>(
          
                    <Picker.Item key={key} label={data.label} value={data.value} style={styles.ddcolorList} />
                    ))}
                  </Picker>
             </View>

             <View style={styles.dashboardSection} >
                 {this.salerCustomerRender()}
             </View>
            
             <View style={styles.buttonSection} >
             {this.displayJsxMessage()}
             </View>

             <View style={styles.formSection}>
                {this.formSectionIssue()}  
             </View>

             <View style={styles.formSection}>
                {this.formsectionFollow()}  
             </View>

             <View style={styles.formSection}>
                {this.formSectionCollection()}
             </View>
            
             <View style={styles.formSection}>
               
                {this.listViewIssueRender()}
                
             </View>

             <View style={styles.formSection}>
               
                {this.listViewCollectionRender()}
                
             </View>

             <View style={styles.formSection}>
               
                {this.listViewFollowUpRender()}
                
             </View>
             </ScrollView>
            </DrawerLayoutAndroid>
            
       )
    }

    formSectionIssue(){

        if(this.state.formsectionissue){
              return(
            <View>
                <View style={styles.backgroundformP1}>
                    <View style={styles.formSection}>
                      
                      <View style={styles.widthinput}> 
                            <CustomInputS placeholder="Invoice"
                                  setvalue={(text) => this.setState({invoiceNumber: text})}
                                  value={this.state.invoiceNumber}
                              />
                        </View>
                        <View style={styles.formSectioncol}>
                              <View>
                                    <Text>             {/*Invoice Date*/}                       </Text>
                              </View>

                              <View style={styles.width}> 
                                  <DatePicker
                                      style={{width: '310%',
                                              marginLeft:-41.5,
                                              
                                             }}
                                      date={this.state.invoiceDate}
                                      mode="date"
                                      placeholder=" Date"
                                      format="   YYYY-MM-DD"
                                      minDate="2016-05-01"
                                      maxDate="2025-06-01"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      
                                      customStyles={{
                                        placeholderText: {
                                          color: 'black'
                                        },
                                        dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                          marginLeft: 36,
                                          
                                        },
                                        dateInput: {
                                          marginBottom: -2,
                                          marginLeft: 36,
                                          height:'125%',
                                          borderColor: 'black',
                                          backgroundColor:'white',
                                          borderRadius:5,
                                          
                                        }
                                        // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({invoiceDate: date})}}
                                      />
                              </View>
                        </View>
                
                            <View style={styles.widthinput}> 
                                <CustomInputS placeholder="Credit AMT"
                                      setvalue={(text) => this.setState({ creditAmount: text})}
                                      value={this.state.creditAmount}
                                  />
                            </View>
                         
                    </View>
                 </View>

        {/*<View style={styles.backgroundformP2}>
            <View style={styles.formSection}>
                
                 <View style={styles.widthinput}> 
                    <CustomInput placeholder="Credit amount"
                          setvalue={(text) => this.setState({ creditAmount: text})}
                          value={this.state.creditAmount}
                      />
                 </View>
                 
                 {/*<View style={styles.formSectioncol}>
                       <View>
                            <Text>              Followup date</Text>
                        </View>

                        <View style={styles.width}> 
                              <DatePicker
                                  style={{width: 200}}
                                  date={this.state.followDate}
                                  mode="date"
                                  placeholder="       Select Followup date"
                                  format="YYYY-MM-DD"
                                  minDate="2016-05-01"
                                  maxDate="2025-06-01"
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  customStyles={{
                                    dateIcon: {
                                      position: 'absolute',
                                      left: 0,
                                      top: 4,
                                      marginLeft: 36
                                    },
                                    dateInput: {
                                      marginLeft: 36,
                                      borderColor: 'black'
                                    }
                                    // ... You can check the source to find the other keys.
                                  }}
                                  onDateChange={(date) => {this.setState({followDate: date})}}
                              />
                         </View>

                 </View>*/}
          {/*  </View>
          </View>*/}
                   
            
         <View style={styles.formSectionOnlySave}>
            <View style={styles.btnwidthSave}>
                 
            <CustomButton  text="Save" 
                           
                         onPress={() => this.saveIssueForm()}/>

            </View>

            <View style={styles.width}>
                 
           {/*<Text>{this.state.issuResponse}</Text>*/}

            </View>
         </View>
      </View> )
        }else{

        }

    }


    formSectionCollection(){

      if(this.state.formsectioncollection){
            return(
                <View>
                <View style={styles.backgroundformP11}>
                    <View style={styles.formSection}>
                      
                      <View style={styles.widthinput}> 
                                
                                <CustomInputS placeholder="C.AMT"
                                  setvalue={(text) => this.setState({ collectionAmount: text})}
                                  value={this.state.collectionAmount}
                              />
                        </View>
                        <View style={styles.formSectioncol}>
                              <View>
                                    <Text>             {/*Invoice Date*/}                       </Text>
                              </View>

                              <View style={styles.width}>

                                        <DatePicker
                                        style={{width: '310%',marginLeft:-41.5}}
                                        date={this.state.collectionDate}
                                        mode="date"
                                        placeholder="C.Date"
                                        format="YYYY-MM-DD"
                                        minDate="2016-05-01"
                                        maxDate="2025-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                          placeholderText: {
                                            color: 'black'
                                          },
                                          dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 36
                                          },
                                          dateInput: {
                                            marginLeft: 36,
                                            height: '125%',
                                            marginBottom: -2,
                                            borderRadius:5,
                                            borderColor: 'black',
                                            backgroundColor: 'white'
                                          }
                                          // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(date) => {this.setState({collectionDate: date})}}
                                        />
                              </View>
                        </View>
                
                            <View style={styles.widthinput}> 
                              <CustomInputS placeholder="Receipt"
                                      setvalue={(text) => this.setState({mReceiptNumber: text})}
                                      value={this.state.mReceiptNumber}
                                  />
                            </View>
                         
                    </View>
                 </View>

        <View style={styles.formSectionOnlySave}>
            <View style={styles.btnwidthSaveC}>
                 
              <CustomButton  text="Save" 
                            
                          onPress={() => this.saveCollectionForm()}/>

            </View>

            <View style={styles.width}>
                 
           {/*<Text>{this.state.issuResponse}</Text>*/}

            </View>
        </View>
                
                  
            </View> )
      }else{

      }

  }

    formsectionFollow(){
          if(this.state.formsectionFollowUp){
            //setTimeout(() => {this.setState({timePassed: true})}, 2000);
            return(
        <View>
            <View style={styles.backgroundformP1Collect}>
            <View style={styles.formSection}>
                
                    <View style={styles.widthCollection}> 
                      
                        <CustomInputS placeholder="AMT"
                        setvalue={(text) => this.setState({followAMT: text})}
                        value={this.state.followAMT}
                        />
                    </View>
                <View style={styles.formSectioncol}>
                      <View>
                        <Text>                                          {/*FollowUp Date*/}</Text>
                      </View>
                      <View style={styles.widthCollection}> 
                      <DatePicker
                                style={{width: '310%',marginLeft:-29,marginVertical: -9}}
                                date={this.state.followDate}
                                mode="date"
                                placeholder="Date"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2025-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                  placeholderText: {
                                    color: 'black'
                                  },
                                  dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 36
                                  },
                                  dateInput: {
                                    height: '125%',
                                    //width: '190%',
                                    //marginBottom: -2,
                                    borderRadius:5,
                                    marginLeft: 36,
                                    borderColor: 'black',
                                    backgroundColor: 'white'
                                  }
                                  // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({followDate: date})}}
                                />
                            
                        </View>
                  </View>

                
                </View>
            </View>
                <View style={styles.formSectionOnlySave}>
                      <View style={styles.btnwidthSaveF}>
                          
                      <CustomButton  text="Save"
                                  onPress={() => this.saveFollowUpForm()}/>

                      </View>

                      <View style={styles.width}>
                      {/*this.state.timePassed == true ? (<Text>INTERNET</Text>) : null}
                          {<Text>{this.state.collectionResponse }</Text>*/}
                          
                      </View>
                </View>
              <View style={styles.borderFooter}></View>
             <View>
              <View style={styles.formSection}>
                <View style={styles.padingLow}>
                  <Text style={styles.ddcolor5}>Filter followup list</Text>
                  
                </View>

                <View style={styles.designDateFilter}>
                <DatePicker
                                style={{width: '100%',marginLeft:-29,marginVertical: -9}}
                                date={this.state.currentDate}
                                mode="date"
                                placeholder="Select date"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2025-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                  placeholderText: {
                                    color: 'black'
                                  },
                                  dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 36
                                  },
                                  dateInput: {
                                    height: '125%',
                                    //width: '190%',
                                    //marginBottom: -2,
                                    borderRadius:5,
                                    marginLeft: 36,
                                    borderColor: 'black',
                                    backgroundColor: 'white'
                                  }
                                  // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({currentDate: date}),this.followUpListViewApi(date)}}
                                />
                </View>
              </View>
            </View> 
    </View>)
  }else{}



}

    displayJsxMessage() {
      var _style,_style1,_style0;
      

        if (this.state.flag) {
            return (
            <View style={styles.buttonSection}>
                <View style={styles.paddingButton0}>
                    <Pressable 
                        onPress={() => this.issueBtnClick()}
                        style={this.state.active === 0 ? styles.button : styles.button1}
                       >
                        <Text style={styles.centerbold}>Issue</Text>
                    </Pressable>
                </View>

                <View style={styles.paddingButton1}>
                    <Pressable 
                        onPress={() => this.followUpBtnClick()}
                        style={this.state.active === 1 ? styles.button : styles.button1}
                       >
                        <Text style={styles.centerbold}>FollowUp</Text>
                    </Pressable>
                </View>

                <View style={styles.paddingButton0}>
                  <Pressable 
                    onPress={() => this.collectionBtnClick()}
                    style={this.state.active === 2 ? styles.button : styles.button1}
                    >
                    <Text style={styles.centerbold}>Collection</Text>
                  </Pressable>
                </View>
                

             </View>
                  )            

        } else {
            
        }
    }

    listViewIssueRender(){
      if (this.state.listViewIssueShow) {

          
        return (
          <View style={styles.formSectionlistWidthIssue}>
           
   
 
          <FlatList nestedScrollEnabled
            data={this.state.issueListView}
            renderItem={({item , index}) => (
              <View style={{backgroundColor: index % 2 == 0  ? "#d3d3d390" : "#FFFFFF",borderRadius:10,
              padding:5, }}> 
                  <View style={styles.listviewRow}>
                      <View style={styles.width28}>
                        <Text style={styles.ddcolor}>  INV.No</Text>
                        <Text style={styles.btnwidth}>{item.invoiceNumber}</Text>
                      </View>
                      
                      <View style={styles.width28}>
                        <Text style={styles.ddcolor}>  Due</Text>
                        <Text style={styles.btnwidth}>{item.remainingAmount}</Text>
                      </View>

                      <View style={styles.width28}>
                        <Text style={styles.ddcolor}>INV.DT</Text>
                        <Text style={styles.btnwidthforList}>{item.invoiceDate}</Text>
                      </View>
                  </View>
                 {/* <View style={styles.listviewRow}>
                      <View style={styles.listviewRow}>
                        <Text style={styles.ddcolor}>Invoice Date :    </Text>
                        <Text style={styles.ddcolor}>{            item.invoiceDate}</Text>
                      </View>
                  </View>
            */}
                 {/* <View style={styles.listviewRow}>
                     <View style={styles.listviewRow}>
                        <Text style={styles.ddcolor}>  INV.DT  :    </Text>
                        <Text style={styles.ddcolor}>{item.invoiceDate}</Text>
                      </View>
                  </View>
            */}
                 {/* <View style={styles.listviewRow}>
                     <View style={styles.listviewRow}>
                        <Text style={styles.ddcolor}>Entry Time    :    </Text>
                        <Text style={styles.ddcolor}>{item.creationTime}</Text>
                      </View>
                  </View>
            */}
              </View>

            )}
          
          />
          
         
       </View>
          
        )
    }else{}
  }

  listViewCollectionRender(){
    if (this.state.collectionViewIssueShow) {
      return (
        <View style={styles.formSectionlistWidth}>
        <FlatList nestedScrollEnabled
          data={this.state.collectionListView}
          renderItem={({item , index}) => (
            <View style={{backgroundColor: index % 2 == 0  ? "#d3d3d390" : "#FFFFFF",borderRadius:10,
            padding:5, }}> 
                <View style={styles.listviewRow}>
                    <View style={styles.width28}>
                      <Text style={styles.ddcolor}> Receipt No  </Text>
                      <Text style={styles.btnwidth}>{item.moneyReceiptNumber}</Text>
                    </View>
                    <View style={styles.width28}>
                      <Text style={styles.ddcolor}>  Amount  </Text>
                      <Text style={styles.btnwidth}>{item.amount}</Text>
                    </View>
                    <View style={styles.width28}>
                      <Text style={styles.ddcolor}>  Date</Text>
                      <Text style={styles.btnwidthforList}>{item.collectionDate}</Text>
                    </View>
                    
                </View>
               {/* <View style={styles.listviewRow}>
                    <View style={styles.listviewRow}>
                      <Text style={styles.ddcolor}>Collection Date :    </Text>
                      <Text style={styles.ddcolor}>{            item.collectionDate}</Text>
                    </View>
                </View>
          */}
               { /*<View style={styles.listviewRow}>
                   <View style={styles.listviewRow}>
                      <Text style={styles.ddcolor}>Entry Time    :    </Text>
                      <Text style={styles.ddcolor}>{item.creationTime}</Text>
                    </View>
                </View>
          */} 
            </View>

          )}
        
        />
        
        
     </View>
        
      )
  }else{}
  }

  listViewFollowUpRender(){
    if (this.state.listViewFollowUpShow) {

        
      return (
        <View style={styles.formSectionlistWidthfollow}>
         
 

        <FlatList nestedScrollEnabled
          data={this.state.followUpList}
          renderItem={({item , index}) => (
            <View style={{backgroundColor: index % 2 == 0  ? "#d3d3d390" : "#FFFFFF",borderRadius:10,
            padding:5, }}> 
                <View style={styles.listviewRow}>
                    <View style={styles.width28}>
                      
                      <Text style={styles.ddcolor}>  Name</Text>
                      <Text style={styles.btnwidth}>{item.customerCredit.name}</Text>
                    </View>
                    
                    <View style={styles.width28}>
                      <Text style={styles.ddcolor}>  Phone</Text>
                      <Text style={styles.btnwidth}>{item.customerCredit.userId}</Text>
                    </View>

                    <View style={styles.width28}>
                      <Text style={styles.ddcolor}>Amount</Text>
                      <Text style={styles.btnwidthforList}>{item.followUpAmount}</Text>
                    </View>
                </View>
               {/* <View style={styles.listviewRow}>
                    <View style={styles.listviewRow}>
                      <Text style={styles.ddcolor}>Invoice Date :    </Text>
                      <Text style={styles.ddcolor}>{            item.invoiceDate}</Text>
                    </View>
                </View>
          */}
               {/* <View style={styles.listviewRow}>
                   <View style={styles.listviewRow}>
                      <Text style={styles.ddcolor}>  INV.DT  :    </Text>
                      <Text style={styles.ddcolor}>{item.invoiceDate}</Text>
                    </View>
                </View>
          */}
               {/* <View style={styles.listviewRow}>
                   <View style={styles.listviewRow}>
                      <Text style={styles.ddcolor}>Entry Time    :    </Text>
                      <Text style={styles.ddcolor}>{item.creationTime}</Text>
                    </View>
                </View>
          */}
            </View>

          )}
        
        />
        
       
     </View>
        
      )
  }else{}
}

  salerCustomerRender(){

    if(this.state.salerCustomerShow){
      let due= -1* this.state.Due;
      return(
        <View style={styles.dashboardSection} >
              <View style={styles.formSectioncolDash}>
                 <View style={styles.flex1}>
                     <View style={styles.paddingUp}>
                        <Text style={styles.dashboard}>Dashboard</Text>
                      <View style={styles.dashboardBorder}>
                          <View style={styles.formSectionRow}>
                              <Icon 
                              name='walk'
                              size={30}
                              color='#4b0082'
                        
                              />
                              <Text style={styles.TextdecorBoldColorWiconLeft}>{this.state.followUps}</Text>
                          </View>
                          <View style={styles.formSectionRow}>
                              <Icon 
                                  name='checkmark-done'
                                  size={30}
                                  color='#4b0082'
                        
                              />
                              <Text style={styles.TextdecorBoldColorWiconLeft}>{this.state.done}</Text>
                            </View>
                            <View style={styles.formSectionRow}>
                          
                             <Icon 
                                  name='trending-up'
                                  size={30}
                                  color='#4b0082'
                        
                              />
                              <Text style={styles.TextdecorBoldColor}>{this.state.TGT}</Text>
                            </View>
                            <View style={styles.formSectionRow}>
                             <Icon 
                                  name='cash-outline'
                                  size={30}
                                  color='#4b0082'
                        
                              />
                              <Text style={styles.TextdecorBoldColor}>{this.state.ACH}</Text>
                            </View>
                        </View>
                      </View>
                  </View>
              </View>
            
              
              <View style={styles.dashboardBorder2}>
                 
                   <View style={styles.rowpadforshow}>
                      <Icon 
                          name='home'
                          size={30}
                          color='#4b0082'
                    
                          />
                      <Text style={styles.TextdecorBoldColorWicon}>{this.state.customerShop}</Text>
                  </View>

                  <View style={styles.rowpadforshow}>
                    <Icon 
                      name='person-circle'
                      size={30}
                      color='#4b0082'
                
                      />
                      <Text style={styles.TextdecorBoldColorWicon}>{this.state.customerName}</Text>
                      
                  </View>
                  <View style={styles.rowpadforshow}>
                      <Icon 
                          name='call'
                          size={30}
                          color='#4b0082'
                    
                          />
                      <Text style={styles.TextdecorBoldColorWicon}>{this.state.twoDropdownCustomerNumber}</Text>
                  </View>

                  <View style={styles.rowpadforshow}>
                      <Icon2 
                          name='cash-minus'
                          size={30}
                          color='#4b0082'
                    
                          />
                      <Text style={styles.TextcolorRed}>{due}</Text>
                  </View>

              </View>
         
        </View>
      )
    }else{}
  
  }
    
}



const styles = ScaledSheet.create({
    toolbar: {
        backgroundColor: '#800080',
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
    },

    button: {
        flex: 1,
        width: '100%',
        height: 50,
        backgroundColor: '#3cb371',
        
        marginLeft:10,
        marginRight: 10,
        borderRadius: 5,

        padding: 15,
        marginVertical:5,
        

    },

    width28:{
      width: '30%'
    },
    row:{
      //flexDirection: 'row-reverse'
    },

    button1: {
      flex: 1,   
      width:'100%',
      height: 50,
      backgroundColor: '#a9a9a9',
      marginLeft:10,
      marginRight: 10,

      borderRadius: 5,

      padding: 15,
      marginVertical:5,

  },

  padingLow:{
      //paddingVertical:10
      width: '50%',
      padding:  15
  },

    buttonSection:{
        
        flexDirection: 'row',
        width: '100%',
        
        //alignItems: 'center',
        //justifyContent: 'center',
    
      
  },

  dropDownSection:{

    
    flexDirection: 'row',
    padding: '5@s',
    
    
},
 
dashboardSection:{

  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '5@s',
  
  width: '100%',
  justifyContent: 'space-evenly',
  alignContent: 'space-around'
},
    dropDown:{

      width: '50%',
      height: 60
    },

    formSection:{
      padding:5,
      flexDirection: 'row',
     
    
},
formSectionOnlySave:{
  padding:5,
  flexDirection: 'row',
  justifyContent:'flex-end',
 

},

formSectioncol:{
        
  flexDirection: 'column',
 

},

  width:{
    padding:5,
    marginRight:10,
    width:'49%'
  },

  widthCollection:{
    padding:5,
    //marginRight:10,
    
    width:'49%'
  },
  widthFollowUpDate:{
    //padding:1,
    marginRight:15,
    width:'35%',
    marginTop: 5
  },

  widthinput:{
    padding:5,
    //marginRight:10,
    marginTop:10,
    width:'31%',
    
    
  },

  btnwidth:{
    padding:10,
    marginRight:-10,
    width: '100%'
  },

  btnwidthforList:{
    paddingTop:10,
   // marginRight:,
    width:'100%'
  },

  btnwidthCollect:{
    marginVertical: -20,
    marginRight:-10,
    width:120
  },

  centerbold:{

      textAlign: 'center',
      textShadowColor: 'black',
      textDecorationColor: 'black',
      fontWeight: 'bold'
  },

  backgroundformP1:{
      width: '99.5%',
      //height:50,
      
      borderRadius: 10,

      paddingBottom: 10,
      paddingLeft: 4,
      //marginVertical:1,
      marginHorizontal:3,
      backgroundColor: "#00800068"
      

  },

  backgroundformP11:{
    width: '99.5%',
    //height:50,
    
    borderRadius: 10,

    paddingBottom: 10,
    paddingLeft: 4,
   // marginVertical: -10,
     marginVertical: -20,
    marginHorizontal:3,
    
    backgroundColor: "#ff000070"
    

},

  backgroundformP2:{
    width: '106.5%',
    
    borderRadius: 10,

    //padding: 15,
    marginVertical:10,
    backgroundColor: "#ff000070"
    

},

ddcolor:{ 
    fontSize: 20,
    fontWeight: 'bold',
},

ddcolor5:{ 
  fontSize: 15,
  fontWeight: 'bold',
  
},

ddcolorList:{ 
  fontSize: 18,
  fontWeight: 'bold',
},

listviewRow:{
  flexDirection: 'row'
},
listviewCol:{
  flexDirection: 'column'
},

listviewDesign:{
  borderRadius:15,
  padding:10,
  backgroundColor:'#d3d3d390'
},

listviewRowDesignEnd:{
  flexDirection: 'row',
  backgroundColor: 'white',
  width:380,
  height:5,
  marginTop:10,
  marginLeft: -9,
  borderRadius:5
},
listSection:{
  padding:5,
  flexDirection: 'row',
  height:150
 

},
widthinputCollection:{
  marginTop:15,
  width:'46%',
},

widthinputCollectionExtraLarge:{
  marginTop:15,
  width:'26.5%'
},

widthinputCollectionExtraLarge2:{
  marginTop:15,
  marginLeft:34,
  width:'26.5%'
},

TextdecorBold:{
  paddingLeft:8,
  paddingVertical:2,
  fontSize: 16,
  fontWeight: 'bold',
  
  
},

TextdecorBoldColor:{
  paddingLeft:8,
  
  fontSize: 18,
  color : 'black'
  
},

TextdecorBoldColorWicon:{
  paddingLeft: '8@s',
  marginVertical: '5@s',
  fontSize: '14@s',
  width: '85%',
  color : 'black'
  
},

TextdecorBoldColorWiconLeft:{
  paddingLeft: '8@s',
  marginVertical: '5@s',
  fontSize: '16@s',
  color : 'black'
  
},

TextcolorRed:{
  paddingLeft:8,
  marginVertical:5,
  fontSize: 16,
  color : 'red'
  
},

colpadforshow:{
        
  flexDirection: 'column',
  paddingLeft: '10@s',
  marginVertical: '10@s'
},
rowpadforshow:{
        
  flexDirection: 'row',
  //paddingLeft: 50
},

formSectionlist:{
  padding:5,
  flexDirection: 'row',
  height: 150,
  
 

},
formSectionlistWidth:{
  marginTop: 55,
  //marginVertical: 30,
  flexDirection: 'row',
  height: 160,
  width : '100%'
},

formSectionlistWidthIssue:{
  marginTop: 20,
  flexDirection: 'row',
  height: 155,
  width : '100%'
},

formSectionlistWidthfollow:{
  marginTop: -25,
  flexDirection: 'row',
  height: 155,
  width : '100%'
},

formSectionRow:{

  flexDirection: 'row',
  paddingLeft: 5,
  paddingRight:5
},
btnwidthSave:{
    //padding: -20,
    position: 'absolute',
    marginVertical: 3,
  
    marginRight:-10,
    width:120
},

btnwidthSaveC:{
  //padding: -20,
  position: 'absolute',
  marginVertical: 25,

  marginRight:-10,
  width:120
},

btnwidthSaveF:{
  //padding: -20,
  //position: 'absolute',
  marginVertical: 10,

  marginRight:-200,
  width:120
  
},
backgroundformP2Collect:{
    width: '100%',
    
    borderRadius: 10,

    //padding: 15,
    marginVertical: -10,
    backgroundColor: "#ff000070",
    marginRight: 2
},

backgroundformP1Collect:{
  width: '104%',
  
  borderRadius: 10,

  //padding: 15,
  marginHorizontal:3,
  marginVertical: -10,
  backgroundColor: "#00800068"
},
dashboardBorder:{
  borderColor: 'black',
  borderRadius: 5,
  borderWidth: 1,
  paddingRight: 0,
},
dashboardBorder2:{
  borderColor: 'black',
  width: '68%',
  borderRadius: 5,
  borderWidth: 1,
  paddingLeft:5
  
  //paddingRight: '10@s',
  //marginRight:  '20@s',
  //paddingLeft:  '-10@s'
},
dashboard:{
  color: 'black',
  fontSize: '17@s',
  paddingLeft: '-5@s',
  width: 'auto',
  
},

formSectioncolDash:{
  flexDirection: "column",
  width: '28%',
  paddingRight: 5,
},
paddingUp:{
  marginVertical: '-20@s',
  paddingBottom: '10@s'
},
paddingButton1:{
  paddingLeft: 10,
  paddingRight: 10,
  width: '32%',
  position: 'relative'
},
paddingButton0:{
  
  width: '31%',
  position: 'relative'
},
designDateFilter:{
  width: '47%',
  //padding: 5,
  //paddingRight: -35,
  marginHorizontal: -30,
  paddingTop: 25
  
},
borderFooter:{
  height:1 ,
  width: '100%',
  marginHorizontal: 10,
  marginVertical: -10,
  backgroundColor: 'black'
},
flex1:{
  flex: 1
}

});



export default HomeScreen