import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../screens/Landing';
import Auth from '../screens/Auth';
import Dashboard from '../screens/Dashboard';
import Post from '../screens/Post';

export type RootParamList = {
  replace: any;
  reset: any;
  getParam: any;
  goBack: any;
  navigate: any;
  Landing: undefined
  Auth: undefined
  Dashboard: undefined
  Post: {
    noteValue: undefined
  }
};

const Stack = createNativeStackNavigator<RootParamList>();


const Routes = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing} options={{ 
          headerTitle: "Secure Notes"
         }} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false
        }}/>
        <Stack.Screen name="Post" component={Post} initialParams={{ 
          noteValue: undefined
         }}/>
    </Stack.Navigator>
  )
}

export default Routes