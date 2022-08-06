import React, { useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import {
  Box,
  Heading,
  VStack,
  FormControl,
  Button,
  Input,
  Link,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base"
const Practice = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
            navigation.push("IdentityDetails")
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
     <ScrollView style={styles.container}>
        
        <View style={styles.header}>
            <Text style={styles.text_header}> Log In</Text>
        </View>

        <View style={styles.footer}>

   
        <View>
          
            <Text style={styles.labelContainer}> Email </Text> 

            <Input  
            style={styles.textstyle}
            pl="3"
            pr="3"
            borderBottomLeftRadius="10"
            borderTopRightRadius="10"
            onChangeText={text => setEmail(text)}/>

        </View>

        <View style={{marginTop:35}}>
       
        <Text style={styles.labelContainer}> Password </Text>

            <Input  
            style={styles.textstyle}
            type="password" 
            pl="3"
            pr="3"
            borderBottomLeftRadius="10"
            borderTopRightRadius="10"
            mb="1"
            onChangeText={text => setPassword(text)}/>


        <Button  variant="link" alignSelf="flex-end"  colorScheme="blue" onPress={()=>movetoforgotpassword()}>
          Forget Password
        </Button>
        
        <Button borderRadius="25" mt="10" mb="8" ml="10" mr="10" colorScheme="blue" onPress={SignInUser}>
          Login
        </Button>

        


        {/* <Button  mt="10" ml="10" mr="10" colorScheme="blue" onPress={() => onGoogleButtonPress()}>
          Login with Gmail
        </Button> */}

        <TouchableOpacity style={styles.btnstyle}
        onPress={() => onGoogleButtonPress()}>
        <Image 
          source={require('./googleicon.png')} 
          style={styles.ImageIconStyle} 
          />

          <Text style={{color:'black'}}>Login with Gmail</Text>
          
        </TouchableOpacity>

        <View style = {styles.text}>

                  <Text>
                    Create an account 
                  </Text>

                  <Link  
                    style={styles.linkstyle}
                    href="#"
                    onPress={handlepress}

                  >
                  Sign up
                  </Link>
        </View>

        

          
          
          
          

          
         </View>
      </View>
      </ScrollView>
      </NativeBaseProvider>  
  )
}

export default Practice;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'white'
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        // paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop:40,
        // borderWidth:2,
        backgroundColor:"blue",
        borderBottomLeftRadius:70,
        // borderBottomRightRadius:100,
        borderTopRightRadius:100,
      
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        margin:20,
        
    },
    text_header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    
    },
    text: {
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"row",
      // borderWidth:2,
      marginTop:20,
      
  },
button: {
    alignItems: 'center',
    marginTop: 50
},
signIn: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
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
ImageIconStyle: {
  padding: 10,
  margin: 5,
  height: 25,
  width: 25,
  resizeMode : 'stretch',
  
},
btnstyle:{
  backgroundColor:'white',
  borderWidth:1,
  borderRadius:20,
  flex:1,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  marginLeft:40,
  marginRight:40,
  // width:40
},
linkstyle:{
  color:'black',
  // backgroundColor:'blue',
  marginLeft:7,
}
  });