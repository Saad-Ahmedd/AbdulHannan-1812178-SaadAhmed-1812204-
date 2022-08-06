import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView,TouchableOpacity,Image,Alert } from 'react-native';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';
import auth, { firebase } from '@react-native-firebase/auth';

import {
  Box,
  // Text,
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
import { cos } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'

const IdentityDetails = ({navigation}) => {

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [nic, setNic] = useState('');
  const [contact, setContact] = useState('');
  const [contacthelper, setContactHelper] =useState('')
  const [nichelper, setNicHelper] =useState('')
  let [errornamemessage, setErrorNameMessage] = useState('')
  let [errorgendermessage, setErrorGenderMessage] = useState('')
  let [errornationalitymessage, setErrorNationalityMessage] = useState('')
  let [errornicmessage, setErrorNicMessage] = useState('')
  let [errorcontactmessage, setErrorContactMessage] = useState('')

  const user=auth().currentUser; 


  //For Image
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  // const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false)

  const icon1 = <Icon  name='lock'   />;

  

  const handleChange = (name,nic,contact,nationality,gender) => {


    uploadImage();
  

    if(name === ''){                                            //For Name
      // console.log("Enter Name")
      setErrorNameMessage("Name is Required")
    }else{
    // console.log("valid name")
    setErrorNameMessage('')
    setName(name)
    }

    if(gender === ''){                                                         //For Gender
      setErrorGenderMessage("Gender is Required")
    }else{
      setErrorGenderMessage('')
      setGender(gender)
    }

    if(nationality === ''){                                                         //For Nationality
      console.log("invalid nationality")
      setErrorNationalityMessage("Nationaility is Required")
    }else{
      setErrorNationalityMessage('')
      setNationality(nationality)
    }
  

    // let nicvalid=/^\(?([0-9]{5})\)?[-. ]?([0-9]{7})[-. ]?([0-9]{1})$/;                    //For NIC
    // if(nicvalid.test(nic)=== false){
    //   console.log("invalid nic")
    //   setErrorNicMessage("Nic is Required")
    // }
    // else{
    //   // console.log("valid")
    //   setErrorNicMessage('')
    //   setNic(nic)
    //   // setErrorContactMessage("Valid Contact Number")
    // }



    // let valid= /^\(?([0-9]{4})\)?[-. ]?([0-9]{7})$/;                              //For Contact Number
    // if(valid.test(contact)===false){
    //   console.log("invalid number")
    //   setErrorContactMessage("Contact Number is Required")
    
    // }else{
    //    console.log("valid")
    //   // setErrorContactMessage('')
    //   setContact(contact)
    //   setErrorContactMessage("Valid Contact Number")
    // }


    if(name != '' && contact != '' && nic != '' && gender != '' && nationality != ''){
      navigation.push("BusinessDetails",
      {name:name,
      contact:contact,
      nic:nic,
      gender:gender,
      nationality:nationality});


      console.log(name,contact,nic,nationality,gender)
    }
    
}


const contactvalidator =(text)=>{
  
  let valid=/^\d{11}$/;                        //For Contact Number
  if(valid.test(text)=== false ){
  console.log("invalid number")
    setErrorContactMessage("Contact Number is in bad format")
    
  }else{
  //  console.log("valid")
    setContact(text)
    setErrorContactMessage("Valid Contact Number")
  }
}


const nicvalidator = (text)=>{

  let nicvalid=/^\d{13}$/;                 //For NIC
  if(nicvalid.test(text)=== false){
    console.log("invalid nic")
    setErrorNicMessage("Nic is in bad format")
  }
  else{
    // console.log("valid nic")
    // setErrorNicMessage('')
    setNic(text)
    setErrorNicMessage("Valid Nic")
  }
}




//Profile Image Code

const takePhotoFromCamera = () => {
  ImagePicker.openCamera({
    width: 1200,
    height: 780,
    cropping: true,
  }).then((image) => {
    console.log(image);
    const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
    setImage(imageUri);
  });
};

const choosePhotoFromLibrary = () => {
  ImagePicker.openPicker({
    width: 1200,
    height: 780,
    cropping: true,
  }).then((image) => {
    console.log(image);
    const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
    setImage(imageUri);
  });
};
  
  

const uploadImage = async () => {
  if( image == null ) {
    return null;
  }
  const uploadUri = image;
  let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  // Add timestamp to File Name
  const extension = filename.split('.').pop(); 
  const name = filename.split('.').slice(0, -1).join('.');
  filename = name + Date.now() + '.' + extension;

  setUploading(true);
  setTransferred(0);

  const storageRef = storage().ref(`photos/${user.uid}`);
  const task = storageRef.putFile(uploadUri);

  // Set transferred state
  task.on('state_changed', (taskSnapshot) => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );

    setTransferred(
      Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
    );
  });

  try {
    await task;

    const url = await storageRef.getDownloadURL();

    setUploading(false);
    setImage(null);

    Alert.alert(
      'Image uploaded!',
      'Your image has been uploaded Successfully!',
    );
    return url;

  } catch (e) {
    console.log(e);
    return null;
  }

};




  return (
    
    <NativeBaseProvider style={styles.container} >
      <ScrollView>
    <LinearGradient
        colors={["#526e6e", "#f2f5f5"]}
        style={styles.buttonContainer}
      >
    <Center flex={1} mt="6" mb="20" p="5"> 
    <Box safeArea p="4" py="8" w="100%"  backgroundColor="white" borderRadius="20">
      
      <View style={styles.heading}>
        <Text style={{fontSize:20}}>
          IDENTITY DETAILS
        </Text>
      </View>

     <VStack space={3} mt="8" >



     <View style={styles.imagefunction}>

{/* <TouchableOpacity style={styles.selectButton} onPress={takePhotoFromCamera}>
<Text style={styles.buttonText}>Take Picture</Text>
</TouchableOpacity> */}

<Button style={styles.selectButton} onPress={takePhotoFromCamera}>Take Picture</Button>

<Button style={styles.selectButton} onPress={choosePhotoFromLibrary}>Choose Image</Button>

{/* <TouchableOpacity style={styles.selectButton} onPress={choosePhotoFromLibrary}>
<Text style={styles.buttonText}>Choose Image</Text>
</TouchableOpacity> */}

</View>

                <View style={styles.imagefunction}>

                <View style={styles.imageContainer}>
                {image !== null ? (
                <Image source={{ uri: image.uri }} style={styles.imageBox} />
                ) : null}
                {uploading ? (
                <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
                </View>
                ) 
                : (
                // <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                // <Text style={styles.buttonText}>Upload </Text>
                // </TouchableOpacity>
                <Text>Check Uploaded Image Here</Text>
                )}
                </View>
                </View>

          <FormControl mt="4" isRequired={true}>
            
          <Text style={styles.labelContainer}> Name </Text> 
            <Input 
            isRequired={true}
            style={styles.textstyle}
            pl="3"
            pr="3"
            borderBottomLeftRadius="10"
            borderTopRightRadius="10"
            mb="1"
            value={name}
            onChangeText={text => setName(text)}
            
            />
          </FormControl>

          <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={gender} onChange={nextValue => {
            setGender(nextValue);
            }}>
            <Radio value="Male" my={1} size="md">
                Male
            </Radio>
            <Radio value="Female" my={1} size="md" >
                Female
            </Radio>
            </Radio.Group>

            <Select selectedValue={nationality} minWidth="200" accessibilityLabel="nationality" size="lg"  placeholder="Nationality" borderTopRightRadius="10" borderBottomLeftRadius="10" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" 
                />
            }} mt={1} onValueChange={itemValue => setNationality(itemValue)}>
                <Select.Item label="Pakistan" value="pakistan" />
                <Select.Item label="India" value="india" />
                <Select.Item label="Dubai" value="dubai" />
            </Select>


          <FormControl mt="2">

          <Text style={styles.labelContainer}> NIC </Text> 

            <Input 
            // value={nic}
            onChangeText={(text)=>nicvalidator(text)}
            onFocus={()=>setNicHelper('Should be 13 Digits')}
            onBlur={()=>setNicHelper('')}
            style={styles.textstyle}
            keyboardType='phone-pad'
            pl="3"
            pr="3"
            maxLength={13}
            borderBottomLeftRadius="10"
            borderTopRightRadius="10"
            mb="1"
            Input
            />
          <Text>{nichelper}</Text>
          </FormControl>


          <FormControl mt="2" isRequired={true}>

          <Text style={styles.labelContainer}> Contact No</Text> 
            <Input 
            isRequired={true}
            
            // onChangeText={text=>setContact(text)}
            onChangeText={(text)=>contactvalidator(text)}
            onFocus={()=>setContactHelper('Should be 11 Digits')}
            onBlur={()=>setContactHelper('')}
            keyboardType='phone-pad'
            style={styles.textstyle}
            maxLength={11}
            pl="3"
            pr="3"
            borderBottomLeftRadius="10"
            borderTopRightRadius="10"
            mb="1"
            Input
            />
         <Text> {contacthelper}</Text>
          </FormControl>


