import React, {useEffect, useState} from "react"
import {View,Text,ScrollView,StyleSheet,ImageBackground,Image,Button,TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import database, { firebase } from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage'
// import { Center, NativeBaseProvider, Button} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { handleState } from './Login';
import AddProduct from "./AddProduct";
import AddSales from "./AddSales";

import Product from "./Product";
import Sales from "./Sales";
import BusinessDetails from "./BusinessDetails";
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
// import { TouchableOpacity } from "react-native-gesture-handler";
import BusinessListing from "./BusinessListing";
import Inventory from "./Inventory";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test from './Test';
import WebView from "react-native-webview";



const HomeScreen=({ navigation })=> {




  // const SignOutUser = () => {
  //   auth()
  //   .signOut()
  //   .then(navigation.push("Test"));
  // }

  const handlepress = () => {
    navigation.navigate("BusinessListing");
  }

  const handlepressproduct =()=>{
    navigation.push("Product");
  }

  const handlepresssales =()=>{
    navigation.push("Sales");
  }

  return (

    

    // <NativeBaseProvider>

    <ScrollView style={styles.container}>


   
       <View style={styles.header}>
         <ImageBackground source={require('./Dashboardpicture.jpg')} style={styles.picture}/>
       </View>

       <View style={styles.headingcontainer}> 
          <Text style={styles.headingtext}>WELCOME TO BMA DASHBOARD</Text>
       </View>
   
  
     {/* {user.uid}              
     {k}   */}
    
     <View style={styles.footer}>

     <View style={styles.image_containner}>

        <View style={styles.image}>
            <Image style={styles.logo} source={require('../Image/sales.jpeg')} />
        <TouchableOpacity
        onPress={()=>navigation.navigate("Sales")}
        >
          <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    start={{x: 1.0, y: 0}} // Gradient starting coordinates
                    end={{x: 0, y: 0.5}} // Gradient ending coordinates
                    //style={styles.appButtonContainer}
                    style={styles.facebookButton}
                    >
                    {/* <Text style={styles.appButtonText}>Get Started</Text> */}
           <Text style = {{color: "white", fontSize:13,fontWeight: 'bold'}}> SALES </Text>
        </LinearGradient>
        </TouchableOpacity>
        </View>





        <View style={styles.image}>
            <Image style={styles.logo} source={require('../Image/sales_prediction.jpeg')} />
            <TouchableOpacity
        >
          <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    start={{x: 1.0, y: 0}} // Gradient starting coordinates
                    end={{x: 0, y: 0.5}} // Gradient ending coordinates
                    //style={styles.appButtonContainer}
                    style={styles.facebookButton}
                    >
                    {/* <Text style={styles.appButtonText}>Get Started</Text> */}
           <Text style = {{color: "white", fontSize:13,fontWeight: 'bold'}}> SALES PREDICTION </Text>
        </LinearGradient>
        </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.image_containner}>
        <View style={styles.image}>
            <Image style={styles.logo} source={require('../Image/product.jpeg')} />
          <TouchableOpacity
          //onPress={()=>navigation.navigate("Product")}
          >
          <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    start={{x: 1.0, y: 0}} // Gradient starting coordinates
                    end={{x: 0, y: 0.5}} // Gradient ending coordinates
                    //style={styles.appButtonContainer}
                    style={styles.facebookButton}
                    >
                    {/* <Text style={styles.appButtonText}>Get Started</Text> */}
           <Text style = {{color: "white", fontSize:13,fontWeight: 'bold'}}> PRODUCTS </Text>
        </LinearGradient>
        </TouchableOpacity>
        </View>
        <View style={styles.image}>
            <Image style={styles.logo} source={require('../Image/business_listing.jpeg')} />
            <TouchableOpacity
            onPress={()=>navigation.navigate("BusinessListing")}>
          <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    start={{x: 1.0, y: 0}} // Gradient starting coordinates
                    end={{x: 0, y: 0.5}} // Gradient ending coordinates
                    //style={styles.appButtonContainer}
                    style={styles.facebookButton}
                    >
                    {/* <Text style={styles.appButtonText}>Get Started</Text> */}
           <Text style = {{color: "white", fontSize:13,fontWeight: 'bold'}}> BUSINESS LISTING </Text>
        </LinearGradient>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.image_containner}>
        <View style={styles.image}>
            <Image style={styles.logo} source={require('../Image/product_prediction.jpeg')} />
            <TouchableOpacity
            onPress={()=>navigation.push("ImagePicker")}>
          <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    start={{x: 1.0, y: 0}} // Gradient starting coordinates
                    end={{x: 0, y: 0.5}} // Gradient ending coordinates
                    //style={styles.appButtonContainer}
                    style={styles.facebookButton} //ImagePicker
                    >
                    {/* <Text style={styles.appButtonText}>Get Started</Text> */}
           <Text style = {{color: "white", fontSize:13,fontWeight: 'bold'}}> PRODUCTS PREDICTION </Text>
        </LinearGradient>
        </TouchableOpacity>
        </View>
        <View style={styles.image}>
            <Image style={styles.logo} source={require('../Image/Inventory.jpeg')} />
            <TouchableOpacity 
            onPress={()=>navigation.navigate("Inventory")}>
          <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    start={{x: 1.0, y: 0}} // Gradient starting coordinates
                    end={{x: 0, y: 0.5}} // Gradient ending coordinates
                    //style={styles.appButtonContainer}
                    style={styles.facebookButton}
                    >
                    {/* <Text style={styles.appButtonText}>Get Started</Text> */}
           <Text style = {{color: "white", fontSize:13,fontWeight: 'bold'}}> INVENTORY </Text>
        </LinearGradient>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.image_containner}>
        <View style={styles.image}>
            <Image style={styles.logo} source={require('../Image/analytics.jpeg')} />
            <TouchableOpacity onPress={()=>navigation.navigate("FacebookInsights")}>
          <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    start={{x: 1.0, y: 0}} // Gradient starting coordinates
                    end={{x: 0, y: 0.5}} // Gradient ending coordinates
                    //style={styles.appButtonContainer}
                    style={styles.facebookButton}
                    >
                    {/* <Text style={styles.appButtonText}>Get Started</Text> */}
           <Text style = {{color: "white", fontSize:13,fontWeight: 'bold'}}> FACEBOOK INSIGHTS </Text>
        </LinearGradient>
        </TouchableOpacity>
        </View>

        </View>




   
   
     </View>


     </ScrollView>
     

  

    // </NativeBaseProvider>


  );
}

