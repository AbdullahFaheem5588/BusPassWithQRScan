import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';
import FavStops from './Student/FavStops';
import Dashboard from './Student/Dashboard';
import MapScreen from './Student/MapScreen';
import Login from './Login';
import QrCodeScreen from './Student/QrCodeScreen';
import ProfileScreen from './Student/ProfileScreen';
import NotificationScreen from './Student/NotificationScreen';
import ChangePasswordScreen from './Student/ChangePasswordScreen';
import HistoryScreen from './Student/HistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2FAA98',
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#2FAA98',
        },
      }} initialRouteName='DashboardScreen'>
      <Stack.Screen
        name="DashboardScreen"
        component={Dashboard}
        options={{title: 'Dashboard'}}
      />
      <Stack.Screen
        name="FavStops"
        component={FavStops}
        options={{title: 'Favourite Stops'}}
      />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2FAA98',
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#2FAA98',
        },
      }} initialRouteName='ProfileScreen'>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{title: 'Change Password'}}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{title: 'History'}}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2FAA98',
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#2FAA98',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom:3,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'transparent',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/Home-Focused.png')
                  : require('../assets/Home-UnFocused.png')
              }
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/Map-Focused.png')
                  : require('../assets/Map-UnFocused.png')
              }
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QR Code"
        component={QrCodeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/QrCode-Focused.png')
                  : require('../assets/QrCode-UnFocused.png')
              }
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/Notification-Focused.png')
                  : require('../assets/Notification-UnFocused.png')
              }
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/Profile-Focused.png')
                  : require('../assets/Profile-UnFocused.png')
              }
              style={{width: 25, height: 30}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
