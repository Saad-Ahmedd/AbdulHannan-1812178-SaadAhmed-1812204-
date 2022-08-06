import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import database, {
  firebase,
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

const Sales = ({navigation}) => {
  const [salesId, setSales_Id] = useState('');
  const [product_name, setProduct_name] = useState('');
  const [product_quantity, setProduct_quantity] = useState('');
  const [price, setPrice] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  var [custom_fields, setCustom_Fields] = useState([]);
  const [uid, setUid] = useState(auth().currentUser.uid);
  const [listproduct, setListProduct] = useState([]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [SelectedProduct, setSelectedProduct] = useState(null);
  const [NoOfProduct, setNoOfProduct] = useState(0);
  const [dateofsales, setDateofSale] = useState('Date Of Sales');

  useEffect(() => {
    // console.log("Saad")
    getProducts();
  }, []);

  const getProducts = () => {
    firebase
      .database()
      .ref(`/admin/products/${uid}`)
      .on('value', snapshot => {
        const allProducts = [];
        snapshot.forEach(snapshot => {
          let product = snapshot.val();
          allProducts.push(product);
        });
        setListProduct(allProducts);
      });
  };

  // const arrayitem=["Heelo","hhdk"]

  // firebase.database().ref(`/admin/products/${uid}`)

  // .on('value',snapshot=>{
  //   snapshot.forEach((snapshot) => {
  //     var listproductdata = snapshot.val().product_name
  //      console.log(listproductdata);
  //      setListProduct(listproductdata)
  //    });

  // })

  const addCustom_Fields = () => {
    setCustom_Fields(
      (custom_fields = [...custom_fields, {product_quantity: 'value'}]),
      // custom_fields=[...custom_fields]
    );
  };

  const onProductName = (text, index) => {
    custom_fields[index].product_name = text;
    setProduct_name({custom_fields: custom_fields});
  };

  const onProductQuantity = (text, index) => {
    custom_fields[index].product_quantity = text;
    setProduct_quantity({custom_fields: custom_fields});
  };

  const onProductChange = (item, index) => {
    custom_fields[index].complete_product = item;
  };

  // firebase.database().ref(`/admin/products/${uid}`)

  //   .on('value',snapshot=>{
  //     snapshot.forEach((snapshot) => {
  //       let listproduct = snapshot.val().product_name
  //        console.log(listproduct);
  //        setListProduct(listproduct)
  //      });
  //   })

  const Saveinfo = () => {
    console.log(custom_fields);

    // firebase.database().ref(`/sales/${currentUser.uid}`)

    // const db1 = firebase.database().ref(`/admin/products/${uid}`)
    // const db2= firebase.database().ref(`/admin/products/${uid}/Samsung led/product_quantity`)

    // db1.on('value', snapshot => {

    //   // array.forEach(element => {

    //   // });

    //   if(snapshot.child('Samsung led').exists()){
    //     // console.log('User data: ', snapshot.child('Smart Led').exists());

    //      db2.on('value',snapshot=>{
    //        var test =snapshot.val()
    //        console.log('quantity',test)
    //      })

    //     console.log("success")
    //   }else{
    //     console.log("fail")
    //   }
    // })

    //  firebase.database().ref(`/admin/products/${uid}`)

    //     .on('value',snapshot=>{
    //       snapshot.forEach((snapshot) => {
    //         let listproduct = snapshot.val().product_name
    //          console.log(listproduct);
    //          setListProduct(listproduct)
    //        });

    //     })

    if (salesId != '' && dateofsales != '' && custom_fields.reduce((previousValue, {cost}) => previousValue + cost, 0) != 0) {
      firebase
        .database()
        .ref(`/admin/sales/${uid}`)
        .child(salesId)
        .set({
          salesId: salesId,
          Products: custom_fields,
          dateofsales: dateofsales,
          totalAmount: totalAmount,
        })
        .then(() => {
          return firebase.database().ref(`/admin/sales/${uid}`);
        });
        custom_fields.forEach((custom_field)=>{firebase
        .database()
            .ref(`/admin/products/${uid}/${custom_field.id}`)
            .update({
              product_quantity: Number(custom_field.product_quantity) - Number(custom_field.product_selected_quantity),
            })})
    } else {
      alert('Fill Details Properly');
    }

    setDateofSale('');
    setSales_Id('');
    setTotalAmount('');
    setCustom_Fields([]);

  };

  // deleteDynamicField = (index)=>{
  //   // alert(index)
  //   if (index > -1) {

  //     custom_fields.splice(index,1);
  //      console.log(custom_fields)
  //     //  alert(custom_fields[product_name])
  //     //  setCustom_Fields({custom_fields})
  //   }
  //   // // setCustom_Fields({custom_fields})
  //   // setCustom_Fields({custom_fields:custom_fields})
  // }

  //Date Picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    let fTime =
      'Hours' + tempDate.getHours() + '| Minutes' + tempDate.getMinutes();

    // setText(fDate + '\n' + fTime)
    setDateofSale(fDate);
    // console.log(fDate + '{' + fTime + '}')
    console.log(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  console.log(custom_fields.reduce((previousValue, {cost}) => previousValue + cost, 0));
  return (
    <NativeBaseProvider>
      <ScrollView>
        <LinearGradient
          colors={['#526e6e', '#f2f5f5']}
          // start={{x: 1.0, y: 0}} // Gradient starting coordinates
          // end={{x: 0, y: 0.5}} // Gradient ending coordinates
          style={styles.container}>
          <Center flex={1}>
            <Box safeArea p="1" py="2" w="100%">
              <View style={styles.uppercircle}>
                <Image
                  source={require('./bma.png')}
                  style={{width: 90, height: 90, borderRadius: 50}}
                />
              </View>

              <VStack space={3} mt="8">
                <View style={styles.header}>
                  <Text style={styles.head}> Sales Details</Text>

                  <FormControl style={styles.input}>
                    <Input
                      value={salesId}
                      onChangeText={text => setSales_Id(text)}
                      size="lg"
                      placeholder="Sales_Id"
                      keyboardType="numeric"
                    />
                  </FormControl>

                  {/* <Text>{dateofsales}</Text> */}
                  <TouchableOpacity
                    onPress={() => showMode('date')}
                    style={styles.inputDate}>
                    <Text style={styles.datestyle}>{dateofsales}</Text>
                  </TouchableOpacity>
                  {/* </FormControl> */}

                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="spinner"
                      onChange={onChange}
                    />
                  )}
                  <Text />
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      paddingHorizontal: '5%',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      borderColor: 'lightgrey',
                    }}>
                    <Text>Name</Text>
                    <Text>Cost</Text>
                    <Text>Qty</Text>
                    <Text>Total</Text>
                  </View>
                  <Text />
                  {custom_fields.map((item, index) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        paddingHorizontal: '5%',
                        justifyContent: 'space-between',
                      }}>
                      <Text>{item.product_name}</Text>
                      <Text style={{color: 'grey'}}>
                        {item.product_salecost}
                      </Text>
                      <Text> {item.product_selected_quantity}</Text>
                      <Text> {item.cost}</Text>
                    </View>
                  ))}
                  <Text />

                  {SelectedProduct == null ? (
                    <Select
                      //selectedValue={customInput.key}
                      minWidth="170"
                      //accessibilityLabel="Choose Product"
                      placeholder="Add New Product"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={itemValue => {
                        setSelectedProduct(itemValue);
                        //onProductChange(itemValue, key)
                      }}>
                      {listproduct?.map(product => (
                        <Select.Item
                          label={
                            product.product_name +
                            ' (quantity - ' +
                            product.product_quantity +
                            ')' +
                            ' (price - ' +
                            product.product_salecost +
                            ')'
                          }
                          value={product}
                        />
                      ))}
                    </Select>
                  ) : (
                    <View
                      style={{
                        width: '100%',
                        padding: '5%',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: 'lightgrey',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}>
                        <Text>Adding {SelectedProduct.product_name}</Text>
                        <Text style={{color: 'grey'}}>
                          x{SelectedProduct.product_salecost}
                        </Text>
                      </View>
                      <Text />
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View style={{width: '65%'}}>
                          <Input
                            value={NoOfProduct}
                            onChangeText={text => setNoOfProduct(text)}
                            size="lg"
                            placeholder="Total Amount"
                            keyboardType="numeric"
                            Input
                          />
                          <Text
                            style={{
                              position: 'absolute',
                              right: 10,
                              top: 10,
                              color: 'grey',
                            }}>
                            /{SelectedProduct.product_quantity}
                          </Text>
                        </View>
                        <Text style={{color: 'grey'}}>
                          ={Number(NoOfProduct) * Number(SelectedProduct.product_salecost)}
                        </Text>
                      </View>
                      <Text />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignContent: 'flex-end',
                        }}>
                        <Button
                          onPress={() => {
                            setNoOfProduct(0);
                            setSelectedProduct(null);
                          }}
                          style={[
                            styles.btn,
                            {width: '10%', backgroundColor: '#DC143C'},
                          ]}>
                          Clear
                        </Button>
                        <Button
                          onPress={() => {
                           
                            if (
                              Number(NoOfProduct) > 0 &&
                              Number(NoOfProduct) <= Number(SelectedProduct.product_quantity)
                            ) {
                              setCustom_Fields([
                                ...custom_fields,
                                {
                                  ...SelectedProduct,
                                  product_selected_quantity: NoOfProduct,
                                  cost:
                                  Number(NoOfProduct) * Number(
                                    SelectedProduct.product_salecost),
                                },
                              ]);

                              setNoOfProduct(0);
                              setSelectedProduct(null);
                            } else {
                              Alert.alert('Please enter valid quantity');
                            }
                          }}
                          style={[styles.btn, {width: '10%'}]}>
                          Add
                        </Button>
                      </View>
                    </View>
                  )}

                  <FormControl style={styles.input}>
                    <Input
                     // value={totalAmount}
                      isDisabled={true}
                      //onChangeText={text => setTotalAmount(text)}
                     // size="lg"
                     // placeholder="Total Amount"
                     // keyboardType="numeric"
                     placeholder={""+custom_fields.reduce((previousValue, {cost}) => previousValue + cost, 0)}
                      
                    />
                  </FormControl>
                </View>

                {/* <Button onPress={()=>Saveinfo()}>
  <Text>Save</Text>
</Button> */}

                <TouchableOpacity onPress={() => Saveinfo()}>
                  <LinearGradient
                    colors={['#808080', '#3fada8']}
                    start={{x: 1.0, y: 0}} // Gradient starting coordinates
                    end={{x: 0, y: 0.5}} // Gradient ending coordinates
                    style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* <View style={styles.newcircle}>
                  <Button onPress={() => addCustom_Fields()} style={styles.btn}>
                    +
                  </Button>
                </View> */}
              </VStack>
            </Box>
          </Center>
        </LinearGradient>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Sales;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#826cff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  insidecontainer: {
    backgroundColor: 'green',
    margin: 10,
    height: '80%',
    width: '100%',
  },
  header: {
    left: 0,
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 50,
  },
  salespart: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  circle: {
    height: 40,
    width: 100,
    borderRadius: 10,
    position: 'relative',
    top: -30,
    left: 110,
    elevation: 10,
    backgroundColor: '#fddb93',
  },
  uppercircle: {
    height: 90,
    width: 90,
    borderRadius: 50,
    position: 'relative',
    top: 60,
    left: 15,
    elevation: 10,
    backgroundColor: '#fddb93',
    zIndex: 1,
  },
  btn: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fddb93',
  },
  input: {
    marginBottom: 10,
    marginTop: 10,
    width: '90%',
    borderRadius: 7,
  },
  inputDate: {
    marginBottom: 10,
    width: '90%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 7,
  },
  head: {
    fontSize: 20,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  newcircle: {
    // height: 50,
    // width: 50,
    // borderRadius: 50,
    // position: 'absolute',
    // top: 463,
    // left: 240,
    // elevation: 10,
    // backgroundColor: '#fddb93',
    // justifyContent:'center',
    // alignItems:'center'
    height: 40,
    width: 40,
    position: 'relative',
    top: -101,
    left: 255,
    elevation: 10,
    borderRadius: 50,
    backgroundColor: '#fddb93',
  },
  appButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appButtonContainer: {
    // elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6%'),
    width: wp('40%'),
    // borderWidth:2,
    position: 'relative',
    top: -40,
    left: 75,
    elevation: 10,
  },
  plusButtonContainer: {
    // elevation: 8,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6%'),
    width: wp('10%'),
    // borderWidth:2,
    position: 'relative',
    top: -112,
    left: 250,
    elevation: 8,
  },
  btndate: {
    height: 50,
    // backgroundColor:"#586d6e",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    width: 100,
    borderWidth: 2,
  },
  datestyle: {
    color: '#939393',
    fontSize: 15,
  },
  // facebookButton: {
  //   backgroundColor: "#1a4fa3",
  //   borderRadius: 8,
  //   paddingBottom: 8,
  //   paddingTop: 8,
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   marginRight: 10,
  //   marginLeft:10,
  //   justifyContent:'center',
  //   alignItems:'center'
  // },
});
//  {custom_fields.map((customInput, key) => {
//                     return (
//                       <View key={key} style={styles.salespart}>
//                         {/*yeh view is liye banaya hai taky sales ki screen par multiple products add hosaken. Jab hum Add ke button
//           per click karen to dubara esa form generate ho again teen inputs ke sath*/}
//                         {/*
//             <FormControl style={styles.input}>
//             <Input
//             value={customInput.key }
//             onChangeText={text => onProductName(text,key)}
//             size="lg" placeholder="Product Name"
//             />
//           </FormControl> */}

