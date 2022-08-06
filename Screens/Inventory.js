import React, { useEffect, useState, useRef } from "react"
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {View, StyleSheet, ScrollView, TextInput, FlatList, SafeAreaView, Animated,Button,TouchableOpacity,Alert} from "react-native"
import { NativeBaseProvider,Heading,Text, Image} from "native-base"
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
// import { TouchableOpacity } from "react-native-gesture-handler";



const Inventory = ({navigation}) => {

    // const [users, setUsers] = useState([]);
    let [products, setProducts] =useState([]);
    const [search, setSearch] = useState(null);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState([]);
    // const [textInput, settextInput] = useState();
    const [editedItem, seteditedItem] = useState(0);
    const [uid, setUid] = useState(auth().currentUser.uid);

    const [productid, setProduct_Id] = useState();
    const [product_name,setProductName] =useState();
    const [product_discription, setProductDescription] = useState();
    const [product_buycost, setProductBuycost] = useState();
    const [product_salecost, setProductSalecost] = useState();
    const [product_quantity, setProductQuantity] =useState();

    const DATA =[
      {id:1,product_name:'Refrigerator',product_quantity:'50',product_buycost:'5000',product_salecost:'10000',product_discription:"Glass"},
      {id:2,product_name:'Television',product_quantity:'80',product_buycost:'25000',product_salecost:'35000',product_discription:"Samsung"},
      
    ]

    const [data,setData] =useState(products)
    const [isRender,setIsRender] = useState(false);
    const [editItem, setEditItem] = useState();
    const [showBox, setShowBox] = useState(true);


    useEffect(() => {

      getAllProducts()
        
    }, []);


      const getAllProducts = async () => {
        try {
        const userRef =  await database().ref(`/admin/products/${uid}`);
        const OnloadingListener = userRef.on('value', snapshot => {
            setProducts([]);
            snapshot.forEach(function(childSnapshot) {
            setProducts(products => [...products,childSnapshot.val()]);
            console.log(products)
            // setFilteredDataSource(products => [...products, childSnapshot.val()]);
            });
        });
        return () => {
          userRef.off('value',OnloadingListener);
      };}catch (e) {
        console.log(e);
      }
      }


    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration:2000,
      useNativeDriver: true,
    }).start();

  
    const onPressItem = (item) =>{
      setModalVisible(true);
      setProductName(item.product_name)
      setProductQuantity(item.product_quantity)
      setProductBuycost(item.product_buycost)
      setProductSalecost(item.product_salecost)
      setProductDescription(item.product_discription)
      setEditItem(item.id)
    }

    const onDeleteItem = (item)=>{


      products.filter(item => item.id !== id)

      const latestData = products.map(item=>{
        if(item.id == editItem){
         console.log("--->",item.id)
         database()
         .ref(`/admin/products/${uid}`)
         .child(`${item.id}`)
         .set(null)
         .then((res) => console.log('Data updated.' ,res))
         .catch((err) => console.log(err))
         return item;
        }
        return item;

     })

      setData(latestData);
      setIsRender(!isRender); 

    }


    // const showConfirmDialog = (item) => {
    //   return Alert.alert(
    //     "Are your sure?",
    //     "Are you sure you want to remove this beautiful box?",
    //     [
    //       // The "Yes" button
    //       {
    //         text: "Yes",
    //         onPress: () => {
    //           setShowBox(false);
    //         },
    //       },
    //       // The "No" button
    //       // Does nothing but dismiss the dialog when tapped
    //       {
    //         text: "No",
    //       },
    //     ]
    //   );
    // };



    const renderItem = ({item,index})=>{
        return(
          <View style={styles.item}>

            <Text style={styles.text}>{item.id}</Text>
            <Image  source={{uri: item.postImg,}}//{require('./bma.png')} 
            style={{ width: 90, height: 90, borderRadius:50 }}/>
              <Text style={styles.text}>{item.product_name}</Text>
              <Text style={styles.text}>{item.product_quantity}</Text>
              <Text style={styles.text}>{item.product_buycost}</Text>
              <Text style={styles.text}>{item.product_salecost}</Text>
              <Text style={styles.text}>{item.product_discription}</Text>

              <TouchableOpacity style={styles.btn} onPress={()=>onPressItem(item)}>
                <Text style={{color:"white"}}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn} onPress={()=>onDeleteItem(item)}>
                <Text style={{color:"white"}}>Delete</Text>
              </TouchableOpacity>
          </View>
               
        )
    }


    const handleEditItem = (editItem) => {
        
        const newData = products.map(item=>{
          if(item.id == editItem){
           console.log("--->",item.id)
           database()
           .ref(`/admin/products/${uid}`)
           .child(`${item.id}`)
           .update({
             product_name : product_name,
             product_quantity : product_quantity,
             product_buycost : product_buycost,
             product_salecost : product_salecost,
             product_discription : product_discription,
           })
           .then((res) => console.log('Data updated.' ,res))
           .catch((err) => console.log(err))
           return item;
          }
          return item;
 
       })

        setData(newData);
        setIsRender(!isRender); 
    }

    const onPressSaveEdit = () =>{
      handleEditItem(editItem); //Save input text to data
      setModalVisible(false)    //close modall
  }

  const exitbutton=()=>{
    setModalVisible(false)
    
  }


  return (
    <NativeBaseProvider>
        <SafeAreaView>

        {/* <LinearGradient
        // colors={["#526e6e", "#f2f5f5"]}
        colors={["#f2f5f5", "#526e6e"]}
        style={styles.buttonContainer}
      > */}


{/* <Button title="Click" onPress={()=>getAllProducts()} /> */}
        
      <FlatList
      data={products}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={renderItem}
      extraData={isRender}
      />



       
       <Modal isVisible={isModalVisible}> 
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          {/* <Text style={{color:"white"}}>{modalData.product_name}</Text> */}
          <Text style={{color:"white",fontSize:18,marginBottom:20}}>We are Working on this Feature....</Text>
  
            <TextInput
            style={styles.textInput}
            onChangeText={(text)=>setProductName(text)}
            defaultValue={product_name}
            editable={true}
            multiline={false}
            />

            <TextInput
            style={styles.textInput}
            onChangeText={(text)=>setProductQuantity(text)}
            defaultValue={product_quantity}
            editable={true}
            multiline={false}
            />

          <TextInput
            style={styles.textInput}
            onChangeText={(text)=>setProductBuycost(text)}
            defaultValue={product_buycost}
            editable={true}
            multiline={false}
            />

            <TextInput
            style={styles.textInput}
            onChangeText={(text)=>setProductSalecost(text)}
            defaultValue={product_salecost}
            editable={true}
            multiline={false}
            />

            <TextInput
            style={styles.textInput}
            onChangeText={(text)=>setProductDescription(text)}
            defaultValue={product_discription}
            editable={true}
            multiline={false}
            />

            <Button title="Update" onPress={()=>onPressSaveEdit()}/>

            <Button title="Cancel" onPress={()=>exitbutton()}/>

        </View>
      </Modal>

      {/* </LinearGradient> */}

        </SafeAreaView>
    </NativeBaseProvider>
    
  )
}

