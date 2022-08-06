import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,TextInput,Image,ScrollView, Button} from 'react-native';

const AddProduct=({navigation})=>{

const Wait = ()=>{
    console.log("wait")
}
 

  return(

    <ScrollView style={styles.container}>

      

    {/* <Text>hjjhjhh</Text> */}

    {/* <View style={styles.insidecontainer}>
    <Text>insode</Text>
    </View> */}

<View style={styles.uppercircle}>
      <Image source={require('./bma.png')} style={{ width: 90, height: 90, borderRadius:50 }}/>
</View>
      
      <View style={styles.header} >

            <Text style={styles.head}> Product Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Id"
        />

        <TextInput
        style={styles.input}
        placeholder="Product Name"
        />

        <TextInput
        style={styles.input}
        placeholder="Product Quantity"
        />

        <TextInput
        style={styles.input}
        placeholder="Buy Cost"
        />

        <TextInput
        style={styles.input}
        placeholder="Sell Cost"
        />

      </View>

      <View style={styles.circle} >
                <TouchableOpacity style={styles.btn} onPress={Wait}><Text>Save</Text></TouchableOpacity>  
      </View>
    
    </ScrollView>
  )
};

export default AddProduct;

const styles = StyleSheet.create({

container:{
  flex:1,

  backgroundColor:'#826cff',
  paddingLeft:20,
  paddingRight:20,
  
},
insidecontainer:{
  backgroundColor:'green',
  margin:10,
  height:'80%',
  width:'100%',
},
header: {
    left: 0,
    backgroundColor: 'white',
    borderBottomLeftRadius:50,
    borderTopRightRadius:50,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:40,
    paddingTop:50
    
  },
  circle: {
    height: 40,
    width: 100,
    borderRadius: 10,
    position: 'relative',
    top: -15,
    left:110,
    elevation: 10,
    backgroundColor: '#fddb93'
    
  },
  uppercircle:{
    height: 90,
    width: 90,
    borderRadius: 50,
    position: 'relative',
    top: 30,
    left: 15,
    elevation: 10,
    backgroundColor: '#fddb93',
    zIndex:1
  },
  btn:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    
  },
  input:{
      borderWidth:1,
      marginBottom:10,
      width:'80%',
      borderRadius:7,
      
  },
  head:{
      fontSize:20,
      marginBottom:40,
      fontWeight:'bold',
  }

})