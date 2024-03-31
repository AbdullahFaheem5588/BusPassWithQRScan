import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = UserType => {
    if (UserType === 'Student') navigation.replace('StudentTabs');
    else if (UserType === 'Parent') navigation.replace('ParentTabs');
    else if (UserType === 'Condutor') navigation.replace('StudentTabs');
    else if (UserType === 'Admin') navigation.replace('StudentTabs');
    else setError('Invalid User Type!')
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ShadingPanel.png')}
        style={{width: '100%', height: '50%'}}
      />
      <Image source={require('../assets/Logo.png')} style={{marginTop: -350}} />
      <Text
        style={{
          marginTop: 10,
          color: 'white',
          fontSize: 25,
          fontWeight: 'bold',
        }}>
        Bus Pass With
      </Text>
      <Text
        style={{
          marginBottom: 180,
          color: 'white',
          fontSize: 25,
          fontWeight: 'bold',
        }}>
        QR Scan
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        placeholderTextColor="white"
        fontSize={16}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry={true}
        fontSize={16}
      />
      <Text
        style={{
          marginTop: 10,
          color: 'red',
          fontSize: 15,
          fontWeight: 'bold',
        }}>
        {error}
      </Text>
      <TouchableOpacity
        style={{marginTop: 20, marginBottom: 25}}
        onPress={() => {
          handleLogin(username);
        }}>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            LOG IN
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#168070',
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 360,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  input: {
    marginBottom: 5,
    width: 350,
    borderBottomWidth: 2,
    color: 'white',
    borderColor: 'white',
  },
});

export default Login;
