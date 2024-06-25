import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';
import {Api_url} from '../../Helper/URL';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const AddNewBus = ({route}) => {
  const OrganizationId = route.params.OrganizationId;
  const navigation = useNavigation();
  const [newOrOldConductor, setNewOrOldConductor] = useState('');
  const [conductorsFromDB, setConductorsFromDB] = useState([]);
  const [routesFromDB, setRoutesFromDB] = useState([]);
  const [conductorInserted, setConductorInserted] = useState(false);
  const Genders = [
    {key: 1, value: 'Male'},
    {key: 2, value: 'Female'},
  ];
  const ConductorSelection = [
    {key: 1, value: 'New Conductor'},
    {key: 2, value: 'Existing Conductor'},
  ];
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [busDetails, setBusDetails] = useState({
    RegNo: '',
    TotalSeats: '',
    Conductor: {
      Id: '',
    },
    Routes: [],
    OrganizationId: OrganizationId,
  });
  const [conductorDetails, setConductorDetails] = useState({
    Name: '',
    Contact: '',
    Password: '',
    Gender: '',
    OrganizationId: OrganizationId,
  });

  useEffect(() => {
    const GetAllConductors = async () => {
      try {
        const response = await fetch(
          `${Api_url}/Users/GetAllConductors?OrganizationId=${OrganizationId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          setConductorsFromDB([]);
          data.map(item => {
            setConductorsFromDB(prevState => [
              ...prevState,
              {key: item.Id, value: item.Name},
            ]);
          });
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    };
    GetAllConductors();

    const GetAllRoutesTitle = async () => {
      try {
        const response = await fetch(
          `${Api_url}/Stops/GetAllRoutesTitle?OrganizationId=${OrganizationId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          setRoutesFromDB([]);
          data.map(item => {
            setRoutesFromDB(prevState => [
              ...prevState,
              {key: item.RouteId, value: item.RouteTitle},
            ]);
          });
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    };
    GetAllRoutesTitle();
  }, []);

  const addNewBus = async () => {
    try {
      if (newOrOldConductor === 'New Conductor') {
        if (
          Object.values(conductorDetails).every(
            value => typeof value === 'string' && value.trim() !== '',
          )
        ) {
          const response = await fetch(`${Api_url}/Users/InsertConductor`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(conductorDetails),
          });

          if (response.ok) {
            const newConductorId = await response.json();
            const temp = {...busDetails};
            temp.Conductor.Id = newConductorId;
            setBusDetails(temp);
            setConductorInserted(true);
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
      } else {
        setConductorInserted(true);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (conductorInserted) {
      if (selectedRoutes.length > 0) {
        const routeList = [];
        for (let i = 0; i < selectedRoutes.length; i++) {
          const routeObj = {RouteId: parseInt(selectedRoutes[i])};
          routeList.push(routeObj);
        }

        const temp = {...busDetails, Routes: routeList};
        setBusDetails(temp);
      }
    }
  }, [conductorInserted]);

  useEffect(() => {
    if (busDetails.Routes.length > 0) {
      insertBus();
    }
  }, [busDetails]);

  const insertBus = async () => {
    try {
      if (
        Object.values(busDetails).every(value =>
          typeof value === 'string' ? value.trim() !== '' : value !== '',
        )
      ) {
        const response = await fetch(`${Api_url}/Admin/InsertBus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(busDetails),
        });

        if (response.ok) {
          const data = await response.json();
          navigation.goBack();
          ToastAndroid.show(data, ToastAndroid.SHORT);
        } else {
          const data = await response.json();
          console.log(data);
        }
      } else {
        ToastAndroid.show(
          'Please provide the necessary details!',
          ToastAndroid.SHORT,
        );
      }
      setConductorInserted(false);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
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
            const temp = {...busDetails};
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
            const temp = {...busDetails};
            temp.TotalSeats = e;
            setBusDetails(temp);
          }}
          value={busDetails.TotalSeats}
          keyboardType="numeric"
          placeholder="No of Seats"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <MultipleSelectList
          setSelected={setSelectedRoutes}
          data={routesFromDB}
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
              const temp = {...conductorDetails};
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
              const temp = {...conductorDetails};
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
              const temp = {...conductorDetails};
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
              const temp = {...busDetails};
              temp.Conductor.Id = val;
              setBusDetails(temp);
            }}
            data={conductorsFromDB}
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
      <TouchableOpacity onPress={addNewBus}>
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