const Drawer = createDrawerNavigator();

const Dashboard =({navigation})=> {    

      const user = auth().currentUser;   
      const userRef = database().ref('/admin/users');
      let [image, setImage] = useState();
      const [data, setData] = useState([]);
      const k=userRef.key;  

      const SignOutUser = () => {
        auth()
        .signOut()
        .then(navigation.push("Test"));
      }



useEffect(()=>{

    database().ref(`/admin/users/${user.uid}`).on('value', snapshot => {
  
      const response = snapshot.val()
      // console.log(response)
      setData(response)
  });

//   let imageRef = storage().ref(`/photos/${user.uid}`);

// imageRef
//   .getDownloadURL()
//   .then((url) => {
//     //from url you can fetched the uploaded image easily
//     setImage(url);
//     console.log("This image is",image)
//   })
//   .catch((e) => console.log('getting downloadURL of image error => ', e));

},[])

      
      
      
      const CustomDrawer = (props) =>{
        
        return(
<View style={{flex:1}}>

          <DrawerContentScrollView {...props}>
          <View 
          style={{
            // flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            paddingTop:10,
            paddingBottom:20,
            marginTop:10,
            marginBottom:10,
            backgroundColor:'#f6f6f6'
          }}>
            {/* <Image source={{image:image.url}}
            style={{width:80,height:80,borderWidth:2,borderColor:'black'}}
            /> */}
            <LottieView  style={styles.logo} source={require('../hellolottie.json')} autoPlay loop   />

            <Text style={{fontSize:16}}>Welcome {data.name}</Text>
          </View>
           <DrawerItemList {...props}/>
         </DrawerContentScrollView>
         <TouchableOpacity
         onPress={SignOutUser}
         style={{
           position:'absolute',
           right:0,
           left:0,
           bottom:50,
           paddingLeft:20,
           paddingTop:10,
           paddingBottom:10,
           backgroundColor:'#f6f6f6'
         }}>
           <Text>Log out</Text>
         </TouchableOpacity>
            </View>
        )
      
      }
      
    

      const DrawerNavigator = ()=>{
        return(
        <Drawer.Navigator screenOptions={{
          // headerShown:true,
          headerStyle:{
            backgroundColor:'transparent',
            elevation:0,
            shadowOpacity:0,
          },
          headerTitle:'',
        }}
        
        drawerContent={(props)=> <CustomDrawer {...props}/>}>
        <Drawer.Screen name="Home Screen" component={HomeScreen}/>
        <Drawer.Screen name="Business Listing" component={BusinessListing} options={{ headerShown: false }}/>
        <Drawer.Screen name="Sales" component={Sales} options={{ headerShown: false }}/>
        <Drawer.Screen name="Product" component={Product} options={{ headerShown: false }}/>
        <Drawer.Screen name="Inventory" component={Inventory} options={{ headerShown: false }}/>
        <Drawer.Screen name="FacebookInsights" component={()=>(<WebView source={{ uri: 'https://www.facebook.com/bsek.pak/' }}/>)} />
        </Drawer.Navigator>
        )
        }



  return (
    
    <NavigationContainer independent={true}>        
            <DrawerNavigator/>
      </NavigationContainer>

   


       
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1, 
  //   backgroundColor: 'white',
  //   // flex:1,
  //   // justifyContent:"center",
  //   // alignItems:"center"
    
  // },
  header:{
    height:hp('20%'),
    backgroundColor:"#25475a",
    borderRadius:20,
    transform: [{ rotate: "12deg" }],
    top:-40,
    right:10,
    width:hp('60%'),

  },
  // footer:{
  //   // height:hp('80%'),
  //   backgroundColor:"white",
  //   // borderWidth:2,
  //   flex:1,
  //   justifyContent:"center",
  //   alignItems:"center",
  //   padding:10,
  //   flexDirection:"row",
  //   flexWrap:"wrap",
  // },
  firstbox:{
    backgroundColor:"white",
    height:hp('5%'),
    justifyContent:"center",
    alignItems:"center",
    marginLeft:10,
    marginRight:10,
  },
  imgBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  picture:{
    // transform: [{ rotate: "15deg" }],
    height:170,
    // width:400,
    // top:-50,
    // right:10,
    flex:1,
    justifyContent:"center",
    alignContent:"center",
    // opacity:0.8,
    borderBottomRightRadius:20,
    
  },

  //Heading
  headingcontainer:{
    // borderWidth:2,
    marginBottom:10,
    width:wp('50%'),
    marginLeft:10,
  },
  headingtext:{
    // color:"black"
    fontSize:21,
    fontWeight:"bold"
    // fontFamily:"SourceSerifPro-SemiBoldItalic"
    // fontFamily:"PTSerif-Bold"
    // fontFamily:"EBGaramond-SemiBold"
    // fontFamily:"PlayfairDisplay-Italic"
  },
  box:{
    // flex:1,
    justifyContent:"center",
    alignItems:"center",
    // borderWidth:2,
    width:wp('40%'),
    margin:10,
    borderRadius:10,
    height:hp('20%'),
  //   shadowColor:"blue",
  //   shadowOffset: {width: 2, height: 4},
  //   shadowRadius: 3,
 
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonContainer: {
    // elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin:10,
    justifyContent:"center",
    alignItems:"center",
    height:hp('20%'),
    width:wp('40%')

  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: "white",
    // padding: 15,
    //marginLeft: 10,
    //marginRight: 10,
  },
  heading: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    //marginTop: 15,
    marginBottom: 20,
  },
  image_containner: {

    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
    marginBottom: 40
  },
  image: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 15
  },
  logo: {
    height: 110,
    width: 90,
  },
  facebookButton: {
    backgroundColor: "#1a4fa3",
    borderRadius: 8,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 10,
  }, 

})










































