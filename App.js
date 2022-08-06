import 'react-native-gesture-handler';   //yeh add kia hai
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';
import ForgetPassword from './Screens/ForgetPassword';
import IdentityDetails from './Screens/IdentityDetails';
import BusinessDetails from './Screens/BusinessDetails';
import BusinessListing from './Screens/BusinessListing';
import Test from './Screens/Test';
import SplashScreen from './Screens/Splash';
import AddProduct from './Screens/AddProduct';
import AddSales from './Screens/AddSales';
import Sales from './Screens/Sales';
import Product from './Screens/Product'
import Practice from './Screens/Practice';
import Gradient from './Screens/Gradient';
import Firstview from './Screens/Firstview';
import Inventory from './Screens/Inventory';
import AnotherSplash from './Screens/AnotherSplash'
import StartScreen from './Screens/StartScreen';
import Api from './Screens/Api';
import WebView from 'react-native-webview';
import NewSales from './Screens/NewSales';
import ImagePicker from './Screens/ImagePicker'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='StartScreen' component={StartScreen} options={{ headerShown: false }}/>
      {/* <Stack.Screen name='Product' component={Product} options={{ headerShown: false }}/> */}
      {/* <Stack.Screen name='Product' component={Product} options={{ headerShown: false }}/> */}
        
        {/* <Stack.Screen name='StartScreen' component={AnotherSplash} options={{ headerShown: false }}/>*/}
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
       <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/> 
       {/* <Stack.Screen name="FacebookInsights" component={()=>(<WebView source={{ uri: 'https://www.facebook.com/bsek.pak/' }}/>)} /> */}
       <Stack.Screen name='Api' component={Api}/>
       {/* <Stack.Screen name='Api' component={NewSales}/> */}
       {/* <Stack.Screen name='ImagePicker' component={ImagePicker}/> */}
       <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>       
       {/* <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }}/>   */}
       {/* <Stack.Screen name="IdentityDetails" component={IdentityDetails} options={{ headerShown: false }}/>
      <Stack.Screen name="BusinessDetails" component={BusinessDetails} options={{ headerShown: false }}/>
      <Stack.Screen name="BusinessListing" component={BusinessListing} options={{ headerShown: false }}/>
       <Stack.Screen name='Sales' component={Sales} options={{ headerShown: false }}/>
       <Stack.Screen name='Product' component={Product} options={{ headerShown: false }}/>
       <Stack.Screen name='Inventory' component={Inventory} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;