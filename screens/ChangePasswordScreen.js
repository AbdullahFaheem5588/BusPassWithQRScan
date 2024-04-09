import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const HandleConfirm = () => {
    if (newPassword !== confirmNewPassword) {
      setError('New Password not Matched!');
    } else {
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        <Image
          source={require('../assets/ChangePassword.png')}
          style={{
            width: 100,
            height: 110,
            marginTop: 20,
            alignSelf: 'center',
            marginBottom: 30,
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={setCurrentPassword}
          value={currentPassword}
          placeholder="Current Password"
          placeholderTextColor="white"
          fontSize={16}
        />
        <TextInput
          style={styles.input}
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder="New Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          fontSize={16}
        />
        <TextInput
          style={styles.input}
          onChangeText={setConfirmNewPassword}
          value={confirmNewPassword}
          placeholder="Confirm New Password"
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
            marginLeft: 15,
            marginBottom: 10,
          }}>
          {error}
        </Text>
      </View>
      <TouchableOpacity onPress={HandleConfirm} style={{marginTop: 30}}>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            CONFIRM
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
    justifyContent: 'center',
  },
  ContentContainer: {
    backgroundColor: '#168070',
    width: width * 0.95,
    borderRadius: 30,
    elevation: 20,
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width * 0.9,
    height: width * 0.125,
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
    marginLeft: width * 0.05,
  },
});

export default ChangePasswordScreen;
