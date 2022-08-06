import React from 'react'
import {View,Text,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Gradient =()=> {
  return (
    <View style={styles.container}>
        <LinearGradient
        colors={["#48F10E", "#078716", "#093203"]}
        style={styles.buttonContainer}
      >
        <Text
          style={styles.buttonText}
        >
          Login to read
        </Text>
      </LinearGradient>
    </View>
  )
}

export default Gradient;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: { 
      padding: 15, 
      alignItems: "center", 
      borderRadius: 5 
    },
    buttonText: {
      fontWeight: "bold",
      fontSize: 18,
      color: "#fff",
    }
  });