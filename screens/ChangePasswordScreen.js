import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {Api_url} from '../Helper/URL';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ChangePasswordScreen = ({route}) => {
  const UserId = route.params.UserId;
  const navigation = useNavigation();
  const [oldPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const HandleConfirm = () => {
    if (newPassword !== confirmNewPassword) {
      ToastAndroid.show(
        'New Password and Confirm New Password not matched!',
        ToastAndroid.SHORT,
      );
    } else if (newPassword.length < 3) {
      ToastAndroid.show(
        'New Password should atleast consists of 8 letters!',
        ToastAndroid.SHORT,
      );
    } else {
      changePassword();
      navigation.goBack();
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const changePassword = async () => {
    const dataToSend = {
      id: UserId,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      const response = await fetch(`${Api_url}/Users/ChangePassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();
      ToastAndroid.show(data, ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error:', error);
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
          value={oldPassword}
          placeholder="Current Password"
          placeholderTextColor="white"
          secureTextEntry={true}
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
          style={[styles.input, {marginBottom: height * 0.05}]}
          onChangeText={setConfirmNewPassword}
          value={confirmNewPassword}
          placeholder="Confirm New Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          fontSize={16}
        />
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