//                         <Select
//                           selectedValue={customInput.key}
//                           minWidth="150"
//                           accessibilityLabel="Choose Product"
//                           placeholder="Choose Product"
//                           _selectedItem={{
//                             bg: 'teal.600',
//                             endIcon: <CheckIcon size="5" />,
//                           }}
//                           mt={1}
//                           onValueChange={itemValue =>
//                             onProductChange(itemValue, key)
//                           }>
//                           {listproduct?.map(product => {
//                             console.log(product);
//                             return (
//                               <Select.Item
//                                 label={
//                                   product.product_name +
//                                   ' (quantity - ' +
//                                   product.product_quantity +
//                                   ')' +
//                                   ' (price - ' +
//                                   product.product_salecost +
//                                   ')'
//                                 }
//                                 value={product.product_name}
//                               />
//                             );
//                           })}
//                         </Select>

//                         <FormControl style={styles.input}>
//                           <Input
//                             value={customInput.key}
//                             onChangeText={text => onProductQuantity(text, key)}
//                             size="lg"
//                             placeholder="Quantity"
//                             keyboardType="numeric"
//                             Input
//                           />
//                         </FormControl>

//                         {/* <FormControl style={styles.input}>
//             <Input
//             value={price}
//             onChangeText={text => setPrice(text)}
//             size="lg" placeholder="Price"
//             keyboardType="numeric"
//             Input
//             />
//           </FormControl> */}

//                         {/* <Button onPress={()=>deleteDynamicField(key)}>
//           <Text>Delete</Text>
//           </Button> */}
//                       </View>
//                     );
//                   })
//                   }