<View style={styles.mistake}>

          <Text style={{color:"red",paddingLeft:7}}>{errornamemessage}</Text>
          <Text style={{color:"red",paddingLeft:7}}>{errorgendermessage}</Text>
          <Text style={{color:"red",paddingLeft:7}}>{errornationalitymessage}</Text>
          <Text style={{color:"red",paddingLeft:7}}>{errornicmessage}</Text>
          <Text style={{color:"red",paddingLeft:7}}>{errorcontactmessage}</Text>


</View>

         <View style={styles.circle} >
           <Button style={styles.btn} onPress={()=>handleChange(name,nic,contact,nationality,gender)}>Next</Button>
         </View> 
         
      
        </VStack>
    </Box>
    </Center>
    </LinearGradient>
    </ScrollView>
    </NativeBaseProvider> 
    
  )
}

export default IdentityDetails;

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
    marginBottom:8
  },
  circle: {
    height: 40,
    width: 140,
    borderRadius: 10,
    position: 'relative',
    top: 70,
    left:75,
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
  mistake:{
    // borderWidth:2,
    marginTop:30,
  },
  uploadButton: {
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: '#5f667f',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20
  },
  selectButton: {
    borderRadius: 35,
    width: 130,
    height: 40,
    padding:5,
    // backgroundColor: '#586d6e',
    alignItems: 'center',
    justifyContent: 'center',
    margin:10,
  },
    imagefunction:{
      //   borderWidth:2,
        flexDirection:"row",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      
    },
  
})