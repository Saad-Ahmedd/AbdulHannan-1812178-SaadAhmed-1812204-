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

const SplashScreen = ({navigation}) =>{

    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration:2000,
      useNativeDriver: true,
    }).start();

   const handlePress = () => {
        navigation.push("Test");
   }
    
  return(
    <View style={styles.container}>
        
      <View style={styles.header}>
          <Image style = {{ width: 400, height: 400, justifyContent: "center" }} source={require('./bma.png')} />
      </View>
      <Animated.View 
      style={[
          styles.footer,
          {
            opacity:fadeAnim
          }
          
       ]}>
          <Text style={styles.title}>Stay Connected with BMA</Text>
          <Text style={styles.text}>Experience the Journey</Text>  
         {/*<Button title='Get Started' onPress={handlePress} 
            style={{
                backgroundColor:"#404040",borderRadius:"15px",padding:"15px"
            }}/>*/}
            <TouchableOpacity
              style={styles.button}
              onPress={handlePress} 
            >
              <Text style={styles.buttonText}>Get Start</Text>
            </TouchableOpacity>
      </Animated.View> 
    </View>
  );
};


export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#202020'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },

  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5,
      marginBottom: 15,
  },
  button: {
    
    marginTop: 10,
    backgroundColor: '#009387',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#009387',
    alignSelf: "flex-end",

  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 16,
  },

});