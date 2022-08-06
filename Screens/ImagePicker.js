import React, { useState, useEffect } from 'react';
import {View,StyleSheet,TouchableOpacity,TextInput,Image,ScrollView} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Dashboard from './Dashboard';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  CheckIcon,
  Button,
  Select,
  Center,
  NativeBaseProvider,
  Radio,
} from "native-base"


const ImagePicker = ({navigation}) => {

  const [id, setProduct_Id] = useState();
  const [product_name, setProduct_name] = useState('');
  const [product_quantity, setProduct_quantity] = useState('');
  const [product_buycost, setProduct_buycost] = useState('');
  const [product_salecost, setProduct_salecost] = useState('');
  const [product_discription, setProduct_discription] = useState('');
  const [uid, setUid] = useState(auth().currentUser.uid);

  
// useEffect(()=>{
// Saveproduct();
// },[])

  const Saveproduct = ()=> {
   if(id != '' && product_name != '' && product_discription != '' && product_buycost != '' && product_salecost != '' && product_quantity != ''){
     getDataBase()
     setProduct_Id('')
     setProduct_name('')
     setProduct_discription('')
     setProduct_buycost('')
     setProduct_quantity('')
     setProduct_salecost('')
   }else{
     alert("Fill Details Properly")
   }


  }


  // Yeh Database ka code hai agar chala kr check krna ho tou.
  const getDataBase = async () => {
    try {
        // const newReference = database().ref(`/admin/products/${uid}`).push();
        const newReference = database().ref(`/admin/products/${uid}`).child(id)
        
        console.log('Auto generated key: ', newReference);
        newReference
        .set({
            id: id,
            product_name: product_name,
            product_quantity: product_quantity,
            product_buycost: product_buycost,
            product_salecost: product_salecost,
            product_discription: product_discription
            })
        .then(() => 
        console.log('Data updated.'));
        alert("Product added.")
        // navigation.push("Dashboard")
    } catch (err) {
    
    }
    };

  return (
    <NativeBaseProvider>
    <ScrollView>

    <LinearGradient
      colors={["#526e6e", "#f2f5f5"]}
      // start={{x: 1.0, y: 0}} // Gradient starting coordinates
      // end={{x: 0, y: 0.5}} // Gradient ending coordinates
      style={styles.container}
      >



    <Center flex={1} > 
    <Box safeArea p="1" py="2" w="100%" >



    <View style={styles.uppercircle}>
      <Image source={require('./bma.png')} style={{ width: 90, height: 90, borderRadius:50 }}/>
    </View>



     <VStack space={3} mt="8">

     <View style={styles.header} >

     <Text style={styles.head}> Product Details</Text>


            <FormControl style={styles.input}>
            <Input 
            value={id}
            onChangeText={text => setProduct_Id(text)}
            size="lg" placeholder="Product ID"
            keyboardType="numeric" 
            Input
            />
          </FormControl>


          <FormControl style={styles.input}>
            <Input 
            value={product_name}
            onChangeText={text => setProduct_name(text)}
            size="lg" placeholder="Product Name" 
            />
          </FormControl>

          <FormControl style={styles.input}>
            <Input 
            value={product_quantity}
            onChangeText={text => setProduct_quantity(text)}
            size="lg" placeholder="Quantity"
            keyboardType="numeric" 
            Input
            />
          </FormControl>

          <FormControl style={styles.input}>
            <Input 
            value={product_buycost}
            onChangeText={text => setProduct_buycost(text)}
            size="lg" placeholder="Buy Cost"
            keyboardType="numeric" 
            Input
            />
          </FormControl>

          <FormControl style={styles.input}>
            <Input 
            value={product_salecost}
            onChangeText={text => setProduct_salecost(text)}
            size="lg" placeholder="Sale Cost"
            keyboardType="numeric" 
            Input
            />
          </FormControl>

          <FormControl style={styles.input}>
            <Input 
            value={product_discription}
            onChangeText={text => setProduct_discription(text)}
            size="lg" placeholder="Description" 
            Input
            />
          </FormControl>

          </View>

          {/* <View style={styles.circle} > */}
          
          {/* <Button style={styles.btn}>Submit</Button> */}

          <TouchableOpacity onPress={()=> Saveproduct()}>
<LinearGradient
      colors={["#808080", "#3fada8"]}
      start={{x: 1.0, y: 0}} // Gradient starting coordinates
      end={{x: 0, y: 0.5}} // Gradient ending coordinates
      style={styles.appButtonContainer}
    >
      <Text style={styles.appButtonText} >Save</Text>
    </LinearGradient>
</TouchableOpacity>
         
          {/* </View> */}

        </VStack>
    </Box>
    </Center>

</LinearGradient>

        </ScrollView>
    </NativeBaseProvider> 
  )
}

export default Product;

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
        paddingTop:50,
        
        
      },
      circle: {
        height: 40,
        width: 100,
        borderRadius: 10,
        position: 'relative',
        top: -30,
        left:110,
        elevation: 10,
        backgroundColor: '#fddb93'
        
      },
      uppercircle:{
        height: 90,
        width: 90,
        borderRadius: 50,
        position: 'relative',
        top: 60,
        left: 15,
        elevation: 10,
        backgroundColor: '#fddb93',
        zIndex:1
      },
      btn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fddb93'
      },
      input:{
          
          marginBottom:10,
          width:'90%',
          borderRadius:7,
          
      },
      head:{
          fontSize:20,
          marginBottom:40,
          fontWeight:'bold',
      },
      appButtonText: {
        fontSize: 15,
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
        height:hp('6%'),
        width:wp('40%'),
        // borderWidth:2,
        position: 'relative',
        top: -40,
        left:80,
        elevation: 10,
      },
    
    })