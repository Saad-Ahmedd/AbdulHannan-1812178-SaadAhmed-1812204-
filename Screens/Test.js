// import React, { useState } from 'react';
// import auth, { firebase } from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/FontAwesome'

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Image,
// } from 'react-native';

// import {
//   Box,
//   Heading,
//   VStack,
//   FormControl,
//   Button,
//   Input,
//   Link,
//   HStack,
//   Center,
//   NativeBaseProvider,
// } from "native-base"

// const Login = ({navigation}) => {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const user=auth().currentUser; 



//   GoogleSignin.configure({
//     webClientId: '349723467289-2e440jnkuf6q02k6ijjvjemkeqt7htpr.apps.googleusercontent.com',
//   });
  
//   const handlepress = () => {
//       navigation.push("Signup");
//       console.log(email);
//   }

//   const handlepress2 = () => {
//     navigation.push("Forget");
//     console.log(email);
// }

// const movetoforgotpassword=()=>{
//     navigation.push("ForgetPassword")
//   }

//   const SignInUser = () => {
//     auth()
//           .signInWithEmailAndPassword(email, password)
//           .then(() => {
          
//             navigation.push("IdentityDetails")
//           })
//           .catch(error => {
//             if (error.code === 'auth/email-already-in-use') {
//               alert('That email address is already in use!');
//               setEmail('')
//             }

//             if (error.code === 'auth/invalid-email') {
//               alert('That email address is invalid!');
//             }
//             alert("Email or Password is Incorrent");
//             console.log(email + password) 
//           });
//   }

//   async function onGoogleButtonPress() {
//     // Get the users ID token
//     const { idToken } = await GoogleSignin.signIn();
  
//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
//     navigation.push("Dashboard")
//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential);

//   }


//   return (
    
//      <ScrollView style={styles.container}>
     

//         <View style={styles.image}>
//           <Image style={styles.logo} source={require('../Image/Login.jpeg')} />
//        </View> 

//           <TouchableOpacity style={styles.btnlogin}  colorScheme="blue" onPress={SignInUser}>
//           <Text style={styles.btntext}>Login</Text> 
//           </TouchableOpacity>


//         <TouchableOpacity style={styles.btnstyle}
//         onPress={() => onGoogleButtonPress()}>
//         <Image 
//           source={require('./googleicon.png')} 
//           style={styles.ImageIconStyle} 
//           />

//           <Text style={styles.btntext}>Login with Gmail</Text>
          
//         </TouchableOpacity>

    

//         <View style = {styles.text}>

//                   <Text>
//                     Create an account 
//                   </Text>

//                   <Link  
//                     style={styles.linkstyle}
                    
//                     onPress={handlepress}

//                   >
//                   Sign up
//                   </Link>
//         </View>
        
          
       
     
//       </ScrollView>
    
//   )
// }

// export default Login;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1, 
//       backgroundColor: 'white',
      
//     padding: 15,
//     },
  
      
//     // },
//     header: {
//       flex: 1,
//       height:hp('25%'),         //abhi change kia hai
//       justifyContent: "center",
//       alignItems:"center",
//       backgroundColor:"#f2f5f5",
//       // transform:[{ rotate: "20deg" }],
//       // borderTopRightRadius:140,               //abhi
//       // borderTopLeftRadius:140,                //abhi
     
//       borderBottomRightRadius:120,           //abhi change kia hai
//       // borderBottomLeftRadius:30,       //abhi
//       // flexDirection:"row"

//       // borderRadius:30,


//       // marginRight:10,      //abhi
//       // marginLeft:10,       //abhi
//       // marginTop:10,        //abhi
//       zIndex:-1,
//       // borderWidth:2,
//   },
//     header1:{
//         flex: 1,
//         justifyContent:"center",
//         // flexDirection:"row",
//         alignItems:"center",
//         backgroundColor:"white",
//         // zIndex:1
//         borderWidth:2,
//     },
//     header2:{
//         flex: 1,
//         justifyContent: "center",
//         alignItems:"center",
//         backgroundColor:"red",
//         padding:1,
//     },

