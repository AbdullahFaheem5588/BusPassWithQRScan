import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (UserType) => {
    if (UserType === 'Student') navigation.replace('StudentTabs');
    else if (UserType === 'Parent') navigation.replace('ParentTabs');
    else if (UserType === 'Conductor') navigation.replace('ConductorTabs');
    else if (UserType === 'Admin') navigation.replace('AdminTabs');
    else setError('Invalid User Type!');
  };

  return (
    <ScrollView style={styles.container}>
    <View style={{alignItems:'center'}}>
    <Image source={require('../assets/ShadingPanel.png')} style={{ width: '100%', height: height * 0.5 }} />
      <Image source={require('../assets/Logo.png')} style={{ marginTop: -(height * 0.4375) }} />
      <Text
        style={{
          marginTop: width * 0.025,
          color: 'white',
          fontSize: width * 0.0625,
          fontWeight: 'bold',
        }}
      >
        Bus Pass With
      </Text>
      <Text
        style={{
          marginBottom: height * 0.225,
          color: 'white',
          fontSize: width * 0.0625,
          fontWeight: 'bold',
        }}
      >
        QR Scan
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        placeholderTextColor="white"
        fontSize={width * 0.04}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry={true}
        fontSize={width * 0.04}
      />
      <Text
        style={{
          marginTop: width * 0.025,
          color: 'red',
          fontSize: width * 0.0375,
          fontWeight: 'bold',
        }}
      >
        {error}
      </Text>
      <TouchableOpacity
        style={{ marginTop: width * 0.05, marginBottom: width * 0.0625 }}
        onPress={() => {
          handleLogin(username);
        }}
      >
        <View style={styles.btn}>
          <Text style={{ fontSize: width * 0.0625, fontWeight: 'bold', color: '#168070' }}>LOG IN</Text>
        </View>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width * 0.9,
    height: height * 0.0625,
    borderRadius: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: width * 0.0125,
  },
  input: {
    marginBottom: width * 0.0125,
    width: width * 0.875,
    borderBottomWidth: 2,
    color: 'white',
    borderColor: 'white',
  },
});

export default Login;