// const Dashboard = ({navigation}) => {


//   const SignOutUser = () => {
//     auth()
//     .signOut()
//     .then(navigation.push("Test"));
//   }

//   const handlepress = () => {
//     navigation.push("BusinessListing");
//   }

//   const handlepressproduct =()=>{
//     navigation.push("AddProduct");
//   }

//   const handlepresssales =()=>{
//     navigation.push("AddSales");
//   }

  
//   const user = auth().currentUser;   //
//   const userRef = database().ref('/admin/users');//
//   const k=userRef.key;  //
  


//   return (
//     <NativeBaseProvider>

//      <ScrollView style={styles.container}>
     
//         <View style={styles.header}>
//           <ImageBackground source={require('./Dashboardpicture.jpg')} style={styles.picture}/>
//         </View>

//         <View style={styles.headingcontainer}> 
//            <Text style={styles.headingtext}>WELCOME TO BMA DASHBOARD</Text>
//         </View>
     
    
//       {/* {user.uid}              
//       {k}   */}
      
//       <View style={styles.footer}>

//           {/* <View style={styles.box}> */}
            
//              <LinearGradient colors={["#bdc3c7", "#808080"]} style={styles.box}>
                
//                   <Text>Box1</Text>

//               </LinearGradient>


//               <LinearGradient colors={["#bdc3c7", "#808080"]} style={styles.box}>
                
