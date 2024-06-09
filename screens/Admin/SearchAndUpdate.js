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
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import Api_url from '../../Helper/URL';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const SearchAndUpdate = () => {
  const navigation = useNavigation();
  const [searchedId, setSearchedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('');
  const [conductorsFromDB, setConductorsFromDB] = useState([]);
  const [routesFromDB, setRoutesFromDB] = useState([]);
  const [Stops, setStops] = useState([]);
  const [busUpdatingTrigger, setBusUpdatingTrigger] = useState(false);
  const [routeUpdatingTrigger, setRouteUpdatingTrigger] = useState(false);
  const SearchingCategories = [
    {key: 1, value: 'Student'},
    {Key: 2, value: 'Parent'},
    {Key: 3, value: 'Conductor'},
    {Key: 5, value: 'Bus'},
    {Key: 6, value: 'Stop'},
    {Key: 7, value: 'Route'},
  ];
  const [studentDetails, setStudentDetails] = useState({
    PassId: '',
    Name: '',
    RegNo: '',
    Contact: '',
    PassStatus: '',
  });
  const [userDetails, setUserDetails] = useState({
    Id: '',
    Name: '',
    Contact: '',
  });
  const pasStatuses = [
    {key: 1, value: 'Active'},
    {key: 2, value: 'In-Active'},
  ];
  const [busDetails, setBusDetails] = useState({
    Id: '',
    RegNo: '',
    TotalSeats: '',
    Conductor: {
      Id: '',
    },
    Routes: {
      RouteId: '',
      RouteTitle: '',
    },
  });
  const [routeDetails, setRouteDetails] = useState({
    RouteId: '',
    RouteTitle: '',
    Stops: [],
  });
  const [stopDetails, setStopDetails] = useState({
    Id: '',
    Name: '',
  });
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);

  useEffect(() => {
    const GetAllConductors = async () => {
      try {
        const response = await fetch(`${Api_url}/Users/GetAllConductors`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
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
        const response = await fetch(`${Api_url}/Stops/GetAllRoutesTitle`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
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

    const getAllStops = async () => {
      try {
        const response = await fetch(`${Api_url}/Stops/GetAllStops`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setStops([]);
          data.map(item => {
            setStops(prevState => [
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
      } finally {
        setLoading(false);
      }
    };

    getAllStops();
  }, []);

  const resetStates = () => {
    setStudentDetails({
      PassId: '',
      Name: '',
      RegNo: '',
      Contact: '',
      PassStatus: '',
    });
    setUserDetails({
      Id: '',
      Name: '',
      Contact: '',
    });
    setBusDetails({
      RegNo: '',
      TotalSeats: '',
      Conductor: {
        Id: '',
      },
      Routes: [],
    });
    setRouteDetails({
      RouteTitle: '',
      Stops: [],
    });
    setStopDetails({
      Name: '',
    });
    setSelectedRoutes([]);
    setSelectedStops([]);
  };

  useEffect(() => {
    const updateBusDetails = async () => {
      try {
        const response = await fetch(`${Api_url}/Admin/UpdateBus`, {
          method: 'PUT',
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
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (busUpdatingTrigger) {
      updateBusDetails();
      setBusUpdatingTrigger(false);
    }
  }, [busDetails]);
  useEffect(() => {
    const updateRouteDetails = async () => {
      try {
        const response = await fetch(`${Api_url}/Admin/UpdateRoute`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(routeDetails),
        });

        if (response.ok) {
          const data = await response.json();
          navigation.goBack();
          ToastAndroid.show(data, ToastAndroid.SHORT);
        } else {
          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (routeUpdatingTrigger) {
      updateRouteDetails();
      setRouteUpdatingTrigger(false);
    }
  }, [routeDetails]);

  useEffect(() => {
    resetStates();
  }, [searchedId, selectedSearchCategory]);

  const search = async () => {
    try {
      if (searchedId > 0 && selectedSearchCategory != '') {
        setLoading(true);
        const response = await fetch(
          `${Api_url}/Admin/Search?id=${searchedId}&category=${selectedSearchCategory}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          if (selectedSearchCategory == 'Student') {
            setStudentDetails({
              ...studentDetails,
              PassId: data.PassId,
              Name: data.Name,
              Contact: data.Contact,
              RegNo: data.RegNo,
              PassStatus: data.PassStatus,
            });
          } else if (
            selectedSearchCategory === 'Parent' ||
            selectedSearchCategory === 'Conductor'
          ) {
            setUserDetails({
              ...userDetails,
              Id: data.Id,
              Contact: data.Contact,
              Name: data.Name,
            });
          } else if (selectedSearchCategory === 'Bus') {
            setBusDetails({
              ...busDetails,
              Id: data.Id,
              RegNo: data.RegNo,
              TotalSeats: data.TotalSeats,
              Routes: data.Routes,
              Conductor: {
                Id: data.Conductor.Id,
              },
            });
          } else if (selectedSearchCategory === 'Stop') {
            setStopDetails({
              ...stopDetails,
              Id: data.Id,
              Name: data.Name,
            });
          } else if (selectedSearchCategory === 'Route') {
            setRouteDetails({
              ...routeDetails,
              RouteId: data.RouteId,
              RouteTitle: data.RouteTitle,
            });
          }
        } else if (response.status === 404) {
          ToastAndroid.show(data, ToastAndroid.SHORT);
        } else {
          console.log(data);
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
    } finally {
      setLoading(false);
    }
  };

  const UpdateStudent = async () => {
    try {
      if (
        Object.values(studentDetails).every(value =>
          typeof value === 'string' ? value.trim() !== '' : value !== '',
        )
      ) {
        setLoading(true);
        const response = await fetch(`${Api_url}/Admin/UpdateStudent`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentDetails),
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
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const UpdateParent = async () => {
    try {
      if (
        Object.values(userDetails).every(value =>
          typeof value === 'string' ? value.trim() !== '' : value !== '',
        )
      ) {
        setLoading(true);
        const response = await fetch(`${Api_url}/Admin/UpdateParent`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
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
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const UpdateConductor = async () => {
    try {
      if (
        Object.values(userDetails).every(value =>
          typeof value === 'string' ? value.trim() !== '' : value !== '',
        )
      ) {
        setLoading(true);
        const response = await fetch(`${Api_url}/Admin/UpdateConductor`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
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
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const UpdateBus = async () => {
    try {
      if (
        Object.values(busDetails).every(value =>
          typeof value === 'string' ? value.trim() !== '' : value !== '',
        )
      ) {
        setLoading(true);
        if (selectedRoutes.length > 0) {
          const routeList = [];
          for (let i = 0; i < selectedRoutes.length; i++) {
            const routeObj = {RouteId: parseInt(selectedRoutes[i])};
            routeList.push(routeObj);
          }
          const temp = {...busDetails, Routes: routeList};
          setBusDetails(temp);
          setBusUpdatingTrigger(true);
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
    }
  };
  const UpdateStop = async () => {
    try {
      if (
        Object.values(stopDetails).every(value =>
          typeof value === 'string' ? value.trim() !== '' : value !== '',
        )
      ) {
        setLoading(true);
        const response = await fetch(`${Api_url}/Admin/UpdateStop`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stopDetails),
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
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const UpdateRoute = async () => {
    try {
      if (
        Object.values(routeDetails).every(value =>
          typeof value === 'string' ? value.trim() !== '' : value !== '',
        )
      ) {
        setLoading(true);
        const stops = selectedStops.map(item => ({
          Id: item,
        }));

        setRouteDetails(prevState => {
          return {
            ...prevState,
            Stops: stops,
          };
        });
        setRouteUpdatingTrigger(true);
      } else {
        ToastAndroid.show(
          'Please provide the necessary details!',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
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
        <TouchableOpacity onPress={search}>
          <View style={styles.btn}>
            {loading ? (
              <ActivityIndicator size="large" color="#168070" />
            ) : (
              <Text style={styles.btnText}>SEARCH</Text>
            )}
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
              if (typeof val === 'string') {
                setStudentDetails(prevDetails => ({
                  ...prevDetails,
                  PassStatus: val,
                }));
              }
            }}
            data={pasStatuses}
            save="value"
            search={false}
            placeholder="Select Pass Status"
            defaultOption={
              studentDetails.PassStatus !== ''
                ? pasStatuses.find(ps => ps.value === studentDetails.PassStatus)
                : {key: 0, value: 'Select Pass Status'}
            }
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
          <TouchableOpacity onPress={UpdateStudent}>
            <View style={styles.btn}>
              {loading ? (
                <ActivityIndicator size="large" color="#168070" />
              ) : (
                <Text style={styles.btnText}>UPDATE</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : selectedSearchCategory === 'Parent' ||
        selectedSearchCategory === 'Conductor' ? (
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
          <TouchableOpacity
            onPress={() => {
              if (selectedSearchCategory === 'Parent') UpdateParent();
              else UpdateConductor();
            }}>
            <View style={styles.btn}>
              {loading ? (
                <ActivityIndicator size="large" color="#168070" />
              ) : (
                <Text style={styles.btnText}>UPDATE</Text>
              )}
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
              const temp = {...busDetails};
              temp.TotalSeats = e;
              setBusDetails(temp);
            }}
            value={busDetails.TotalSeats.toString()}
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
            setSelected={val => {
              if (val !== 0) {
                const temp = {...busDetails};
                temp.Conductor.Id = val;
                setBusDetails(temp);
              }
            }}
            data={conductorsFromDB}
            save="key"
            searchPlaceholder="Search By Name"
            placeholder="Select Conductor"
            defaultOption={
              busDetails.Conductor.Id !== ''
                ? conductorsFromDB.find(c => c.key == busDetails.Conductor.Id)
                : {key: 0, value: 'Select Conductor'}
            }
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
          <TouchableOpacity onPress={UpdateBus}>
            <View style={styles.btn}>
              {loading ? (
                <ActivityIndicator size="large" color="#168070" />
              ) : (
                <Text style={styles.btnText}>UPDATE</Text>
              )}
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
          <TouchableOpacity onPress={UpdateStop}>
            <View style={styles.btn}>
              {loading ? (
                <ActivityIndicator size="large" color="#168070" />
              ) : (
                <Text style={styles.btnText}>UPDATE</Text>
              )}
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
              const temp = {...routeDetails};
              temp.RouteTitle = e;
              setRouteDetails(temp);
            }}
            value={routeDetails.RouteTitle}
            placeholder="Name"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <MultipleSelectList
            setSelected={setSelectedStops}
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
          <TouchableOpacity onPress={UpdateRoute}>
            <View style={styles.btn}>
              {loading ? (
                <ActivityIndicator size="large" color="#168070" />
              ) : (
                <Text style={styles.btnText}>UPDATE</Text>
              )}
            </View>
          </TouchableOpacity>
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
