import React, {useState, useEffect} from 'react';
import { Row,Input, NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Image } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { UsePasswordValidation } from './UsePasswordValidation';


 const Signup=({navigation})=>{

   const [validLength, setValidLength] = useState(null);
 const [hasNumber, setHasNumber] = useState(null);
 const [upperCase, setUpperCase] = useState(null);
 const [lowerCase, setLowerCase] = useState(null);
 const [specialChar, setSpecialChar] = useState(null);
  const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [message,setMessage] = useState('')



  let requiredLength = 8


   

    // const setFirst = (event) => {
    //   setPassword({ ...password, password: event.target.value });
    // };
  

  const RegisterUser = () => {




    // const strongReg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    //   if (!strongReg.test(email)) {
    //     // showMessage(MESSAGE.email)
    //     console.log("Email is Invalid",email)
    //     retrurn false;
    // } else {
    //     // showMessage(MESSAGE.password);
    //     console.log("Email is valid",email)
    //     return false;
    // }


      //For adding a user
      if(password === confirm_password){
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
      
           alert('User account created..');
           navigation.push("Test");
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
           }

          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }
          console.error(error);
        });}
        else {
          setPassword('')
          setConfirm_password('')
          alert("Password does not match...")
        }
    }

  const handlepress = () => {
      navigation.push("Test");
  }


  // const showMessage =()=>{

  //    let consist=  <Text> UpperCase: {upperCase ? "True" :"False"}</Text>
  //    setMessage(consist)
  //   //  setMessage('')
  //   // console.log(consist)

    
  //     // <Text>UpperCase: {upperCase ? "True" :"False"}</Text>
    
   
  //   }


  useEffect(() => {
  
    setValidLength(password.length >= requiredLength ? true : false);
    setUpperCase(password.toLowerCase() !== password);
    setLowerCase(password.toUpperCase() !== password);
    setHasNumber(/\d/.test(password));
  
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
      
    }, [password, requiredLength],);

  return(
    <NativeBaseProvider>
    <ScrollView style = {styles.container}>
      <View style={styles.image}>
         {/* <Image style={styles.logo} source={require('../Image/Login-Page.jpeg')} /> */}
         <LottieView  style={styles.logo} source={require('../profile.json')} autoPlay loop   />

      </View>
      <View style={styles.heading}>
        <Text style = {{fontWeight: 'bold', fontSize:28, color: "black"}}>
          Let's Get Started!
        </Text>
        <Text style = {{color: "gray", fontSize:11,}}>
          Login to your existing account
        </Text>
      </View>
     

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
             onChangeText={text => setPassword(text)}
            //  onFocus={()=>setMessage(<Text>{validLength ? 'true':'false'}</Text>)}
            //  onBlur={()=>setMessage(null)}
            //  onChange={setFirst}
             /> 

</View>

<View style={{marginLeft:37,width:250}}>
  {/* <Text>{message}</Text> */}
             <Text>
             {/* <Icon name='check' size={14} color = "#5B86E5" style = {{paddingLeft: 15, paddingRight: 3,marginRight:10, paddingTop: 12}} /> */}
              {validLength ? <Icon name='check' size={14} color = "blue"/>: <Icon name='check' size={14} color = "red"/>} Enter Minimum 8 Digits </Text>

             <Text> 
               {hasNumber ? <Icon name='check' size={14} color = "blue"/> : <Icon name='check' size={14} color = "red"/>} Enter Number </Text>

             <Text> 
              {upperCase ?<Icon name='check' size={14} color = "blue"/> :<Icon name='check' size={14} color = "red"/>} Enter UpperCase Letter</Text>

             <Text>
             {/* <Icon name='check' size={14} color = "#5B86E5" style = {{paddingLeft: 15, paddingRight: 3, paddingTop: 12}} /> */}
              {lowerCase ?<Icon name='check' size={14} color = "blue"/>:<Icon name='check' size={14} color = "red"/>} Enter LowerCase Letter</Text>

             <Text>
               {/* <Icon name='check' size={14} color = "#5B86E5" style = {{paddingLeft: 15, paddingRight: 3, paddingTop: 12}} /> */}
              {specialChar ?<Icon name='check' size={14} color = "blue"/> :  <Icon name='check' size={14} color = "red"/> } Enter Special Character</Text>

</View>


<View style={styles.textbox}>
<Icon name='lock' size={20} color = "#5B86E5" style = {{paddingLeft: 15, paddingRight: 3, paddingTop: 12}} />
 <Input  
             style={styles.inputEmail}
             placeholder="Confirm Password"
             type='password'
             w={280}
             pl="3"
             pr="3"
             borderBottomLeftRadius="10"
             borderTopRightRadius="10"
             onChangeText={text => setConfirm_password(text)}/> 
</View>

      <View style={styles.touchButton}>
      <TouchableOpacity
        onPress={RegisterUser}
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
           <Text style = {{color: "white", fontSize:15,fontWeight: 'bold'}}> Sign Up </Text>
        </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
      <Text style = {{color: "gray", fontSize:15,}}>
          Already have an account? 
        </Text>
        <TouchableOpacity
        onPress={handlepress}
        >
          <Text style = {{color: "#0e03a1", fontSize:15, fontWeight: 'bold', paddingLeft: 2 }}>
           Login here
        </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </NativeBaseProvider>
  )
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: "white",
    padding: 20,
    //marginLeft: 10,
    //marginRight: 10,
  },
  image: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 15
  },
  logo: {
    height: 140,
    width: 120,
    
  },
  heading: {
    flex: 2,
    //marginTop: 40,
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
    // backgroundColor: "#fafafa",
    // borderColor: "#1E88E5",
    // borderWidth: 1,
    borderRadius: 30,
    paddingBottom: 6,
    paddingTop: 6,
    marginBottom: 10,
    //marginTop: 20

  },
  inputEmail:{
    flex: 6,
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
  touchButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10
  },
  buttons: {
    backgroundColor: "#0e03a1",
    borderRadius: 20,
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 60,
    paddingRight: 60,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10
  },
});