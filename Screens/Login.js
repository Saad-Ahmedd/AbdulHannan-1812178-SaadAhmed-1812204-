// import React ,{useState} from 'react';
// import {Text,View ,StyleSheet,TextInput, Button, TouchableOpacity} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
// import Dashboard from '../Screens/Dashboard';
// import ForgetPassword from '../Screens/ForgetPassword';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// const Login = ({navigation}) => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const key=database().ref(`/admin/users/`);//
//     const user=auth().currentUser; //

//     GoogleSignin.configure({
//       webClientId: '349723467289-2e440jnkuf6q02k6ijjvjemkeqt7htpr.apps.googleusercontent.com',
//     });

//    const loginbutton=() =>{

    

//         auth()
//           .signInWithEmailAndPassword(email, password)
//           .then(() => {
            
//             navigation.push("Dashboard");
            
//           })
//           .catch(error => {
//             if (error.code === 'auth/email-already-in-use') {
//               alert('That email address is already in use!');
//               setEmail('')
//             }

//             if (error.code === 'auth/invalid-email') {
//               alert('That email address is invalid!');
//             }
            
//           });
//     }

   

    

//     const movetosignup=()=>{
//         navigation.push("Signup");
//     }

//     const movetoforgotpassword=()=>{
//       navigation.push("ForgetPassword")
//     }

//     async function onGoogleButtonPress() {
//       // Get the users ID token
//       const { idToken } = await GoogleSignin.signIn();
    
//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
//       navigation.push("Dashboard")
//       // Sign-in the user with the credential
//       return auth().signInWithCredential(googleCredential);

//     }

//   return (
//     <View style={styles.container}>
//         <Text>Login</Text>

//         <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={text => setEmail(text)}
//         />

//         <TextInput
//         style={styles.input}
//         placeholder="Password"
//         onChangeText={text => setPassword(text)}
//         secureTextEntry={true}
//         />


//         <Button style={styles.btn} title='Login' onPress={()=> loginbutton()}/>


//         <Button style={styles.btn} title='Register Yourself' onPress={()=>movetosignup()}/>

//         <Button style={styles.btn} title='Forget password' onPress={()=>movetoforgotpassword()}/>

// <Button style={styles.btn} title='Sign In with Gmail'  onPress={() => onGoogleButtonPress()}/>


//     </View>
//   )
// }

// export default Login;

// const styles = StyleSheet.create({
//     container:{
//         flex: 1, 
//         alignItems: 'center', 
//         justifyContent: 'center'
//     },
//     input:{
//         borderColor:'black',
//         borderWidth:1,
//         margin:5,
//         padding:4,
//         borderRadius:5,
//         width:300,
        
//     },
//     btn:{
//       backgroundColor:'red' 
//     }
// })