//     footer: {
//         flex: 3,
//         // height:hp('60%'),
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 80,
//         // borderTopRightRadius: 30,  //abhi
//         paddingHorizontal: 20,
//         paddingVertical: 30,
//         marginLeft:20,
//         marginRight:20,
//         // borderWidth:2,
//         // top:-75,
//     },
//     text_header: {
//         color: 'w"hite',
//         // fontWeight: 'bold',
//         fontSize: 30,
//         fontFamily:"PlayfairDisplay-Italic"
//     },
//     text_footer: {
//         color: '#05375a',
//         fontSize: 18,
    
//     },
//     text: {
//       flex:1,
//       justifyContent:"center",
//       alignItems:"center",
//       flexDirection:"row",
//       // borderWidth:2,
//       marginTop:20,
      
//   },
// button: {
//     alignItems: 'center',
//     marginTop: 50
// },
// signIn: {
//   width: '100%',
//   height: 50,
//   justifyContent: 'center',
//   alignItems: 'center',
//   borderRadius: 10
// },
// labelContainer: {
//   position: 'absolute',
//   backgroundColor: '#FFF',
//   top: -10,
//   left: 20,
//   padding: 1,
//   zIndex: 50,
// },
// textstyle: {
//   flex: 1, 
//   borderWidth: 1,
//   justifyContent: 'flex-end',
//   height: 44,
//   borderRadius: 15,
//   paddingHorizontal: 25,
// },
// ImageIconStyle: {
//   padding: 10,
//   margin: 5,
//   height: 25,
//   width: 25,
//   resizeMode : 'stretch',
  
// },
// btnstyle:{

//   flex: 1.0,
//   alignSelf: 'center',
//   justifyContent: 'center',
//   backgroundColor: '#ffffff',
//   width: '97%',
//   // height:'50%',
//   margin: 1,
//   borderRadius:40,
//   flexDirection:'row',

//   // backgroundColor:'white',
//   // borderWidth:1,
//   // borderRadius:20,
//   // flex:1,
//   // flexDirection:'row',
//   // alignItems:'center',
//   // justifyContent:'center',
//   // marginLeft:40,
//   // marginRight:40,


  
// },
// linkstyle:{
//   color:'black',
//   // backgroundColor:'blue',
//   marginLeft:7,
// },
// picture:{
//   //  borderColor:"red",
//   // borderWidth:2,
//   width: 370, 
//   height: 105, 
//   marginBottom:10,
//   top:3,
//   // left:3,
//   // borderRadius:120 ,
//   // borderTopLeftRadius:60,
//   borderBottomLeftRadius:50,
//   borderBottomRightRadius:80,
//   // borderWidth:2,
// },

// //For Login Button
// btnlogin:{
//   flex: 1.0,
//   alignSelf: 'center',
//   justifyContent: 'center',
//   backgroundColor: '#ffffff',
//   width: '97%',
//   // height:'50%',
//   margin: 1,
//   borderRadius:40,
// },
// btntext:{
//         textAlign: 'center',
//         color: 'black',
//         alignSelf: 'center'
// },
// gradient:{
//   height: 35,
//   width: 200,
//   justifyContent: 'center',
//   alignSelf: 'center',
//   borderRadius:50,
//   marginBottom:5,
//   marginTop:35,

// },
// gradient1:{
//   height: 35,
//   width: 200,
//   justifyContent: 'center',
//   alignSelf: 'center',
//   borderRadius:50,
//   marginBottom:5,
//   marginTop:15,

// },
// image: {
//       flex: 6,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "white",
//       marginTop: 15
//     },

//   });
































