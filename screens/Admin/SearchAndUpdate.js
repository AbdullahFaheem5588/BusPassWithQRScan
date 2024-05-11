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
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';

const {width, height} = Dimensions.get('window');

const SearchAndUpdate = () => {
  const [searchedId, setSearchedId] = useState(null);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('');
  const Stops = [
    {key: '1', value: 'Saddar'},
    {key: '2', value: 'Chandni Chowk'},
    {key: '3', value: 'Rehmanabad'},
    {key: '4', value: '6th Road'},
  ];
  const SearchingCategories = [
    {key: 1, value: 'Student'},
    {Key: 2, value: 'Parent'},
    {Key: 3, value: 'Conductor'},
    {Key: 4, value: 'Admin'},
    {Key: 5, value: 'Bus'},
    {Key: 6, value: 'Stop'},
    {Key: 7, value: 'Route'},
  ];
  const [studentDetails, setStudentDetails] = useState({
    Name: '',
    RegNo: '',
    Contact: '',
    PassStatus: '',
  });
  const [userDetails, setUserDetails] = useState({
    Name: '',
    Contact: '',
    Password: '',
  });
  const pasStatuses = [
    {key: 1, value: 'Active'},
    {key: 2, value: 'In-Active'},
  ];
  const Routes = [
    {key: '1', value: 'Saddar - Chandni Chowk (8:30)'},
    {key: '2', value: 'Chandni Chowk - Saddar (4:30)'},
  ];
  const [busDetails, setBusDetails] = useState({
    RegNo: '',
    Seats: '',
    ConductorId: null,
    Routes: selectedRoutes,
  });
  const [routeDetails, setRouteDetails] = useState({
    Name: '',
    Stops: [],
  });
  const [stopDetails, setStopDetails] = useState({
    Name: '',
  });
  const ConductorIdsFromDB = [
    {key: 1, value: 'Ahmed Shehbaz'},
    {key: 2, value: 'Ali Butt'},
  ];
  const [selectedRoutes, setSelectedRoutes] = useState([1]);
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
          Search
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setSearchedId}
          value={searchedId}
          placeholder="Search By Id"
          placeholderTextColor="white"
          fontSize={width * 0.04}
          keyboardType="numeric"
        />
        <SelectList
          setSelected={val => setSelectedSearchCategory(val)}
          data={SearchingCategories}
          save="value"
          search={false}
          placeholder="Select Searching Category"
          inputStyles={{color: 'white'}}
          dropdownTextStyles={{color: 'white', textAlign: 'center'}}
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
          dropdownItemStyles={{width: width * 0.8}}
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
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={styles.btnText}>SEARCH</Text>
          </View>
        </TouchableOpacity>
      </View>
      {selectedSearchCategory === 'Student' ? (
        <View style={styles.FormContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.06,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            Student Details
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={e => {
              temp = {...studentDetails};
              temp.Name = e;
              setStudentDetails(temp);
            }}
            value={studentDetails.Name}
            placeholder="Name"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <TextInput
            style={styles.input}
            onChangeText={e => {
              temp = {...studentDetails};
              temp.RegNo = e;
              setStudentDetails(temp);
            }}
            value={studentDetails.RegNo}
            placeholder="Registration No"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <TextInput
            style={styles.input}
            onChangeText={e => {
              temp = {...studentDetails};
              temp.Contact = e;
              setStudentDetails(temp);
            }}
            value={studentDetails.Contact}
            keyboardType="phone-pad"
            placeholder="Contact No"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <SelectList
            setSelected={val => {
              setStudentDetails(prevDetails => ({
                ...prevDetails,
                PassStatus: val,
              }));
            }}
            data={pasStatuses}
            save="value"
            search={false}
            placeholder="Select Pass Status"
            inputStyles={{color: 'white'}}
            dropdownTextStyles={{color: 'white', textAlign: 'center'}}
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
            dropdownItemStyles={{width: width * 0.8}}
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
          <TouchableOpacity>
            <View style={styles.btn}>
              <Text style={styles.btnText}>UPDATE</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : selectedSearchCategory === 'Parent' ||
        selectedSearchCategory === 'Conductor' ||
        selectedSearchCategory === 'Admin' ? (
        <View style={styles.FormContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.06,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            {selectedSearchCategory} Details
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={e => {
              temp = {...userDetails};
              temp.Name = e;
              setUserDetails(temp);
            }}
            value={userDetails.Name}
            placeholder="Name"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            onChangeText={e => {
              temp = {...userDetails};
              temp.Contact = e;
              setUserDetails(temp);
            }}
            value={userDetails.Contact}
            placeholder="Contact No"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <TouchableOpacity>
            <View style={styles.btn}>
              <Text style={styles.btnText}>UPDATE</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : selectedSearchCategory === 'Bus' ? (
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
            setSelected={val => {
              setBusDetails({
                ...busDetails,
                ConductorId: val,
              });
            }}
            data={ConductorIdsFromDB}
            save="key"
            searchPlaceholder="Search By Name"
            placeholder="Select Conductor"
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
          <TouchableOpacity>
            <View style={styles.btn}>
              <Text style={styles.btnText}>UPDATE</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : selectedSearchCategory === 'Stop' ? (
        <View style={styles.FormContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.06,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            Stop Details
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={e => {
              temp = {...stopDetails};
              temp.Name = e;
              setStopDetails(temp);
            }}
            value={stopDetails.Name}
            placeholder="Name"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <TouchableOpacity>
            <View style={styles.btn}>
              <Text style={styles.btnText}>UPDATE</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : selectedSearchCategory === 'Route' ? (
        <View style={styles.FormContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.06,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            Route Details
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={e => {
              temp = [...routeDetails];
              temp.Name = e;
              setRouteDetails(temp);
            }}
            value={routeDetails.Name}
            placeholder="Name"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <MultipleSelectList
            setSelected={val => {
              setRouteDetails(prevDetails => ({
                ...prevDetails,
                Stops: val,
              }));
            }}
            data={Stops}
            save="key"
            label="Selected Stops"
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
            dropdownItemStyles={{
              justifyContent: 'center',
              color: 'white',
            }}
            dropdownTextStyles={{color: 'white'}}
            inputStyles={{color: 'white'}}
            placeholder="Select Stops Here"
          />
        </View>
      ) : (
        <View></View>
      )}
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
  btn: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width * 0.8,
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

export default SearchAndUpdate;
