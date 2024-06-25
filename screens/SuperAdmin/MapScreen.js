import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {SelectList} from 'react-native-dropdown-select-list';
import {Api_url} from '../../Helper/URL';

const {width, height} = Dimensions.get('window');

const MapScreen = ({route}) => {
  const userDetails = route.params.userDetails;
  const [allOrganizations, setAllOrganizations] = useState([]);
  const mapView = useRef();
  const [AddNewOrgVisible, setAddNewOrgVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const Genders = [
    {key: 1, value: 'Male'},
    {Key: 2, value: 'Female'},
  ];
  const [organizationDetails, setOrganizationDetails] = useState({
    Name: '',
    Cords: {
      latitude: '',
      longitude: '',
    },
  });
  const [adminDetails, setAdminDetails] = useState({
    Name: '',
    Contact: '',
    Password: '',
    Gender: '',
    OrganizationId: 0,
  });

  const GetAllOrganizations = async () => {
    try {
      const response = await fetch(
        `${Api_url}/SuperAdmin/GetAllOrganizations`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) setAllOrganizations(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    GetAllOrganizations();
  }, []);

  const handleAddOrganizationPopupVisibility = () => {
    setOrganizationDetails(prevDetails => ({
      ...prevDetails,
      Name: '',
    }));
    setAdminDetails({
      Name: '',
      Contact: '',
      Password: '',
      Gender: '',
      OrganizationId: 0,
    });
    setAddNewOrgVisible(!AddNewOrgVisible);
  };

  const handleLongPress = event => {
    const {coordinate} = event.nativeEvent;
    console.log('Long press detected at: ', coordinate);
    setOrganizationDetails(prevDetails => ({
      ...prevDetails,
      Cords: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
    }));
    handleAddOrganizationPopupVisibility();
  };

  const addNewOrganization = async () => {
    setLoading(true);
    try {
      if (
        Object.values(adminDetails).every(
          value =>
            (typeof value === 'string' && value.trim() !== '') ||
            (typeof value === 'number' && value > -1),
        ) &&
        organizationDetails.Name.trim() !== ''
      ) {
        const response = await fetch(
          `${Api_url}/SuperAdmin/InsertOrganization`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(organizationDetails),
          },
        );

        if (response.ok) {
          const data = await response.json();
          setAdminDetails(prevDetails => ({
            ...prevDetails,
            OrganizationId: data,
          }));
          addNewAdmin(data);
        } else {
          const data = await response.json();
          console.log(data);
          handleAddOrganizationPopupVisibility();
        }
      } else {
        ToastAndroid.show(
          'Please provide the necessary details!',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      setLoading(false);
      handleAddOrganizationPopupVisibility();
    }
  };

  const addNewAdmin = async organizationId => {
    try {
      const response = await fetch(`${Api_url}/Users/InsertAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...adminDetails, OrganizationId: organizationId}),
      });

      if (response.ok) {
        const data = await response.json();
        GetAllOrganizations();
        setLoading(false);
        ToastAndroid.show(
          'New Organization Added Successfully!',
          ToastAndroid.SHORT,
        );
        handleAddOrganizationPopupVisibility();
      } else {
        const data = await response.json();
        console.log(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 33.643400576744007,
          longitude: 73.0790521153456,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onLongPress={handleLongPress}>
        {allOrganizations.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.Cords}
            image={require('../../assets/UniMapMarker.png')}
            title={item.Name}
          />
        ))}
      </MapView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={AddNewOrgVisible}
        onRequestClose={handleAddOrganizationPopupVisibility}>
        {AddNewOrgVisible && (
          <View style={styles.modalContainer}>
            <View style={[styles.Popup]}>
              <ScrollView
                style={{
                  borderColor: 'white',
                  borderStyle: 'solid',
                  borderWidth: 1,
                  width: width * 0.9,
                  margin: width * 0.025,
                  borderRadius: width * 0.075,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: width * 0.08,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  Organization Details
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{flex: 1, height: 1, backgroundColor: 'white'}}
                  />
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: width * 0.04,
                        alignSelf: 'center',
                        marginHorizontal: 10,
                      }}>
                      Enter Admin Details
                    </Text>
                  </View>
                  <View
                    style={{flex: 1, height: 1, backgroundColor: 'white'}}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={e => {
                    setAdminDetails(prevDetails => ({
                      ...prevDetails,
                      Name: e,
                    }));
                  }}
                  value={adminDetails.Name}
                  placeholder="Name"
                  placeholderTextColor="white"
                  fontSize={width * 0.04}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={e => {
                    setAdminDetails(prevDetails => ({
                      ...prevDetails,
                      Contact: e,
                    }));
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
                    setAdminDetails(prevDetails => ({
                      ...prevDetails,
                      Password: e,
                    }));
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{flex: 1, height: 1, backgroundColor: 'white'}}
                  />
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: width * 0.04,
                        alignSelf: 'center',
                        marginHorizontal: 10,
                      }}>
                      Enter Organization Details
                    </Text>
                  </View>
                  <View
                    style={{flex: 1, height: 1, backgroundColor: 'white'}}
                  />
                </View>
                <TextInput
                  style={[styles.input, {marginBottom: 20}]}
                  onChangeText={e => {
                    setOrganizationDetails(prevDetails => ({
                      ...prevDetails,
                      Name: e,
                    }));
                  }}
                  value={organizationDetails.Name}
                  placeholder="Name"
                  placeholderTextColor="white"
                  fontSize={width * 0.04}
                />
              </ScrollView>
            </View>
            <TouchableOpacity onPress={addNewOrganization}>
              <View style={styles.btn}>
                {loading ? (
                  <ActivityIndicator size="large" color="#168070" />
                ) : (
                  <Text
                    style={{
                      fontSize: width * 0.055,
                      fontWeight: 'bold',
                      color: '#168070',
                    }}>
                    ADD
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddOrganizationPopupVisibility}>
              <View style={styles.btn}>
                <Text
                  style={{
                    fontSize: width * 0.055,
                    fontWeight: 'bold',
                    color: '#168070',
                  }}>
                  CLOSE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Popup: {
    backgroundColor: '#168070',
    width: width * 0.95,
    borderRadius: width * 0.075,
    elevation: width * 0.025,
    marginBottom: width * 0.075,
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
    marginBottom: width * 0.025,
    marginTop: width * 0.025,
  },
  input: {
    marginBottom: height * 0.001,
    width: width * 0.8,
    borderBottomWidth: 2,
    color: 'white',
    borderColor: 'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default MapScreen;
