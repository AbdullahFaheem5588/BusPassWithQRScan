import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  Modal,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GoogleMapKey from '../../GoogleMapKey';
import MapViewDirections from 'react-native-maps-directions';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import Api_url from '../../Helper/URL';
import convertToAMPM from '../../Helper/convertToAMPM';

const {width, height} = Dimensions.get('window');

const MapScreen = ({route}) => {
  const userDetails = route.params.userDetails;
  const [newStopName, setNewStopName] = useState('');
  const [loading, setLoading] = useState(true);
  const [newRouteName, setNewRouteName] = useState('');
  const scrollViewRef = useRef(null);
  const mapView = useRef();
  const [offset, setOffset] = useState(0);
  const [stopPopupVisible, setStopPopupVisible] = useState(false);
  const [BusPopupVisible, setBusPopupVisible] = useState(false);
  const [AddOptionsVisible, setAddOptionsVisible] = useState(false);
  const [AddStopVisible, setAddStopVisible] = useState(false);
  const [AddRouteVisible, setAddRouteVisible] = useState(false);
  const [selectedBusIndex, setselectedBusIndex] = useState(null);
  const [stopPopupList, setStopPopupList] = useState([]);
  const [newRouteStops, setNewRouteStops] = useState([]);
  const [Routes, setRoutes] = useState([]);
  const [Stops, setStops] = useState([]);
  const [busesCords, setBusesCords] = useState([]);
  const [longPressCords, setLongPressCords] = useState([]);
  // const busesCords = [
  //   {
  //     BusId: 1,
  //     RouteId: 1,
  //     RouteTitle: 'Chandni Chowk - Saddar (8:30)',
  //     Cords: {
  //       latitude: 33.60626103098687,
  //       longitude: 73.06594487798462,
  //     },
  //   },
  //   {
  //     BusId: 2,
  //     RouteId: 2,
  //     RouteTitle: 'Saddar - Chandni Chowk (4:30)',
  //     Cords: {
  //       latitude: 33.58619836860913,
  //       longitude: 73.07261567925178,
  //     },
  //   },
  // ];

  const getAllRoutes = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Stops/GetAllRoutes?OrganizationId=${userDetails.OrganizationId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setRoutes(data);
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

  useEffect(() => {
    getAllRoutes();
  }, []);

  const getAllBusesCords = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Bus/GetBusesLocations?OrganizationId=${userDetails.OrganizationId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setBusesCords(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getAllBusesCords();
    }, 6000);
    return () => clearInterval(interval);
  }, [busesCords]);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / 360);
    setOffset(index);
  };

  const handleStopPopupVisibility = id => {
    setStopPopupList([]);
    for (i = 0; i < Routes.length; i++) {
      const stop = Routes[i].find(stop => stop.Id === id);
      if (stop) {
        setStopPopupList(prevSelectedStopsList => [
          ...prevSelectedStopsList,
          stop,
        ]);
      }
    }
    setStopPopupVisible(!stopPopupVisible);
  };

  const handleBusPopupVisibility = index => {
    setselectedBusIndex(index);
    setBusPopupVisible(!BusPopupVisible);
  };
  const handleAddPopupVisibility = () => {
    setAddOptionsVisible(!AddOptionsVisible);
  };
  const handleAddStopPopupVisibility = () => {
    setAddStopVisible(!AddStopVisible);
    setAddOptionsVisible(false);
    setNewStopName('');
  };
  const handleAddRoutePopupVisibility = () => {
    getAllStops();
    setAddRouteVisible(!AddRouteVisible);
    setAddOptionsVisible(false);
    setNewRouteName('');
    setNewRouteStops([]);
  };
  const handleLongPress = event => {
    const {coordinate} = event.nativeEvent;
    setLongPressCords(coordinate);
    console.log('Long press detected at:', coordinate);
    handleAddPopupVisibility();
  };
  const addNewStop = async () => {
    try {
      if (newStopName.length > 0) {
        const stop = {
          name: newStopName,
          latitude: longPressCords.latitude,
          longitude: longPressCords.longitude,
        };
        const response = await fetch(`${Api_url}/Admin/InsertStop`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stop),
        });

        if (response.ok) {
          const data = await response.json();
          ToastAndroid.show(data, ToastAndroid.SHORT);
          handleAddStopPopupVisibility();
          getAllRoutes();
        } else {
          const data = await response.json();
          console.log(data);
        }
      } else {
        ToastAndroid.show(
          'Please provide the neccessary details!',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      handleAddStopPopupVisibility();
    }
  };
  const addNewRoute = async () => {
    try {
      if (newRouteName.length > 0 && newRouteStops.length > 0) {
        const stops = newRouteStops.map(item => ({
          Id: item,
        }));
        const route = {
          OrganizationId: userDetails.OrganizationId,
          RouteTitle: newRouteName,
          Stops: stops,
        };
        const response = await fetch(`${Api_url}/Admin/InsertRoute`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(route),
        });

        if (response.ok) {
          const data = await response.json();
          ToastAndroid.show(data, ToastAndroid.SHORT);
          handleAddRoutePopupVisibility();
          getAllRoutes();
        } else {
          const data = await response.json();
          console.log(data);
        }
      } else {
        ToastAndroid.show(
          'Please provide the neccessary details!',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      handleAddPopupVisibility();
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: userDetails.OrganizationCords.latitude,
          longitude: userDetails.OrganizationCords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onLongPress={handleLongPress}>
        <Marker
          coordinate={userDetails.OrganizationCords}
          title={userDetails.OrganizationName}
          image={require('../../assets/UniMapMarker.png')}
        />
        {Routes.map((routeStops, routeIndex) => (
          <MapViewDirections
            key={routeIndex}
            origin={userDetails.OrganizationCords}
            destination={userDetails.OrganizationCords}
            waypoints={routeStops.map(stop => ({
              latitude: parseFloat(stop.Latitude),
              longitude: parseFloat(stop.Longitude),
            }))}
            apikey={GoogleMapKey}
            strokeColor="#d883ff"
            strokeWidth={5}
          />
        ))}
        {Routes.map((routeStops, routeIndex) =>
          routeStops.map((stop, stopIndex) => (
            <Marker
              image={require('../../assets/BusStopMapMarker.png')}
              key={stopIndex}
              coordinate={{
                latitude: parseFloat(stop.Latitude),
                longitude: parseFloat(stop.Longitude),
              }}
              onPress={() => handleStopPopupVisibility(stop.Id)}
            />
          )),
        )}
        {busesCords.map((location, index) => (
          <Marker
            key={index}
            coordinate={location.Cords}
            image={require('../../assets/BusMapMarker.png')}
            onPress={() => handleBusPopupVisibility(index)}
          />
        ))}
      </MapView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={stopPopupVisible}
        onRequestClose={handleStopPopupVisibility}>
        {stopPopupVisible && (
          <View style={styles.modalContainer}>
            <View style={[styles.Popup]}>
              <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                horizontalScrollEventThrottle={width * 0.9}>
                {stopPopupList &&
                  stopPopupList.map((item, ind) => (
                    <View
                      key={ind}
                      style={{
                        borderColor: 'white',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        width: width * 0.9,
                        margin: width * 0.025,
                        marginTop: width * 0.05,
                        borderRadius: width * 0.075,
                      }}>
                      <Text
                        style={{
                          fontSize: width * 0.055,
                          fontWeight: 'bold',
                          color: 'white',
                          alignSelf: 'center',
                          marginTop: width * 0.025,
                        }}>
                        {item.Name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: width * 0.05,
                          marginBottom: width * 0.05,
                        }}>
                        <View
                          style={{
                            marginLeft: width * 0.025,
                            backgroundColor: '#2FAA98',
                            borderRadius: width * 0.075,
                            elevation: width * 0.025,
                            width: width * 0.4,
                            height: width * 0.4,
                          }}>
                          <Image
                            source={require('../../assets/RouteNo.png')}
                            style={{
                              width: width * 0.05,
                              height: width * 0.2,
                              alignSelf: 'center',
                              marginTop: width * 0.025,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: width * 0.035,
                              color: 'white',
                              alignSelf: 'center',
                              marginTop: width * 0.0125,
                            }}>
                            Route No
                          </Text>
                          <Text
                            style={{
                              fontSize: width * 0.055,
                              fontWeight: 'bold',
                              color: 'white',
                              alignSelf: 'center',
                            }}>
                            {item.Route}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginRight: width * 0.025,
                            width: width * 0.4,
                            height: width * 0.4,
                            backgroundColor: '#2FAA98',
                            borderRadius: width * 0.075,
                            elevation: width * 0.025,
                          }}>
                          <Image
                            source={require('../../assets/StopTiming.png')}
                            style={{
                              width: width * 0.3,
                              height: width * 0.2,
                              alignSelf: 'center',
                              marginTop: width * 0.025,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: width * 0.035,
                              color: 'white',
                              alignSelf: 'center',
                              marginTop: width * 0.0125,
                            }}>
                            Stop Timing
                          </Text>
                          <Text
                            style={{
                              fontSize: width * 0.055,
                              fontWeight: 'bold',
                              color: 'white',
                              alignSelf: 'center',
                            }}>
                            {convertToAMPM(item.Timing)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
              </ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginBottom: 10,
                }}>
                {stopPopupList &&
                  stopPopupList.map((item, ind) => (
                    <View
                      key={ind}
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={[
                          {
                            width: width * 0.025,
                            height: width * 0.025,
                            borderRadius: width * 0.0125,
                            borderColor: 'white',
                            borderWidth: 1,
                            marginHorizontal: width * 0.0125,
                          },
                          ind === offset ? {backgroundColor: 'white'} : null,
                        ]}></View>
                    </View>
                  ))}
              </View>
            </View>
            <TouchableOpacity onPress={handleStopPopupVisibility}>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={BusPopupVisible}
        onRequestClose={handleBusPopupVisibility}>
        {BusPopupVisible && (
          <View style={styles.modalContainer}>
            <View style={[styles.Popup]}>
              <View
                style={{
                  borderColor: 'white',
                  borderStyle: 'solid',
                  borderWidth: 1,
                  width: width * 0.9,
                  margin: width * 0.025,
                  marginTop: width * 0.05,
                  marginBottom: width * 0.05,
                  borderRadius: width * 0.075,
                }}>
                <Text
                  style={{
                    fontSize: width * 0.055,
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'center',
                    marginTop: width * 0.025,
                  }}>
                  {busesCords[selectedBusIndex].RouteTitle}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: width * 0.05,
                    marginBottom: width * 0.05,
                  }}>
                  <View
                    style={{
                      marginLeft: width * 0.025,
                      backgroundColor: '#2FAA98',
                      borderRadius: width * 0.075,
                      elevation: width * 0.025,
                      width: width * 0.4,
                      height: width * 0.4,
                    }}>
                    <Image
                      source={require('../../assets/RouteNo.png')}
                      style={{
                        width: width * 0.05,
                        height: width * 0.2,
                        alignSelf: 'center',
                        marginTop: width * 0.025,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: width * 0.035,
                        color: 'white',
                        alignSelf: 'center',
                        marginTop: width * 0.0125,
                      }}>
                      Route No
                    </Text>
                    <Text
                      style={{
                        fontSize: width * 0.055,
                        fontWeight: 'bold',
                        color: 'white',
                        alignSelf: 'center',
                      }}>
                      {busesCords[selectedBusIndex].RouteId}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginRight: width * 0.025,
                      width: width * 0.4,
                      height: width * 0.4,
                      backgroundColor: '#2FAA98',
                      borderRadius: width * 0.075,
                      elevation: width * 0.025,
                    }}>
                    <Image
                      source={require('../../assets/BusEn-route.png')}
                      style={{
                        width: width * 0.35,
                        height: width * 0.2,
                        alignSelf: 'center',
                        marginTop: width * 0.025,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: width * 0.035,
                        color: 'white',
                        alignSelf: 'center',
                        marginTop: width * 0.0125,
                      }}>
                      Bus No
                    </Text>
                    <Text
                      style={{
                        fontSize: width * 0.055,
                        fontWeight: 'bold',
                        color: 'white',
                        alignSelf: 'center',
                      }}>
                      {busesCords[selectedBusIndex].BusId}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={handleBusPopupVisibility}>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={AddOptionsVisible}
        onRequestClose={handleAddPopupVisibility}>
        {AddOptionsVisible && (
          <View style={styles.modalContainer}>
            <View>
              <View style={[styles.Popup]}>
                <View
                  style={{
                    borderColor: 'white',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    width: width * 0.9,
                    margin: width * 0.025,
                    borderRadius: width * 0.075,
                  }}>
                  <TouchableOpacity onPress={handleAddStopPopupVisibility}>
                    <View style={[styles.btn, {width: width * 0.8}]}>
                      <Text
                        style={{
                          fontSize: width * 0.055,
                          fontWeight: 'bold',
                          color: '#168070',
                        }}>
                        ADD NEW STOP
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleAddRoutePopupVisibility}>
                    <View style={[styles.btn, {width: width * 0.8}]}>
                      <Text
                        style={{
                          fontSize: width * 0.055,
                          fontWeight: 'bold',
                          color: '#168070',
                        }}>
                        ADD NEW ROUTE
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={handleAddPopupVisibility}>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={AddStopVisible}
        onRequestClose={handleAddStopPopupVisibility}>
        {AddStopVisible && (
          <View style={styles.modalContainer}>
            <View>
              <View style={[styles.Popup]}>
                <View
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
                    }}>
                    Stop Details
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setNewStopName}
                    value={newStopName}
                    placeholder="Name"
                    placeholderTextColor="white"
                    fontSize={width * 0.04}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={addNewStop}>
              <View style={styles.btn}>
                <Text
                  style={{
                    fontSize: width * 0.055,
                    fontWeight: 'bold',
                    color: '#168070',
                  }}>
                  ADD
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddStopPopupVisibility}>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={AddRouteVisible}
        onRequestClose={handleAddRoutePopupVisibility}>
        {AddRouteVisible && (
          <View style={styles.modalContainer}>
            <View>
              <View style={[styles.Popup]}>
                <View
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
                    }}>
                    Route Details
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setNewRouteName}
                    value={newRouteName}
                    placeholder="Name"
                    placeholderTextColor="white"
                    fontSize={width * 0.04}
                  />
                  <MultipleSelectList
                    setSelected={setNewRouteStops}
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
              </View>
            </View>
            <TouchableOpacity onPress={addNewRoute}>
              <View style={styles.btn}>
                <Text
                  style={{
                    fontSize: width * 0.055,
                    fontWeight: 'bold',
                    color: '#168070',
                  }}>
                  ADD
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddRoutePopupVisibility}>
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
    marginTop: height * 0.05,
    marginBottom: height * 0.0125,
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