import { Row,Input, NativeBaseProvider } from 'native-base';
import React,{useState} from 'react';
import { Text, View, TextInput,Image,TouchableOpacity , StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LottieView from 'lottie-react-native';
import Ionics from 'react-native-vector-icons/Ionicons'



const Login=({navigation})=> {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [status,setStatus] = useState(false)
  let [status,setStatus] = useState('false')
  const user=auth().currentUser; 



  GoogleSignin.configure({
    webClientId: '349723467289-2e440jnkuf6q02k6ijjvjemkeqt7htpr.apps.googleusercontent.com',
  });
  
  const handlepress = () => {
      navigation.push("Signup");
      console.log(email);
  }

  const handlepress2 = () => {
    navigation.push("Forget");
    console.log(email);
}

const movetoforgotpassword=()=>{
    navigation.push("ForgetPassword")
  }

  const SignInUser = () => {
    auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
          
            database()
  .ref(`/admin/users/${user.uid}`)
  .on('value', snapshot => {
    status = snapshot.child('status').val()
    console.log('User data: ', status)
    // console.log('User data: ', snapshot.val());
    status == null ? navigation.push("IdentityDetails") : navigation.push("Dashboard")
  });


            // const db = firebase.database().ref(`/admin/users/${uid}`)
                
            // db.on('value', snapshot => {
            // status = snapshot.child('status').val()
            // console.log('User data: ', status); 

            // status == null ? navigation.push("IdentityDetails") : navigation.push("Dashboard")
            // })

            // navigation.push("IdentityDetails")
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              alert('That email address is already in use!');
              setEmail('')
            }

            if (error.code === 'auth/invalid-email') {
              alert('That email address is invalid!');
            }
            alert("Email or Password is Incorrent");
            console.log(email + password) 
          });
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    navigation.push("Dashboard")
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);

  }

  return (
    <NativeBaseProvider>
<ScrollView  style={styles.container}> 
      <View style={styles.image}>
        <Text></Text>
         {/* <Image style={styles.logo} source={require('../Image/Login.jpeg')} /> */}
         <LottieView  style={styles.logo} source={require('../business.json')} autoPlay loop   />

      </View>

      <View style={styles.heading}>
        <Text style = {{color: "black",fontWeight: 'bold', fontSize:28,}}>
          Welcome Back!
        </Text>
        <Text style = {{color: "silver", fontSize:11, marginBottom: 5}}>
          Login to your existant account with BMA
        </Text>
      </View>

      {/* <View style={styles.textbox}>
        <Icon name='user' size={20} color = "#5B86E5" style = {{paddingLeft: 15, paddingRight: 3, paddingTop: 12}} />
        <TextInput
          style={styles.inputEmail}
          onChangeText={text => setEmail(text)}
          //value={number}
          placeholder="John@gmail.com"
        />
      </View> */}

<View style={styles.textbox}>
<Icon name='user' size={20} color = "#5B86E5" style = {{paddingLeft: 15, paddingRight: 3, paddingTop: 12}} />
 <Input  
             style={styles.inputEmail}
             placeholder="Email"
             w={280}
             pl="3"
             pr="3"
             borderBottomLeftRadius="10"
             borderTopRightRadius="10"
             onChangeText={text => setEmail(text)}/> 
</View>

      {/* <View style={styles.textbox}>
      <Icon name='lock' size={20} color = "#5B86E5" style = {{paddingLeft: 15, paddingRight: 3, paddingTop: 12}} />
      <TextInput
        style={styles.inputPassword}
        onChangeText={text => setPassword(text)}
        //value={number}
        placeholder="Password"
        secureTextEntry = {true}
        //keyboardType="numeric"
      />
      </View> */}


<View style={styles.textbox}>
<Icon name='lock' size={20} color = "#5B86E5" style = {{paddingLeft: 15, paddingRight: 3, paddingTop: 12}} />
 <Input  
             style={styles.inputEmail}
             placeholder="Password"
             type='password'
             w={280}
             pl="3"
             pr="3"
             borderBottomLeftRadius="10"
             borderTopRightRadius="10"
             onChangeText={text => setPassword(text)}/> 
</View>

      


      <View style={styles.hyperLink}>
        <TouchableOpacity
        onPress={()=>movetoforgotpassword()}
        >
          <Text style = {{color: "gray", fontSize:14,marginBottom:5}}>
          Forgot Password?
        </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.touchButton}>
        <TouchableOpacity
        onPress={SignInUser}
        //style={styles.buttons}
        >
          <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    start={{x: 1.0, y: 0}} // Gradient starting coordinates
                    end={{x: 0, y: 0.5}} // Gradient ending coordinates
                    //style={styles.appButtonContainer}
                    style={styles.buttons}
                    >
                    {/* <Text style={styles.appButtonText}>Get Started</Text> */}
           <Text style = {{color: "white", fontSize:15,fontWeight: 'bold'}}> LOG IN </Text>
        </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.socialButtonstilte}>
         <Text style = {{color: "gray", fontSize:12,}}>
          Or connect using
        </Text>
      </View>

      <View style={styles.socialButtons}>
        
        <TouchableOpacity
        onPress={() => onGoogleButtonPress()}
        style={styles.googleButton}
        >
          {/* <Icon name='google' size={15} color = "white" style = {{paddingRight: 5, paddingTop: 3}} /> */}
          <Image 
          source={require('./googleicon.png')} 
          style={styles.ImageIconStyle} 
          />
          {/* <Text style = {{color: "black", fontSize:15,fontWeight: 'bold'}}> Google </Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
      <Text style = {{color: "gray", fontSize:15,}}>
          Don't have an account? 
        </Text>
        <TouchableOpacity
        onPress={handlepress}
        >
          <Text style = {{color: "#0e03a1", fontSize:15, fontWeight: 'bold', paddingLeft: 4 }}>
           Sign Up
        </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </NativeBaseProvider>
    
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    //marginLeft: 10,
    //marginRight: 10,
  },
  image: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    //marginTop: 15,

  },
  logo: {
    height: 200,
    width: 180,
    
  },
  heading: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    //marginTop: 15,
    marginBottom: 20,
  },
  textbox: {
    //flex: 6,
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "white",
    //marginTop: 15,
    //padding: 5,
    //paddingBottom: 10,
    flexDirection: "row",
    // backgroundColor: '#fafafa',
    // borderColor: "#1E88E5",
    // borderWidth: 1,
    borderRadius: 30,
    paddingBottom: 6,
    paddingTop: 6,
    marginBottom: 10,

  },
  inputEmail:{
    // flex: 6,
    width:500,
    //paddingLeft: 10,
    //paddingRight: 10,
    //marginBottom: 15, 
  },
  inputPassword:{
    flex: 6,
    //paddingLeft: 10,
    //paddingRight: 10,
    //marginBottom: 15,
  },
  hyperLink: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "white",
  },
  touchButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 15
  },
  buttons: {
    backgroundColor: "#0e03a1",
    borderRadius: 20,
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 60,
    paddingRight: 60,
  },
  socialButtons: {
    flex: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    
  },
  socialButtonstilte: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 25,
    marginBottom: 10

  },
  facebookButton: {
    flexDirection: "row",
    backgroundColor: "#1a4fa3",
    borderRadius: 8,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 10,
  },
  ImageIconStyle: {
      padding: 10,
      // margin: 5,
      height: 28,
      width: 28,
      resizeMode : 'stretch',
      
    },
  googleButton: {
    flexDirection: "row",
    // backgroundColor: "#e03f3f",
    borderRadius: 8,
    // paddingBottom: 8,
    // paddingTop: 8,
    paddingLeft: 24,
    paddingRight: 24,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20
  },
  labelContainer: {
      position: 'absolute',
      backgroundColor: '#FFF',
      top: -10,
      left: 20,
      padding: 1,
      zIndex: 50,
    },
    textstyle: {
      flex: 1, 
      borderWidth: 1,
      justifyContent: 'flex-end',
      height: 44,
      borderRadius: 15,
      paddingHorizontal: 25,
    },
    
});