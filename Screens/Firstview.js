import React, {useRef} from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Firstview = ({navigation}) =>{

    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration:3000,
      useNativeDriver: true,
    }).start();

   const handlePress = () => {
        navigation.push("Test");
   }
    
  return(
    <View style={styles.container}>
{/*         
      <View style={styles.header}>
          <Image style = {{ width: 400, height: 400, justifyContent: "center" }} source={require('./bma.png')} />
      </View> */}


<LinearGradient
        colors={["#09203f","#526e6e" ]}
        start={{x: 0.6, y: 0}} // Gradient starting coordinates
      end={{x: 0, y: 0.6}} // Gradient ending coordinates
        style={styles.header}
      >

<Animated.View 
      style={[
          {
            opacity:fadeAnim
          }
          
       ]}>

 <Image style = {{ width: 400, height: 300, justifyContent: "center" }} source={require('./bmatransparent.png')} />
 

</Animated.View>
     


      <Animated.View 
      style={[
          styles.footer,
          {
            opacity:fadeAnim
          }
          
       ]}>
          <Text style={styles.title}> Stay Connected with BMA !! </Text>
          <Text style={styles.text}> Experience the Journey </Text>  
         {/*<Button title='Get Started' onPress={handlePress} 
            style={{
                backgroundColor:"#404040",borderRadius:"15px",padding:"15px"
            }}/>*/}


            {/* <TouchableOpacity
              style={styles.button}
              onPress={handlePress} 
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity> */}

                <TouchableOpacity onPress={handlePress} style={styles.button}>
                <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    start={{x: 1.0, y: 0}} // Gradient starting coordinates
                    end={{x: 0, y: 0.5}} // Gradient ending coordinates
                    style={styles.appButtonContainer}
                    >
                    <Text style={styles.appButtonText}>Get Started</Text>
                    </LinearGradient>
                </TouchableOpacity>

      </Animated.View> 

      <View style={styles.last}>

        </View>

      </LinearGradient>

    </View>
  );
};


export default Firstview;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#202020'
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   borderTopLeftRadius: 30,
    //   borderTopRightRadius: 30,
    //   paddingVertical: 50,
    //   paddingHorizontal: 30,
    //   borderWidth:2,
      top:205,
      left:5,
    //   backgroundColor:"black",
      zIndex:1,
      
  },

  title: {
      color: '#496b69',
      fontSize: 26,
    //   fontWeight: '500',
    //   fontFamily:"PlayfairDisplay-Italic",
    // fontFamily:"PTSerif-Bold",
    // fontFamily:"BebasNeue-Regular",
    // fontFamily:"BeauRivage-Regular",
    // fontFamily:"Anton-Regular",
    // fontFamily:"Vollkorn-Regular",
    // fontFamily:"EBGaramond-SemiBold",
    fontFamily:"Lobster-Regular",
    letterSpacing:1,
    // borderWidth:1,
  },
  text: {
      color: '#496b69',
      marginTop:5,
      marginBottom: 5,
      fontFamily:"BeauRivage-Regular",
      fontSize:24,
      letterSpacing:1,
    //   borderWidth:1,
  },
  button: {
    
    // // marginTop: 10,
    // backgroundColor: '#009387',
    // // padding: 10,
    // // paddingLeft: 30,
    // // paddingRight: 30,
    // borderWidth: 2,
    // borderRadius: 5,
    // // borderColor: '#009387',
    // alignSelf: "flex-end",
    justifyContent:"center",
    alignItems:"flex-end"


  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 16,
  },
  last:{
      backgroundColor:"white",
      height:hp('32%'),
    //   borderWidth:2,
      width:wp('110%'),
      borderTopLeftRadius:140,
    //   borderBottomRightRadius:80,
      transform: [{ rotate: "-5deg" }],
      top:20,
  },
  appButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    alignSelf: "center",
    textTransform: "uppercase",
    
    // letterSpacing:1,
  },
  appButtonContainer: {
    // elevation: 8,
    borderRadius: 10,
    // paddingVertical: 10,
    // paddingHorizontal: 12,
    margin:5,
    justifyContent:"center",
    alignItems:"flex-end",
    height:hp('6%'),
    width:wp('32%')

  },

});