export default Inventory;


const styles = StyleSheet.create({
  container: {

    marginTop: 10,
    marginBottom:10,
    marginRight:20,
    marginLeft:20,
    // borderColor:"#848784",
    borderTopRightRadius:10,
    borderTopLeftRadius:30,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:30,
    alignContent:"center",
    borderRadius: 2,
    // borderWidth: 1,
    borderRightWidth:1,
    borderLeftWidth:3,
    padding: 15,
    marginBottom: 20,
    backgroundColor:"white", 
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    
    
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,

  },
  textInputStyle: {
      height: 40,
      borderWidth: 1,
      borderBottomRightRadius:20,
      borderTopLeftRadius:20,
      borderBottomLeftRadius:5,
      borderTopRightRadius:5,
      paddingLeft:15,
      marginTop: 20,
      borderRightWidth:2,
      borderLeftWidth:3,
      marginBottom:10,
      marginRight:20,
      marginLeft:20,
      // borderColor: '#009688',
      borderColor: 'white',
      // backgroundColor: '#FFFFFF',
      backgroundColor:'transparent'
    },
    text: {
      color:"#323b35",
      letterSpacing:0.8,
      fontFamily:"lucida grande",
      fontSize:15
      
    },
    texth:{
      color:"#323b35",
      letterSpacing:0.8,
      borderBottomWidth:2,
      borderColor:"#cbd1cb",
      paddingBottom:12,
      textAlign:"center",
      fontFamily:"lucida grande",
      fontSize:20
    },


    item:{
      borderWidth:1,
      borderBottomColor:'grey',
      alignItems:'flex-start',
      margin:20,
    },
    text:{
      marginVertical:30,
      fontSize:15,
      fontWeight:'bold',
      marginLeft:10,
    },
    textInput:{
      width:'90%',
      borderColor:'grey',
      borderWidth:1,
      fontSize:25,

    },
    btn:{
      borderWidth:1,
      borderColor:'black',
      backgroundColor:"grey",
      alignItems:'center',
      margin:20,
    }
});
