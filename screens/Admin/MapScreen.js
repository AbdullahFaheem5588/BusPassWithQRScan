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
  FlatList,
} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import GoogleMapKey from '../../GoogleMapKey';
import MapViewDirections from 'react-native-maps-directions';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import {Api_url} from '../../Helper/URL';
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
  //const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  // const isPointInPolygon = (point, vs) => {
  //   const x = point.latitude,
  //     y = point.longitude;

  //   let inside = false;
  //   for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
  //     const xi = vs[i].latitude,
  //       yi = vs[i].longitude;
  //     const xj = vs[j].latitude,
  //       yj = vs[j].longitude;

  //     const intersect =
  //       yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
  //     if (intersect) inside = !inside;
  //   }

  //   return inside;
  // };

  // const handleMapPress = event => {
  //   const newCoordinate = event.nativeEvent.coordinate;
  //   setPolygonCoordinates([...polygonCoordinates, newCoordinate]);

  // const busesCords = [
  //   {
  //     BusId: 1,
  //     RouteId: 1,
  //     RouteTitle: 'Chandni Chowk - Saddar (8:30)',
  //     TotalSeats: 50,
  //     Passengers: 20,
  //     PassengersDetails: [
  //       {
  //         Name: 'Abdullah Faheem',
  //         PassId: 10,
  //         RegNo: '2020-Arid-3587',
  //         StopName: 'Chandni Chowk',
  //       },
  //       {
  //         Name: 'Hamid Basar Wahab',
  //         PassId: 20,
  //         RegNo: '2020-Arid-3634',
  //         StopName: 'Saddar',
  //       },
  //       {
  //         Name: 'Romeesa Akram',
  //         PassId: 30,
  //         RegNo: '2020-Arid-3759',
  //         StopName: '6th Road',
  //       },
  //       {
  //         Name: 'Romeesa Akram',
  //         PassId: 30,
  //         RegNo: '2020-Arid-3759',
  //         StopName: '6th Road',
  //       },
  //     ],
  //     Cords: {
  //       latitude: 33.62374538747422,
  //       longitude: 73.0679390206933,
  //     },
  //   },
  //   {
  //     BusId: 2,
  //     RouteId: 2,
  //     RouteTitle: 'Saddar - Chandni Chowk (4:30)',
  //     TotalSeats: 50,
  //     Passengers: 20,
  //     PassengersDetails: [
  //       {
  //         Name: 'Abdullah Faheem',
  //         PassId: 10,
  //         RegNo: '2020-Arid-3587',
  //         StopName: 'Chandni Chowk',
  //       },
  //       {
  //         Name: 'Hamid Basar Wahab',
  //         PassId: 20,
  //         RegNo: '2020-Arid-3634',
  //         StopName: 'Saddar',
  //       },
  //       {
  //         Name: 'Romeesa Akram',
  //         PassId: 30,
  //         RegNo: '2020-Arid-3759',
  //         StopName: '6th Road',
  //       },
  //     ],
  //     Cords: {
  //       latitude: 33.619592459760305,
  //       longitude: 73.08326113969088,
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
    //console.log(isPointInPolygon(coordinate, polygonCoordinates));
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
        {/* onPress={handleMapPress}>
        {polygonCoordinates.length > 0 && (
          <Polygon
            coordinates={polygonCoordinates}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={2}
          />
        )} */}

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

      {/* <Modal
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
      </Modal> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={BusPopupVisible}
        onRequestClose={handleBusPopupVisibility}>
        {BusPopupVisible && (
          <View style={styles.modalContainer}>
            <ScrollView>
              <View style={[styles.Popup]}>
                <View
                  style={{
                    borderColor: 'white',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    width: width * 0.9,
                    margin: width * 0.025,
                    marginTop: width * 0.01,
                    marginBottom: width * 0.01,
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
                      marginTop: width * 0.01,
                      marginBottom: width * 0.01,
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: width * 0.01,
                      marginBottom: width * 0.01,
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
                        source={require('../../assets/Seats.png')}
                        style={{
                          height: width * 0.21,
                          alignSelf: 'center',
                          marginTop: width * 0.025,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: width * 0.035,
                          color: 'white',
                          alignSelf: 'center',
                          marginTop: width * 0.0125,
                        }}>
                        Total Seats
                      </Text>
                      <Text
                        style={{
                          fontSize: width * 0.055,
                          fontWeight: 'bold',
                          color: 'white',
                          alignSelf: 'center',
                        }}>
                        {busesCords[selectedBusIndex].TotalSeats}
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
                        source={require('../../assets/CheckIn.png')}
                        style={{
                          height: width * 0.21,
                          resizeMode: 'contain',
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
                        Passengers
                      </Text>
                      <Text
                        style={{
                          fontSize: width * 0.055,
                          fontWeight: 'bold',
                          color: 'white',
                          alignSelf: 'center',
                        }}>
                        {busesCords[selectedBusIndex].Passengers}
                      </Text>
                    </View>
                  </View>
                  <View>
                    {busesCords[selectedBusIndex].PassengersDetails && (
                      <FlatList
                        data={busesCords[selectedBusIndex].PassengersDetails}
                        renderItem={({passenger, index}) => {
                          return (
                            <View style={styles.flatListRow}>
                              <Text style={styles.Type}>
                                {
                                  busesCords[selectedBusIndex]
                                    .PassengersDetails[index].Name
                                }
                              </Text>
                              <Text style={styles.Description}>
                                Pass Id:{' '}
                                {
                                  busesCords[selectedBusIndex]
                                    .PassengersDetails[index].PassId
                                }
                              </Text>
                              <Text style={styles.Description}>
                                Reg No:{' '}
                                {
                                  busesCords[selectedBusIndex]
                                    .PassengersDetails[index].RegNo
                                }
                              </Text>
                              <Text style={styles.Description}>
                                Stop Name:{' '}
                                {
                                  busesCords[selectedBusIndex]
                                    .PassengersDetails[index].StopName
                                }
                              </Text>
                            </View>
                          );
                        }}
                      />
                    )}
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
            </ScrollView>
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
  flatListRow: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    margin: 7,
    padding: 10,
  },
  Type: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  Description: {
    color: 'white',
    fontSize: 20,
  },
});

export default MapScreen;
