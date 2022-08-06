import React,{useState} from 'react';
import {Text,View,TextInput,StyleSheet,Button,TouchableOpacity,ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Input, NativeBaseProvider} from 'native-base'
// import handlePasswordReset from '../config/Firebase/firebaseConfig'


const ForgetPassword = ({navigation})=> {
  
    const [email, setEmail] = useState('');

const forgetpwd = () =>{

    auth()
    .sendPasswordResetEmail(email)
    .then(() => {
        console.warn("Password reset email sent successfully")
        
      })
      .catch(error => {
        console.warn(error="Error occuring")
        
      });
      
    }

    return (
        <NativeBaseProvider> 
    <View style={styles.container}>
          


<View style={styles.image}>
        <Text></Text>
         {/* <Image style={styles.logo} source={require('../Image/Login.jpeg')} /> */}
         {/* <Image style={styles.logo} source={require('../Image/forgot.png')} /> */}
         <Text></Text>
         <LottieView  style={styles.logo} source={require('../forget.json')} autoPlay loop   />

      </View>
        <Text style={{color: "black",fontWeight: 'bold', fontSize:22,}}>Forget Password</Text>

        {/* <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        /> */}

<View style={styles.textstyle}>
             {/* <Text style={styles.labelContainer}> Email </Text> */}

            <Input  
            // style={styles.textstyle}
            placeholder="Email"
            pl="3"
            pr="3"
            borderBottomLeftRadius="10"
            borderTopRightRadius="10"
            onChangeText={text => setEmail(text)}/>
                
        </View>

        {/* <Button
        title='Submit' onPress={()=> forgetpwd()}/> */}


        <TouchableOpacity
        onPress={()=>forgetpwd()}
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
           <Text style = {{color: "white", fontSize:15,fontWeight: 'bold'}}> Submit </Text>
        </LinearGradient>
        </TouchableOpacity>
     

    </View>
    
    </NativeBaseProvider>

  )
}

export default ForgetPassword;


const styles = StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center', 
        // height:'100',
        // justifyContent: 'center',
        backgroundColor:'white'
    },
    input:{
        borderColor:'black',
        borderWidth:1,
        margin:5,
        padding:4,
        borderRadius:5,
        width:300,
        marginTop:20,
    },
    image: {
        // flex: 6,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "white",
        marginBottom:50,
        // marginTop: 15
      },
      logo: {
        height: 200,
        width: 160,
      },
      buttons: {
        backgroundColor: "#0e03a1",
        borderRadius: 20,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 60,
        paddingRight: 60,
      },
      textstyle: {
        //   flex: 1, 
        //   borderWidth: 1,
          width:290,
          marginTop:15,
          marginBottom:15,
        //   justifyContent: 'flex-end',
        //   height: 10,
          borderRadius: 15,
        //   paddingHorizontal: 25,
        },
        labelContainer: {
              position: 'absolute',
              backgroundColor: '#FFF',
              top: -10,
              left: 20,
              padding: 1,
              zIndex: 50,
            },
})
