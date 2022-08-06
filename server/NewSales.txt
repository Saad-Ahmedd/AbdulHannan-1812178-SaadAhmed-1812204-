import React, { useEffect, useState, useRef } from "react"
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {View, StyleSheet, ScrollView, TextInput, FlatList, SafeAreaView, Animated, TouchableOpacity, Modal} from "react-native"
import { NativeBaseProvider,Heading,Text,Box,FormControl,Input,} from "native-base"

const BusinessListing = ({navigation}) => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState(null);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [pending, setPending] = useState(true);
    const [product_name, setProduct_name] = useState('');
    const [product_quantity, setProduct_quantity] = useState();
    const [product_newQuantity, setProduct_newQuantity] = useState();
    const [product_buycost, setProduct_buycost] = useState('');
    const [product_salecost, setProduct_salecost] = useState();
    const [product_discription, setProduct_discription] = useState('');
    const [uid, setUid] = useState(auth().currentUser.uid);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTotal, setNewTotal] = useState(0);
    const [product_id, setProduct_id] = useState('');
    const [visibility, setVisibility] = useState(false);
    const [item, setItem] = useState([
        {
        id: 0,
        product: "Samsung Tv",
        },
        {
          id: 1,
          product: "Dawlance",
        },
    ])
    const [addView, setAddView] = useState()


    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration:2000,
      useNativeDriver: true,
    }).start();



    useEffect(() => {

        const userRef = database().ref(`/admin/products/${uid}`);
        const OnloadingListener = userRef.on('value', snapshot => {
            setUsers([]);
            snapshot.forEach(function(childSnapshot) {
            setUsers(users => [...users, childSnapshot.val()]);
            setFilteredDataSource(users => [...users, childSnapshot.val()]);
            setPending(false);
            });
        });
        return () => {
            userRef.off('value',OnloadingListener);
        };

    }, []);


      const ItemView = ({item}) => {
        return (
          // Flat List Item
          <Animated.View style={[
            styles.container,
            {
              opacity:fadeAnim
            } 
          ]}>
          <TouchableOpacity
            //style={styles.button}
            onPress={() => {
                setProduct_name(item.product_name)
                setProduct_salecost(item.product_salecost)
                setProduct_quantity(item.product_quantity)
                setProduct_id(item.product_id)
                setModalVisible(false)
            }} 
            >
            <Heading size="sm">
                {item.product_name}
            </Heading>
        </TouchableOpacity>
          </Animated.View>
        );
      };

      const Addproduct = () => {
        forEach()
        setItem([
          {
          product_id: 0,
          product_name: "Samsung Tv",
          product_quantity: 5,
          total: 1200,
          },
        ])
      }

      const TotalPrice = () => {
        const totalprice = parseInt(product_newQuantity)*parseInt(product_salecost);
        setNewTotal(totalprice);
        const totalquantity = parseInt(product_quantity)-parseInt(product_newQuantity);
        setProduct_quantity(totalquantity);
        if(product_quantity >= product_newQuantity)
        {   
        setVisibility(true);
        }else{
          alert("Invalid product quantity...")
          setVisibility(false);
          setNewTotal(0)
        }
         //alert({newTotal});
         //alert(tp)
      }

      const handleSalesUpdate = () => {
  
          database()
            .ref(`/admin/products/${uid}/${product_id}`)
            .update({
              product_quantity: product_quantity,
            })
            // .then(() => 
            //   getDataBase()
            // )
            .then(() =>
            alert("Sales Updated...")
            )
      }

      const getDataBase = async () => {
        try {
            const newReference = database().ref(`/admin/sales/${uid}`).push();
            console.log('Auto generated key: ', newReference);
            newReference
            .set({
                item: item
                // product_id: product_id,
                // product_name: product_name,
                // product_quantity: product_newQuantity,
                // total_price: newTotal,
                // product_salecost: product_salecost,
                })
            .then(() => 
            console.log('Data updated.'));
            alert("Product added.")
            navigation.push("Dashboard")
        } catch (err) {
          
        }
        };



      const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = users.filter(
            function (item) {
              const itemData = item.product_name
                ? item.product_name.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(users);
          setSearch(text);
        }
      };


      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };


      const SalesView =  () => {
        return(
          <View>  
              <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
          >
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
          {/* {pending && <Text style = {styles.loading}>Loading...</Text>} */}
          <View style = {styles.modalview}>   
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          /> 
          <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)} 
              >
              <Text style={styles.buttonText}>Select Product</Text>
          </TouchableOpacity>
          </View>
          </Modal>
          <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)} 
              >
              <Text style={styles.buttonText}>Select Product</Text>
          </TouchableOpacity>
          <View style = {{flexDirection: "row"}}>
          <Heading size="sm">
              PRODUCT NAME:
          </Heading>
          <Text style = {{marginRight: 5}}>{product_name}</Text>
          </View>
          <View style = {{flexDirection: "row"}}>
          <Heading size="sm">
              PRODUCT PRICE:
          </Heading>
          <Text style = {{marginRight: 5}}>{product_salecost}</Text>
          </View>
          <View style = {{flexDirection: "row"}}>
          <Heading size="sm">
              PRODUCT QUANTITY:
          </Heading>
          <Text style = {{marginRight: 5}}>{product_quantity}</Text>
          </View>
          <FormControl>
              <Input 
              value={product_newQuantity}
              onChangeText={text => setProduct_newQuantity(text)}
              //onChange={setTotal(product_salecost*product_newQuantity)}
              size="lg" placeholder="Quantity"
              keyboardType="numeric" 
              Input
              />
            </FormControl>
       </View> 
        )
      }
    
    

  return (
    <NativeBaseProvider>
        <SafeAreaView style={{backgroundColor:"#cccbc6"}}>
        <Heading>
          ADD SALES
        </Heading>
        {/* {pending && <Text style = {styles.loading}>Loading...</Text>} */}
        <SalesView />
        <View style = {{flexDirection: "row"}}>
        <Heading size="sm">
            TOTAL: {newTotal}
        </Heading>
        <TouchableOpacity
            style={styles.button}
            onPress={TotalPrice} 
            >
            <Text style={styles.buttonText}>Total</Text>
        </TouchableOpacity>
        { visibility ? (
        <View>  
          <TouchableOpacity
              style={styles.button}
              onPress={handleSalesUpdate} 
              >
              <Text style={styles.buttonText}>Sales</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.button}
          //onPress={} 
          >
          <Text style={styles.buttonText}> + </Text>
          </TouchableOpacity>
       </View>
        ) : (<></>)
        }
        </View>
        </SafeAreaView>
    </NativeBaseProvider>
    
  )
}

export default BusinessListing ;


const styles = StyleSheet.create({
  container: {

    marginTop: 10,
    marginBottom:10,
    marginRight:20,
    marginLeft:20,
    // borderColor:"#848784",
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    alignContent:"center",
    borderRadius: 2,
    // borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    backgroundColor:"white", 
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderLeftColor: 'black',
    borderLeftWidth: 2,
    
    
  },
  input: {
      height: 50,
      margin: 15,
      borderWidth: 1,
      padding: 10,

  },
  textInputStyle: {
      height: 40,
      borderWidth: 1,
      borderRadius: 10,
      padding: 5,
      marginTop: 10,
      marginBottom:10,
      marginRight:20,
      marginLeft:20,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
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
    loading:{
      fontSize: 20,
      marginTop: 250,
      marginBottom:10,
      marginRight:20,
      marginLeft:20,
      // borderColor:"#848784",
      borderTopRightRadius:10,
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      alignContent:"center",
      // borderWidth: 1,
      padding: 20,
      paddingLeft: 130,
      marginBottom: 20, 
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
      color: "black",
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalview: {
        flex: 1,
        backgroundColor: "#e0e0e0",
    }
});
