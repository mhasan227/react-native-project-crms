import React from 'react' ;
import { View, Text , StyleSheet, Pressable,StatusBar,TouchableOpacity,DrawerLayoutAndroid,FlatList,ScrollView, Alert,LogBox,BackHandler,ToastAndroid } from 'react-native' ;
import ToolbarAndroid from '@react-native-community/toolbar-android';
import {useNavigation} from '@react-navigation/native'
import VersionText from '../../components/VersionText';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomInputS from '../../components/CustomInputS';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import Logo from '../../../assets/images/ic_launcher.png';



let colorchange= true;
let c=0;
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
            mReceiptNumber : '',
            collectionAmount: '',
            collectionDate : '',
            issueListView:[],
            collectionListView:[],

            listViewIssueShow: false,
            collectionViewIssueShow: false,
            salerCustomerShow: false,

            salerPhone:'',
            customerName: '',
            customerShop:'',

            responseMessage: '',

            done: '',
            followUps: '',
            TGT:'',
            ACH:'',
            

            
        }
    
        
    }

    issueBtnClick(){
      this.setState({
        onClickedIssue: true
     });
     this.setState({ formsectionissue: true });
     this.setState({ formsectioncollection: false });
     this.setState({ listViewIssueShow: true });
     
     this.setState({ collectionViewIssueShow: false });  // issu button press then no collection list show
     this.issueListViewApi();
    }

    collectionBtnClick(){
      
      this.setState({
        onClickedCollection: true
     });

     this.setState({ formsectionissue: false });
     this.setState({ formsectioncollection: true });
     this.setState({ listViewIssueShow: false });
     this.setState({ collectionViewIssueShow: true });

     this.collectionListViewApi();
     
    }
    handleDropDown1Change(selectedVariantValue) {
        this.setState({ items: selectedVariantValue });
       // alert(selectedVariantValue);
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

    
    componentDidMount() {
     
      this.customer303DropDown();
      //this.midLevel302DropDown();
      this.salesOfficerDropDown();

      //this.issueListViewApi();
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      LogBox.ignoreLogs(['Animated: `useNativeDriver`','componentWillReceiveProps']); // using for off error and warning message;
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

             <View style={styles.dropDownSection} >
                 {this.salerCustomerRender()}
             </View>
            
             <View style={styles.buttonSection} >
             {this.displayJsxMessage()}
             </View>

             <View style={styles.formSection}>
                {this.formSectionIssue()}  
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
                                    <Text>              {/*Invoice Date*/}                       </Text>
                              </View>

                              <View style={styles.width}> 
                                  <DatePicker
                                      style={{width: '310%',
                                              marginLeft:-42,
                                              
                                             }}
                                      date={this.state.invoiceDate}
                                      mode="date"
                                      placeholder="Invoice date"
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
                <View style={styles.backgroundformP2Collect}>  
                    <View style={styles.formSection}>
                       
                          <View style={styles.widthinputCollection}> 
                          <CustomInputS placeholder="Collection amount"
                                setvalue={(text) => this.setState({ collectionAmount: text})}
                                value={this.state.collectionAmount}
                            />
                          </View>
                    



                          <View style={styles.formSectioncol}>
                              <View>
                                <Text>                                          {/*Collection Date*/}</Text>
                              </View>
                              <View style={styles.widthCollection}> 
                                    <DatePicker
                                        style={{width: '355%',marginLeft:-24}}
                                        date={this.state.collectionDate}
                                        mode="date"
                                        placeholder="Collection date"
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
                    </View>
                </View>   
                
                <View style={styles.backgroundformP1Collect}>
                    <View style={styles.formSection}>
                        
                    <View style={styles.widthinputCollectionExtraLarge}> 
                              <CustomInputS placeholder="Receipt"
                                    setvalue={(text) => this.setState({mReceiptNumber: text})}
                                    value={this.state.mReceiptNumber}
                                />
                        </View>
                        
                        <View style={styles.formSectioncol}>
                              <View>
                                <Text>                                  {/*FollowUp Date*/}</Text>
                              </View>
                              <View style={styles.widthFollowUpDate}> 
                                    <DatePicker
                                        style={{width: '400%',marginLeft:-25}}
                                        date={this.state.followDate}
                                        mode="date"
                                        placeholder="FuDT"
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
                                            height: '125%',
                                            marginBottom: -2,
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

                          <View style={styles.widthinputCollectionExtraLarge2}> 
                              <CustomInputS placeholder="Fu.AMT"
                                    setvalue={(text) => this.setState({followAMT: text})}
                                    value={this.state.followAMT}
                                />
                        </View>
                         
                    </View>
                </View>
                
                  <View style={styles.formSection}>
                      <View style={styles.btnwidthCollect}>
                          
                      <CustomButton  text="Save"
                                  onPress={() => this.saveCollectionForm()}/>

                      </View>

                      <View style={styles.width}>
                          
                          {/*<Text>{this.state.collectionResponse}</Text>*/}

                      </View>
                  </View>
            </View> )
      }else{

      }

  }

    displayJsxMessage() {
      var _style,_style1;
      
      if (this.state.onClickedIssue){ // clicked button style
        _style = {
         
          flex: 1,
        
          height: 50,
          backgroundColor: '#3cb371',
          
          marginLeft:10,
          marginRight: 10,
          borderRadius: 5,
  
          padding: 15,
          marginVertical:5,
         
          }

          _style1={ 
            
            flex: 1,   
            
            height: 50,
            backgroundColor: '#a9a9a9',
            marginLeft:10,
            marginRight: 10,
  
            borderRadius: 5,
  
            padding: 15,
            marginVertical:5
            }

            colorchange=true;

          this.state.onClickedIssue=false;

      } else if (this.state.onClickedCollection){ // clicked button style
        _style1 = {
          flex: 1,
        
          height: 50,
        
        
          marginLeft:10,
          marginRight: 10,
          borderRadius: 5,

          padding: 15,
          marginVertical:5,
          backgroundColor: '#3cb371',
          
          
          }

          _style={
            flex: 1,
            weight:50,
            height: 50,
            backgroundColor: '#a9a9a9',
            
            marginLeft:10,
            marginRight: 10,
            borderRadius: 5,
            padding: 15,
            marginVertical:5
            
    
        }
        colorchange=false;
        this.state.onClickedCollection=false;
        //alert(colorchange);
      } 

      else {
        
        if(colorchange===true){
        _style={

            flex: 1,
          
            height: 50,
            backgroundColor: '#3cb371',
            
            marginLeft:10,
            marginRight: 10,
            borderRadius: 5,
    
            padding: 15,
            marginVertical:5,
        }
        _style1={ 
            
          flex: 1,   
          
          height: 50,
          backgroundColor: '#a9a9a9',
          marginLeft:10,
          marginRight: 10,

          borderRadius: 5,

          padding: 15,
          marginVertical:5
          }

        } else{

          _style={

            flex: 1,
          
            height: 50,
            backgroundColor: '#a9a9a9',
            
            marginLeft:10,
            marginRight: 10,
            borderRadius: 5,
    
            padding: 15,
            marginVertical:5,
        }
        _style1={ 
            
          flex: 1,   
          
          height: 50,
          backgroundColor: '#3cb371',
          marginLeft:10,
          marginRight: 10,

          borderRadius: 5,

          padding: 15,
          marginVertical:5
          }
        }
      }
      

      

        if (this.state.flag) {
            return (
            <View style={styles.buttonSection}>
                <View style={_style}>
                    <Pressable 
                        onPress={() => this.issueBtnClick()}
                       >
                        <Text style={styles.centerbold}>Issue</Text>
                    </Pressable>
                </View>
                <View style={_style1}>
                  <Pressable 
                    onPress={() => this.collectionBtnClick()}
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

  salerCustomerRender(){

    if(this.state.salerCustomerShow){
      return(
        <View style={styles.dropDownSection} >
              <View style={styles.formSectioncol}>
                  <View style={styles.formSectionRow}>
                      <Text style={styles.TextdecorBold}>Followups : </Text>
                      <Text style={styles.TextdecorBoldColor}>{this.state.followUps}</Text>
                   </View>
                   <View style={styles.formSectionRow}>
                      <Text style={styles.TextdecorBold}>Done : </Text>
                      <Text style={styles.TextdecorBoldColor}>{this.state.done}</Text>
                    </View>
                    <View style={styles.formSectionRow}>
                      <Text style={styles.TextdecorBold}>TGT : </Text>
                      <Text style={styles.TextdecorBoldColor}>{this.state.TGT}</Text>
                    </View>
                    <View style={styles.formSectionRow}>
                      <Text style={styles.TextdecorBold}>ACH : </Text>
                      <Text style={styles.TextdecorBoldColor}>{this.state.ACH}</Text>
                    </View>
              </View>
              <View style={styles.colpadforshow}>

                   <View style={styles.rowpadforshow}>
                      <Icon 
                          name='briefcase-outline'
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

              </View>
         </View>

      )
    }else{}
  
  }
    
}



const styles = StyleSheet.create({
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
        
        height: 50,
        backgroundColor: '#00ff00',
        
        marginLeft:10,
        marginRight: 10,
        borderRadius: 5,

        padding: 15,
        marginVertical:5,
        

    },

    width28:{
      width: '30%'
    },

    button1: {
      flex: 1,   
      
      height: 50,
      backgroundColor: '#a9a9a9',
      marginLeft:10,
      marginRight: 10,

      borderRadius: 5,

      padding: 15,
      marginVertical:5,

  },

    buttonSection:{
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    
      
  },

  dropDownSection:{

    
    flexDirection: 'row',
    padding: 5,
    
    
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
    width:'45%'
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
      width: '101%',
      //height:50,
      
      borderRadius: 10,

      //padding: 15,
      marginVertical:1,
      backgroundColor: "#00800068"
      

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
  paddingLeft:8,
  marginVertical:5,
  fontSize: 16,
  color : 'black'
  
},

colpadforshow:{
        
  flexDirection: 'column',
  paddingLeft: 50
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
  marginTop: -5,
  padding:5,
  flexDirection: 'row',
  height: 165,
  width : '100%'
},

formSectionlistWidthIssue:{
  marginTop: -20,
  flexDirection: 'row',
  height: 155,
  width : '100%'
},

formSectionRow:{

  flexDirection: 'row',
},
btnwidthSave:{
    //padding: -20,
    marginVertical: 3,
  
    marginRight:-10,
    width:120
},
backgroundformP2Collect:{
    width: '103%',
    
    borderRadius: 10,

    //padding: 15,
    marginVertical: -10,
    backgroundColor: "#ff000070",
    marginRight: 2
},

backgroundformP1Collect:{
  width: '103%',
  
  borderRadius: 10,

  //padding: 15,
  marginVertical: 20,
  backgroundColor: "#00800068"
}

});



export default HomeScreen