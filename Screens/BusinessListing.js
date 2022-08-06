import React, { useEffect, useState, useRef } from "react"
import database from '@react-native-firebase/database';
import {View, StyleSheet, ScrollView, TextInput, FlatList, SafeAreaView, Animated,Button} from "react-native"
import { NativeBaseProvider,Heading,Text} from "native-base";
import LinearGradient from 'react-native-linear-gradient';


const BusinessListing = ({navigation}) => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState(null);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [loading, setLoading] = useState(true);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration:2000,
      useNativeDriver: true,
    }).start();



    useEffect(() => {

  
        const userRef = database().ref('/admin/users');
        const OnloadingListener = userRef.on('value', snapshot => {
            setUsers([]);
            snapshot.forEach(function(childSnapshot) {
            setUsers(users => [...users, childSnapshot.val()]);
            setFilteredDataSource(users => [...users, childSnapshot.val()]);
            });
        });
        return () => {
            userRef.off('value',OnloadingListener);
        };

    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = users.filter(
            function (item) {
              const itemData = item.category
                ? item.category.toUpperCase()
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

      const ItemView = ({item}) => {
        return (
          // Flat List Item
          <Animated.View style={[
            styles.container,
            {
              opacity:fadeAnim
            } 
          ]}>
          <Heading size="sm" style = {{}}>
          {item.companyName}
          </Heading>
          <Text mt="5" fontWeight="medium">
              Individual Name: {item.name}
          </Text>
          {/* <Text mt="5" fontWeight="medium">
              Individual id: {item.id}
          </Text> */}
          <Text mt="1" fontWeight="medium">
              Category: {item.category}
          </Text>
          <Text mt="1" fontWeight="medium">
              Type of Business: {item.tob}
          </Text>
          <Text mt="1" fontWeight="medium">
              Business Address: {item.businessAddress}
          </Text>
          <Text mt="1" fontWeight="medium">
              Contact no: {item.contact}
          </Text>
          </Animated.View>
        );
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
    

  return (
    <NativeBaseProvider>
        <SafeAreaView>
        <LinearGradient
        // colors={["#526e6e", "#f2f5f5"]}
        colors={["#f2f5f5", "#526e6e"]}
        style={styles.buttonContainer}
      >


        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
        // style={{backgroundColor:"red"}}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        </LinearGradient>
       
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
      borderRightWidth:3,
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
    }
});
