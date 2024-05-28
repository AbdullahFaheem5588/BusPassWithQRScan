import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Api_url from '../Helper/URL';

const {width, height} = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Conductor');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleLoginPress = async () => {
    try {
      if (!username.trim() || !password.trim()) {
        ToastAndroid.show(
          'Please provide necessary credentials!',
          ToastAndroid.SHORT,
        );
        return;
      }

      setLoading(true); // Start loading

      const response = await fetch(
        `${Api_url}/Users/Login?username=${username.trim()}&password=${password.trim()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();
      setLoading(false); // Stop loading

      if (data.userRole === 'Student') {
        navigation.replace('StudentTabs', {userDetails: data.Students});
      } else if (data.userRole === 'Parent') {
        navigation.replace('ParentTabs', {userDetails: data.Parents});
      } else if (data.userRole === 'Conductor') {
        navigation.replace('ConductorTabs', {userDetails: data.Conductors});
      } else if (data.userRole === 'Admin') {
        navigation.replace('AdminTabs', {userDetails: data.Admins});
      } else {
        ToastAndroid.show(data, ToastAndroid.SHORT);
      }
      setUsername('');
      setPassword('');
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../assets/ShadingPanel.png')}
          style={{width: '100%', height: height * 0.5}}
        />
        <Image
          source={require('../assets/Logo.png')}
          style={{marginTop: -(height * 0.4375)}}
        />
        <Text
          style={{
            marginTop: width * 0.025,
            color: 'white',
            fontSize: width * 0.0625,
            fontWeight: 'bold',
          }}>
          Bus Pass With
        </Text>
        <Text
          style={{
            marginBottom: height * 0.225,
            color: 'white',
            fontSize: width * 0.0625,
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
        <TouchableOpacity
          style={{marginTop: width * 0.05, marginBottom: width * 0.0625}}
          onPress={handleLoginPress}
          disabled={loading} // Disable button when loading
        >
          <View style={styles.btn}>
            {loading ? (
              <ActivityIndicator size="large" color="#168070" />
            ) : (
              <Text
                style={{
                  fontSize: width * 0.0625,
                  fontWeight: 'bold',
                  color: '#168070',
                }}>
                LOG IN
              </Text>
            )}
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