//                 <Text>Box2</Text>

//             </LinearGradient>
            

//             <LinearGradient colors={["#bdc3c7", "#808080"]} style={styles.box}>
                
//                   <Text>Box3</Text>

//               </LinearGradient>
             
            


              

//           {/* </View> */}





// {/* <View style={styles.box}><Text>Box3</Text></View>
// <View style={styles.box}><Text>Box4</Text></View>
// <View style={styles.box}><Text>Box5</Text></View>
// <View style={styles.box}><Text>Box6</Text></View>
// <View style={styles.box}><Text>Box7</Text></View>
// <View style={styles.box}><Text>Box8</Text></View> */}

//           {/* <Button mt="2" colorScheme="primary" onPress={SignOutUser}>
//             <Text>Log out</Text>
//           </Button>

//           <Button mt="2" colorScheme="primary" onPress={handlepress}>
//             <Text>Business Listing</Text> 
//           </Button>

//           <Button mt="2" colorScheme="primary" onPress={handlepressproduct}>        
//               <Text>Add Product</Text>
//           </Button>

//           <Button mt="2" colorScheme="primary" onPress={handlepresssales}>
//               <Text>Add Sales</Text>
//           </Button>
//     */}
//       </View>

//       </ScrollView>
//     </NativeBaseProvider>
    
//   )
// }

// export default Dashboard ;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: 'white',
//     // flex:1,
//     // justifyContent:"center",
//     // alignItems:"center"
    
//   },
//   header:{
//     height:hp('20%'),
//     backgroundColor:"#25475a",
//     borderRadius:20,
//     transform: [{ rotate: "12deg" }],
//     top:-40,
//     right:10,
//     width:hp('60%'),

//   },
//   footer:{
//     // height:hp('80%'),
//     backgroundColor:"white",
//     // borderWidth:2,
//     flex:1,
//     justifyContent:"center",
//     alignItems:"center",
//     padding:10,
//     flexDirection:"row",
//     flexWrap:"wrap",
//   },
//   firstbox:{
//     backgroundColor:"white",
//     height:hp('5%'),
//     justifyContent:"center",
//     alignItems:"center",
//     marginLeft:10,
//     marginRight:10,
//   },
//   imgBackground: {
//     flex: 1,
//     width: "100%",
//     alignItems: "center",
//   },
//   linearGradient: {
//     width: '100%',
//     height: '100%',
//     opacity: 0.95,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   text: {
//     color: '#fff',
//     fontSize: 40,
//     fontWeight: 'bold',
//     textAlign: 'center'
//   },
//   picture:{
//     // transform: [{ rotate: "15deg" }],
//     height:170,
//     // width:400,
//     // top:-50,
//     // right:10,
//     flex:1,
//     justifyContent:"center",
//     alignContent:"center",
//     // opacity:0.8,
//     borderBottomRightRadius:20,
    
//   },

//   //Heading
//   headingcontainer:{
//     // borderWidth:2,
//     marginBottom:10,
//     width:wp('50%'),
//     marginLeft:10,
//   },
//   headingtext:{
//     // color:"black"
//     fontSize:21,
//     fontFamily:"SourceSerifPro-SemiBoldItalic"
//     // fontFamily:"PTSerif-Bold"
//     // fontFamily:"EBGaramond-SemiBold"
//     // fontFamily:"PlayfairDisplay-Italic"
//   },
//   box:{
//     // flex:1,
//     justifyContent:"center",
//     alignItems:"center",
//     // borderWidth:2,
//     width:wp('40%'),
//     margin:10,
//     borderRadius:10,
//     height:hp('20%'),
//   //   shadowColor:"blue",
//   //   shadowOffset: {width: 2, height: 4},
//   //   shadowRadius: 3,
//   backgroundColor:"blue", 
//   shadowColor: 'red',
//   shadowOffset: {width: -2, height: 4},
//   shadowOpacity: 0.5,
//   shadowRadius: 3,
//   }

// })



























// import React from 'react';
// import {Text,View ,StyleSheet,TextInput, Button, Alert} from 'react-native';
// import auth from '@react-native-firebase/auth';

// const Dashboard = ({navigation}) => {
  
//     const SignOutUser = () => {
//         auth()
//         .signOut()
//         .then(navigation.push("Login"));
//       }

//     return (
//     <View>
//         <Text>Dashboard</Text>
//         <Text>{auth().currentUser.uid}</Text>
        

//         <Button
//          title='Signout'
//          onPress={SignOutUser}
//          />

//     </View>
//   )
// }
// export default Dashboard;
