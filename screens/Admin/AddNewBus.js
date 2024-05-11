import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';

const {width, height} = Dimensions.get('window');

const AddNewBus = () => {
  const [newOrOldConductor, setNewOrOldConductor] = useState('');
  const Genders = [
    {key: 1, value: 'Male'},
    {Key: 2, value: 'Female'},
  ];
  const Routes = [
    {key: '1', value: 'Saddar - Chandni Chowk (8:30)'},
    {key: '2', value: 'Chandni Chowk - Saddar (4:30)'},
  ];
  const ConductorIdsFromDB = [
    {key: 1, value: 'Ahmed Shehbaz'},
    {key: 2, value: 'Ali Butt'},
  ];
  const ConductorSelection = [
    {key: 1, value: 'New Conductor'},
    {Key: 2, value: 'Existing Conductor'},
  ];
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [busDetails, setBusDetails] = useState({
    RegNo: '',
    Seats: '',
    ConductorId: null,
    Routes: selectedRoutes,
  });
  const [conductorDetails, setConductorDetails] = useState({
    Name: '',
    Contact: '',
    Password: '',
    Gender: '',
  });

  const addButton = () => {
    setBusDetails(prevDetails => ({
      ...prevDetails,
      Routes: selectedRoutes,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.FormContainer}>
        <Text
          style={{
            color: 'white',
            fontSize: width * 0.06,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginBottom: height * 0.03,
          }}>
          Bus Details
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            temp = {...busDetails};
            temp.RegNo = e;
            setBusDetails(temp);
          }}
          value={busDetails.RegNo}
          placeholder="Registration No"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <TextInput
          style={styles.input}
          onChangeText={e => {
            temp = {...busDetails};
            temp.Seats = e;
            setBusDetails(temp);
          }}
          value={busDetails.Seats}
          keyboardType="numeric"
          placeholder="No of Seats"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <MultipleSelectList
          setSelected={setSelectedRoutes}
          data={Routes}
          save="key"
          label="Selected Routes"
          search={false}
          boxStyles={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 5,
            width: width * 0.8,
            alignSelf: 'center',
            color: 'white',
          }}
          dropdownStyles={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 5,
            width: width * 0.8,
            alignSelf: 'center',
            color: 'white',
            maxHeight: height * 0.24,
          }}
          checkBoxStyles={{borderColor: 'white'}}
          labelStyles={{color: 'white'}}
          dropdownItemStyles={{justifyContent: 'center', color: 'white'}}
          dropdownTextStyles={{color: 'white'}}
          inputStyles={{color: 'white'}}
          placeholder="Select Routes Here"
        />
        <SelectList
          setSelected={val => setNewOrOldConductor(val)}
          data={ConductorSelection}
          save="value"
          search={false}
          placeholder="New or Existing Conductor?"
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
      {newOrOldConductor === 'New Conductor' ? (
        <View style={styles.FormContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.06,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            Conductor Details
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={e => {
              temp = {...conductorDetails};
              temp.Name = e;
              setConductorDetails(temp);
            }}
            value={conductorDetails.Name}
            placeholder="Name"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            onChangeText={e => {
              temp = {...conductorDetails};
              temp.Contact = e;
              setConductorDetails(temp);
            }}
            value={conductorDetails.Contact}
            placeholder="Contact No"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <TextInput
            keyboardType="visible-password"
            style={styles.input}
            onChangeText={e => {
              temp = {...conductorDetails};
              temp.Password = e;
              setConductorDetails(temp);
            }}
            value={conductorDetails.Password}
            placeholder="Password"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <SelectList
            setSelected={val => {
              setConductorDetails(prevDetails => ({
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
      ) : newOrOldConductor === 'Existing Conductor' ? (
        <View style={styles.FormContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.06,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            Conductor Details
          </Text>
          <SelectList
            setSelected={val => {
              setBusDetails({
                ...busDetails,
                ConductorId: val,
              });
            }}
            data={ConductorIdsFromDB}
            save="key"
            searchPlaceholder="Search By Name"
            placeholder="Select Existing Conductor"
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
      ) : (
        <View></View>
      )}
      <TouchableOpacity onPress={addButton}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>ADD</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
  },
  FormContainer: {
    backgroundColor: '#168070',
    width: width * 0.95,
    borderRadius: width * 0.075,
    elevation: width * 0.025,
    alignSelf: 'center',
    verticalAlign: 'middle',
    marginTop: height * 0.15,
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
  PickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  picker: {
    borderColor: '#2FAA98',
    borderRadius: 15,
    borderWidth: 2,
    color: 'white',
    fontSize: 20,
    height: 50,
    width: width * 0.5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  pickerText: {
    color: 'white',
    fontSize: width * 0.04,
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

export default AddNewBus;
