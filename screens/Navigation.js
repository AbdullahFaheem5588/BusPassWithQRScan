import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, TouchableOpacity} from 'react-native';
import {default as Login} from './Login';
import {useNavigation} from '@react-navigation/native';
import {default as StudentFavStops} from './Student/FavStops';
import {default as StudentDashboard} from './Student/Dashboard';
import {default as StudentMapScreen} from './Student/MapScreen';
import {default as StudentQrCodeScreen} from './Student/QrCodeScreen';
import {default as StudentProfileScreen} from './Student/ProfileScreen';
import {default as NotificationScreen} from './NotificationScreen';
import {default as ChangePasswordScreen} from './ChangePasswordScreen';
import {default as NotificationDetails} from './NotificationDetailsScreen';
import {default as ParentDashboard} from './Parent/Dashboard';
import {default as ParentMapScreen} from './Parent/MapScreen';
import {default as ParentProfileScreen} from './Parent/ProfileScreen';
import {default as ConductorDashboard} from './Conductor/Dashboard';
import {default as ConductorMapScreen} from './Conductor/MapScreen';
import {default as ConductorQrCodeScanner} from './Conductor/QrCodeScanner';
import {default as ConductorProfileScreen} from './Conductor/ProfileScreen';
import {default as Announcement} from './Announcement';
import {default as AdminDashboard} from './Admin/Dashboard';
import {default as AdminMapScreen} from './Admin/MapScreen';
import {default as AdminAddScreen} from './Admin/Add';
import {default as AdminAddNewStudent} from './Admin/AddNewStudent';
import {default as AdminRechargeJourneys} from './Admin/RechargeJourneys';
import {default as AdminAddNewBus} from './Admin/AddNewBus';
import {default as AdminAddNewAdmin} from './Admin/AddNewAdmin';
import {default as AdminSearchAndUpdate} from './Admin/SearchAndUpdate';
import {default as AdminProfileScreen} from './Admin/ProfileScreen';
import {default as HistoryScreen} from './HistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="StudentTabs" component={StudentTabs} />
        <Stack.Screen name="ParentTabs" component={ParentTabs} />
        <Stack.Screen name="ConductorTabs" component={ConductorTabs} />
        <Stack.Screen name="AdminTabs" component={AdminTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NotificationStack = () => {
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
      }}
      initialRouteName="NotificationScreen">
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{title: 'Notification'}}
      />
      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetails}
        options={{
          title: 'Notification Details',
          headerShadowVisible: false,
        }}
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
      }}
      initialRouteName="DashboardScreen">
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
      }}
      initialRouteName="ProfileScreen">
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
        component={HistoryScreen}
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
      }}
      initialRouteName="ProfileScreen">
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
        component={HistoryScreen}
        options={{title: 'History'}}
      />
    </Stack.Navigator>
  );
};
const ConductorProfileStack = () => {
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
      }}
      initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ConductorProfileScreen}
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
const ConductorDashboardStack = () => {
  const navigation = useNavigation();
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
      }}
      initialRouteName="DashboardScreen">
      <Stack.Screen
        name="DashboardScreen"
        component={ConductorDashboard}
        options={{
          title: 'Dashboard',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Announcement')}>
              <Image
                source={require('../assets/Announcement.png')}
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 10,
                  transform: [{rotate: '-20deg'}],
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Announcement"
        component={Announcement}
        options={{title: '', headerShadowVisible: false}}
      />
    </Stack.Navigator>
  );
};
const AdminDashboardStack = () => {
  const navigation = useNavigation();
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
      }}
      initialRouteName="DashboardScreen">
      <Stack.Screen
        name="DashboardScreen"
        component={AdminDashboard}
        options={{
          title: 'Dashboard',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Announcement')}>
              <Image
                source={require('../assets/Announcement.png')}
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 10,
                  transform: [{rotate: '-20deg'}],
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Announcement"
        component={Announcement}
        options={{title: '', headerShadowVisible: false}}
      />
    </Stack.Navigator>
  );
};
const AdminAddStack = () => {
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
      }}
      initialRouteName="AddScreen">
      <Stack.Screen
        name="AddScreen"
        component={AdminAddScreen}
        options={{title: 'Add'}}
      />
      <Stack.Screen
        name="AdminAddNewStudent"
        component={AdminAddNewStudent}
        options={{title: 'Add New Student'}}
      />
      <Stack.Screen
        name="AdminAddNewAdmin"
        component={AdminAddNewAdmin}
        options={{title: 'Add New Admin'}}
      />
      <Stack.Screen
        name="AdminRechargeJourneys"
        component={AdminRechargeJourneys}
        options={{title: 'Recharge Journeys'}}
      />
      <Stack.Screen
        name="AdminAddNewBus"
        component={AdminAddNewBus}
        options={{title: 'Add New Bus'}}
      />
      <Stack.Screen
        name="AdminSearchAndUpdate"
        component={AdminSearchAndUpdate}
        options={{title: 'Search & Update'}}
      />
    </Stack.Navigator>
  );
};
const AdminProfileStack = () => {
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
      }}
      initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={AdminProfileScreen}
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
          marginBottom: 3,
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
          marginBottom: 3,
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

const ConductorTabs = () => {
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
          marginBottom: 3,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'transparent',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={ConductorDashboardStack}
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
        component={ConductorMapScreen}
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
        name="Scan"
        component={ConductorQrCodeScanner}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/QrCodeScanner-Focused.png')
                  : require('../assets/QrCodeScanner-UnFocused.png')
              }
              style={{width: 25, height: 30}}
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
        component={ConductorProfileStack}
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
const AdminTabs = () => {
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
          marginBottom: 3,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'transparent',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={AdminDashboardStack}
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
        component={AdminMapScreen}
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
        name="Add"
        component={AdminAddStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/Add-Focused.png')
                  : require('../assets/Add-UnFocused.png')
              }
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
        component={AdminProfileStack}
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
