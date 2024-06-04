import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import Api_url from '../../Helper/URL';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const AddNewAdmin = () => {
  const navigation = useNavigation();
  const Genders = [
    {key: 1, value: 'Male'},
    {Key: 2, value: 'Female'},
  ];
  const [adminDetails, setAdminDetails] = useState({
    Name: '',
    Contact: '',
    Password: '',
    Gender: '',
  });

  const addNewAdmin = async () => {
    try {
      if (
        Object.values(adminDetails).every(
          value => typeof value === 'string' && value.trim() !== '',
        )
      ) {
        const response = await fetch(`${Api_url}/Users/InsertAdmin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(adminDetails),
        });

        if (response.ok) {
          const data = await response.json();
          navigation.goBack();
          ToastAndroid.show(data, ToastAndroid.SHORT);
        } else {
          const data = await response.json();
          console.log(data);
          return;
        }
      } else {
        ToastAndroid.show(
          'Please provide the necessary details!',
          ToastAndroid.SHORT,
        );
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.FormContainer}>
        <Text
          style={{
            color: 'white',
            fontSize: width * 0.06,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginBottom: height * 0.03,
          }}>
          Admin Details
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            temp = {...adminDetails};
            temp.Name = e;
            setAdminDetails(temp);
          }}
          value={adminDetails.Name}
          placeholder="Name"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <TextInput
          style={styles.input}
          onChangeText={e => {
            temp = {...adminDetails};
            temp.Contact = e;
            setAdminDetails(temp);
          }}
          value={adminDetails.Contact}
          keyboardType="phone-pad"
          placeholder="Contact No"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <TextInput
          style={styles.input}
          onChangeText={e => {
            temp = {...adminDetails};
            temp.Password = e;
            setAdminDetails(temp);
          }}
          value={adminDetails.Password}
          keyboardType="visible-password"
          placeholder="Password"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <SelectList
          setSelected={val => {
            setAdminDetails(prevDetails => ({
              ...prevDetails,
              Gender: val,
            }));
          }}
          data={Genders}
          save="value"
          search={false}
          placeholder="Select Gender"
          inputStyles={{color: 'white'}}
          dropdownTextStyles={{color: 'white'}}
          dropdownStyles={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 5,
            width: width * 0.8,
            alignSelf: 'center',
            color: 'white',
            alignItems: 'center',
            marginBottom: height * 0.02,
          }}
          boxStyles={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 5,
            width: width * 0.8,
            alignSelf: 'center',
            color: 'white',
            marginTop: height * 0.02,
            marginBottom: height * 0.02,
          }}
        />
      </View>
      <TouchableOpacity onPress={addNewAdmin}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>ADD</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
    justifyContent: 'center',
  },
  FormContainer: {
    backgroundColor: '#168070',
    width: width * 0.95,
    borderRadius: width * 0.075,
    elevation: width * 0.025,
    alignSelf: 'center',
    verticalAlign: 'middle',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  input: {
    marginBottom: height * 0.02,
    width: width * 0.8,
    height: height * 0.053,
    borderBottomWidth: 2,
    color: 'white',
    borderColor: 'white',
    alignSelf: 'center',
    textAlign: 'center',
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
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  btnText: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#168070',
  },
});

export default AddNewAdmin;
