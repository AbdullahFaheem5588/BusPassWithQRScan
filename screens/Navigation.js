import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';
import {default as StudentFavStops} from './Student/FavStops';
import { default as StudentDashboard } from './Student/Dashboard';
import { default as StudentMapScreen } from './Student/MapScreen';
import { default as Login } from './Login';
import { default as StudentQrCodeScreen } from './Student/QrCodeScreen';
import { default as StudentProfileScreen } from './Student/ProfileScreen';
import { default as NotificationScreen } from './NotificationScreen';
import { default as ChangePasswordScreen } from './ChangePasswordScreen';
import { default as StudentHistoryScreen } from './Student/HistoryScreen';
import { default as NotificationDetails } from './NotificationDetailsScreen';
import { default as ParentDashboard } from './Parent/Dashboard';
import {default as ParentMapScreen } from  './Parent/MapScreen';
import {default as ParentProfileScreen } from './Parent/ProfileScreen';
import {default as ParentHistoryScreen } from './Parent/HistoryScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="StudentTabs" component={StudentTabs} />
        <Stack.Screen name="ParentTabs" component={ParentTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NotificationStack = () => {
  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2FAA98',
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#2FAA98',
        },
      }} initialRouteName='NotificationScreen'>
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{title: 'Notification'}}
      />
      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetails}
        options={{title: 'Notification Details'}}
      />
    </Stack.Navigator>
  );
};

const StudentDashboardStack = () => {
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
        component={StudentDashboard}
        options={{title: 'Dashboard'}}
      />
      <Stack.Screen
        name="FavStops"
        component={StudentFavStops}
        options={{title: 'Favourite Stops'}}
      />
    </Stack.Navigator>
  );
};
const StudentProfileStack = () => {
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
        component={StudentProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{title: 'Change Password'}}
      />
      <Stack.Screen
        name="History"
        component={StudentHistoryScreen}
        options={{title: 'History'}}
      />
    </Stack.Navigator>
  );
};

const ParentProfileStack = () => {
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
        component={ParentProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{title: 'Change Password'}}
      />
      <Stack.Screen
        name="History"
        component={ParentHistoryScreen}
        options={{title: 'History'}}
      />
    </Stack.Navigator>
  );
};


const StudentTabs = () => {
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
        component={StudentDashboardStack}
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
        component={StudentMapScreen}
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
        component={StudentQrCodeScreen}
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
        component={NotificationStack}
        options={{
          headerShown: false,
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
        component={StudentProfileStack}
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

const ParentTabs = () => {
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
        component={ParentDashboard}
        options={{
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
        component={ParentMapScreen}
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
        name="Notification"
        component={NotificationStack}
        options={{
          headerShown: false,
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
        component={ParentProfileStack}
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
