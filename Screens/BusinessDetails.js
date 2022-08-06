import React, { useState, useEffect } from 'react';
import database from '@react-native-firebase/database';
import { StyleSheet, View, Text, ScrollView,TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth'; 
import LinearGradient from 'react-native-linear-gradient';

import {
  Box,
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


const BusinessDetails = ({navigation, route}) => { 

  const user= auth().currentUser;                 //
  const [companyName, setCompanyName] = useState('');
  const [typeOfbusiness, setTypeofbusiness] = useState('');
  const [email, setEmail] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [category, setCategory] = useState('');
  let [errorcompanynamemessage, setErrorCompanyNameMessage] = useState('')
  const status = false;
  // const [status,setStatus] =useState(false);
  const [data, setData] = useState({

        name: route.params.name,
        gender: route.params.gender,
        nationality: route.params.nationality,
        nic: route.params.nic,
        contact: route.params.contact,
  })
  
  const handlepress2 = () => {
    navigation.push("IdentityDetails");
}

/*useEffect(() => {
    getDataBase();
}, [])*/

const handlepress = () => {

  // if(companyName === ''){                                            //For Name
  //   // console.log("Enter Name")
  //   setErrorCompanyNameMessage("Name is Required")
  // }else{
  // // console.log("valid name")
  // setErrorCompanyNameMessage('')
  // setCompanyName(errorcompanynamemessage)
  // }

  if(companyName != '' && email != '' && typeOfbusiness != '' && category != '' && businessAddress != ''){
    getDataBase();

  }else{
    alert("Fill Details Properly")
  }

}

const getDataBase =  () => {

     database().ref(`/admin/users/${user.uid}`)
    // console.log('Auto generated key: ', newReference.key);
    // newReference
    .set({
        user:user.uid,          //
        // id: newReference.key,
        name: data.name,
        gender: data.gender,
        nationality: data.nationality,
        nic: data.nic,
        contact: data.contact,
        companyName: companyName,
        email: email,
        tob: typeOfbusiness,
        category: category,
        businessAddress: businessAddress,
        status:true,
        })
    .then(() => 
    console.log('Data updated.')
    );
    navigation.push("Dashboard")

};

  return (
    <NativeBaseProvider style={styles.container}>
      <ScrollView >
      <LinearGradient
        colors={["#526e6e", "#f2f5f5"]}
        style={styles.buttonContainer}
      >
        
    <Center flex={1} mt="6" mb="20" p="5"> 
    <Box safeArea p="4" py="8" w="100%" h="85%" backgroundColor="white" borderRadius="20">
      
    <View style={styles.heading}>
        <Text style={{fontSize:20}}>
          BUSINESS DETAILS
        </Text>
      </View>

     <VStack space={3} mt="8">
          <FormControl>
          <Text style={styles.labelContainer}> Company Name </Text> 
            <Input 
            style={styles.textstyle}
            pl="3"
            pr="3"
            borderBottomLeftRadius="10"
            borderTopRightRadius="10"
            mb="1"
            value={companyName}
            onChangeText={text => setCompanyName(text)}
            />
          </FormControl>

          <FormControl mb="1">
          <Text style={styles.labelContainer}> Email </Text> 
            <Input
            style={styles.textstyle}
            pl="3"
            pr="3"
            borderBottomLeftRadius="10"
            borderTopRightRadius="10"
            mb="1"
            value={email}
            onChangeText={text => setEmail(text)} 
            />
          </FormControl>

          <Radio.Group name="myRadioGroup"  accessibilityLabel="favorite number" value={typeOfbusiness} onChange={nextValue => {
            setTypeofbusiness(nextValue);
            }}>
            <Radio value="Indiviual" my={1} size="md">
              Indiviual
            </Radio>
            <Radio value="Partnership" my={1} size="md">
             Partnership
            </Radio>
          </Radio.Group>

          <FormControl mt="4">
          <Text style={styles.labelContainer}> Business Address </Text> 
            <Input 
            style={styles.textstyle}
            pl="3"
            pr="3"
            borderBottomLeftRadius="10"
            borderTopRightRadius="10"
            mb="1"
            value={businessAddress}
            onChangeText={text => setBusinessAddress(text)}
            Input
            />
          </FormControl>

          <Select selectedValue={category} minWidth="200" borderTopRightRadius="10" borderBottomLeftRadius="10" accessibilityLabel="Category" size="lg" placeholder="Category" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setCategory(itemValue)}>
          <Select.Item label="Tv" value="tv" />
          <Select.Item label="Refrigerator" value="refrigerator" />
          <Select.Item label="Speaker" value="speaker" />
        </Select>
          

        <Text style={{color:"red",paddingLeft:7}}>{errorcompanynamemessage}</Text>

         <View style={styles.circle} >
           <Button
              style={styles.btn}
              onPress={handlepress2} 
            >
              Previous
          </Button>
          </View>

          <View style={styles.circle1} >
          <Button
              style={styles.btn}
              onPress={handlepress} 
            >
              Finish
          </Button>
          </View>
          
        </VStack>
    </Box>
    </Center>
    </LinearGradient>
    </ScrollView>
    </NativeBaseProvider> 
  )
}

export default BusinessDetails;

const styles = StyleSheet.create({
  
    container:{
      flex:1,
      backgroundColor:'#826cff',
      paddingLeft:20,
      paddingRight:20,
      
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
  heading:{
    // backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:15
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
  circle: {
    height: 40,
    width: 120,
    borderRadius: 10,
    position: 'relative',
    top: 50,
    left:17,
    elevation: 10,
    backgroundColor: '#fddb93',
    marginBottom:20,
    
  },
  circle1: {
    height: 40,
    width: 120,
    borderRadius: 10,
    position: 'relative',
    top: -22,
    left:152,
    elevation: 10,
    backgroundColor: '#fddb93',
    marginBottom:20,
  },
  btn:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'#fddb93'
  },

});