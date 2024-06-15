import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Alert,
  ToastAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GoogleMapKey from '../../GoogleMapKey';
import MapViewDirections from 'react-native-maps-directions';
import {SelectList} from 'react-native-dropdown-select-list';
import Api_url from '../../Helper/URL';
import convertToAMPM from '../../Helper/convertToAMPM';
import {isPointWithinRadius} from 'geolib';

const {width, height} = Dimensions.get('window');

const MapScreen = ({route}) => {
  const userDetails = route.params.userDetails;
  //const {userLocation} = useContext(LocationServiceContext);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const mapView = useRef();
  const [stopPopupVisible, setStopPopupVisible] = useState(false);
  const [journeyPopupVisible, setJourneyPopupVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [routesDetails, setRoutesDetails] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(Number);
  const [selectedRouteStops, setSelectedRouteStops] = useState([]);
  const [selectedStopDetails, setSelectedStopDetails] = useState({});
  const [isJourneyCompleted, setIsJourneyCompleted] = useState(Boolean);

  const handleStopPopupVisibility = id => {
    const stop = selectedRouteStops.find(stop => stop.Id === id);
    setSelectedStopDetails(stop);
    setStopPopupVisible(!stopPopupVisible);
  };

  const reachedAtStop = async (stopId, routeId) => {
    try {
      const response = await fetch(
        `${Api_url}/Conductor/ReachedAtStop/?busId=${userDetails.BusId}&routeId=${routeId}&stopId=${stopId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  const updateBusLocation = async () => {
    try {
      const userLocationDetails = {
        BusId: userDetails.BusId,
        Cords: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
      };
      const response = await fetch(`${Api_url}/Conductor/UpdateBusLocation`, {
        method: 'POST',
        body: JSON.stringify(userLocationDetails),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const stopsWithinRadius = selectedRouteStops
          .map(stop => {
            const withinRadius = isPointWithinRadius(
              {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              },
              {
                latitude: parseFloat(stop.Latitude),
                longitude: parseFloat(stop.Longitude),
              },
              100,
            );
            return withinRadius ? stop : null;
          })
          .filter(stop => stop !== null);
        console.log(stopsWithinRadius);
        if (stopsWithinRadius.length > 0) {
          stopsWithinRadius.forEach(stop => {
            reachedAtStop(stop.Id, stop.Route);
          });
        }
        const uniWithinRadius = isPointWithinRadius(
          {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
          {
            latitude: userDetails.OrganizationCords.latitude,
            longitude: userDetails.OrganizationCords.longitude,
          },
          100,
        );
        if (uniWithinRadius) reachedAtStop(0, selectedRoute);
      } else {
        console.log('Error updating bus location!');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  // useEffect(() => {
  //   const updateBusLocation = async () => {
  //     try {
  //       const userLocationDetails = {
  //         BusId: userDetails.BusId,
  //         Cords: {
  //           latitude: userLocation.latitude,
  //           longitude: userLocation.longitude,
  //         },
  //       };
  //       const response = await fetch(`${Api_url}/Conductor/UpdateBusLocation`, {
  //         method: 'POST',
  //         body: JSON.stringify(userLocationDetails),
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data);

  //         const stopsWithinRadius = selectedRouteStops
  //           .map(stop => {
  //             const withinRadius = isPointWithinRadius(
  //               {
  //                 latitude: userLocation.latitude,
  //                 longitude: userLocation.longitude,
  //               },
  //               {
  //                 latitude: parseFloat(stop.Latitude),
  //                 longitude: parseFloat(stop.Longitude),
  //               },
  //               100,
  //             );
  //             return withinRadius ? stop : null;
  //           })
  //           .filter(stop => stop !== null);
  //         console.log(stopsWithinRadius);
  //         if (stopsWithinRadius.length > 0) {
  //           stopsWithinRadius.forEach(stop => {
  //             reachedAtStop(stop.Id, stop.Route);
  //           });
  //         }
  //         const uniWithinRadius = isPointWithinRadius(
  //           {
  //             latitude: userLocation.latitude,
  //             longitude: userLocation.longitude,
  //           },
  //           {
  //             latitude: unicords.latitude,
  //             longitude: unicords.longitude,
  //           },
  //           500,
  //         );
  //         if (uniWithinRadius) reachedAtStop(0, selectedRoute);
  //       } else {
  //         console.log('Error updating bus location!');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       Alert.alert('Error', 'An unexpected error occurred. Please try again.');
  //     }
  //   };

  //   if (!isJourneyCompleted) updateBusLocation();
  // }, [userLocation]);

  const GetStartedRoute = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Conductor/GetStartedRoute/?conductorId=${userDetails.Id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedRoute(data.RouteId);
        setSelectedRouteStops(data.Stops);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const checkJourneyCompletion = async () => {
      try {
        const response = await fetch(
          `${Api_url}/Conductor/IsJourneyCompleted/?conductorId=${userDetails.Id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setIsJourneyCompleted(data);
        } else {
          console.log('Error!');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    };

    const intervalId = setInterval(() => {
      checkJourneyCompletion();
      if (selectedRoute === 0) GetStartedRoute();
      console.log('Is Journey Completed: ', isJourneyCompleted);
      if (isJourneyCompleted) {
        setSelectedRoute(0);
        setSelectedRouteStops([]);
        setSelectedStopDetails({});
      }
    }, 6000);
    return () => clearInterval(intervalId);
  }, [isJourneyCompleted]);

  const handleJourneyPopupVisibility = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Conductor/GetAssignedRoutes/?conductorId=${userDetails.Id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setRoutesDetails(data);
        const journeysArray = data.map(item => ({
          key: item.RouteId,
          value: item.RouteTitle,
        }));
        setRoutes(journeysArray);
        setJourneyPopupVisible(true);
      } else {
        console.error('Failed to fetch journeys');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const startJourney = async () => {
    const selectedRouteDetails = routesDetails.find(
      journey => journey.RouteId === selectedRoute,
    );
    if (selectedRouteDetails && selectedRouteDetails.Stops) {
      setSelectedRouteStops(selectedRouteDetails.Stops);
    } else {
      ToastAndroid.show(
        'No stops found for the selected journey.',
        ToastAndroid.SHORT,
      );
    }
    try {
      const response = await fetch(
        `${Api_url}/Conductor/StartJourney/?busId=${userDetails.BusId}&routeId=${selectedRoute}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setJourneyPopupVisible(false); // Move this line here to ensure the modal closes after successful journey start
      } else {
        console.error('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  const handleUserLocationChange = event => {
    const {coordinate} = event.nativeEvent;
    setUserLocation(coordinate);
    if (!isJourneyCompleted) updateBusLocation();
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        style={StyleSheet.absoluteFill}
        onPress={handleUserLocationChange}
        initialRegion={{
          latitude: userDetails.OrganizationCords.latitude,
          longitude: userDetails.OrganizationCords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        {userLocation.latitude !== 0 && userLocation.longitude !== 0 && (
          <Marker
            coordinate={userLocation}
            image={require('../../assets/BusMapMarker.png')}
          />
        )}
        <Marker
          coordinate={userDetails.OrganizationCords}
          title={userDetails.OrganizationName}
          image={require('../../assets/UniMapMarker.png')}
        />
        {selectedRouteStops.length > 0 &&
          userLocation.latitude !== 0 &&
          userLocation.longitude !== 0 && (
            <>
              <MapViewDirections
                origin={userLocation}
                destination={userDetails.OrganizationCords}
                waypoints={selectedRouteStops.map(stop => ({
                  latitude: parseFloat(stop.Latitude),
                  longitude: parseFloat(stop.Longitude),
                }))}
                apikey={GoogleMapKey}
                strokeWidth={3}
                strokeColor="hotpink"
                optimizeWaypoints={true}
              />
              {selectedRouteStops.map(stop => (
                <Marker
                  key={stop.Id}
                  coordinate={{
                    latitude: parseFloat(stop.Latitude),
                    longitude: parseFloat(stop.Longitude),
                  }}
                  title={stop.StopTitle}
                  onPress={() => handleStopPopupVisibility(stop.Id)}
                  image={require('../../assets/BusStopMapMarker.png')}
                />
              ))}
            </>
          )}
      </MapView>
      {isJourneyCompleted && (
        <TouchableOpacity
          onPress={handleJourneyPopupVisibility}
          style={{position: 'absolute', bottom: 10}}>
          <View style={styles.btn}>
            <Text
              style={{
                fontSize: width * 0.055,
                fontWeight: 'bold',
                color: '#168070',
              }}>
              CHOOSE JOURNEY
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={stopPopupVisible}
        onRequestClose={handleStopPopupVisibility}>
        {stopPopupVisible && (
          <View style={styles.modalContainer}>
            <View style={[styles.StopPopup]}>
              <View
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
                  {selectedStopDetails.Name}
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
                      {selectedStopDetails.Route}
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
                      {convertToAMPM(selectedStopDetails.Timing)}
                    </Text>
                  </View>
                </View>
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
        visible={journeyPopupVisible}
        onRequestClose={handleJourneyPopupVisibility}>
        {journeyPopupVisible && (
          <View style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: '#168070',
                width: width * 0.95,
                elevation: width * 0.025,
                marginBottom: width * 0.075,
                borderRadius: width * 0.033,
              }}>
              <SelectList
                setSelected={key => setSelectedRoute(key)}
                data={routes}
                save="key"
                search={false}
                placeholder="Select Route"
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
                }}
                boxStyles={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 5,
                  width: width * 0.8,
                  alignSelf: 'center',
                  color: 'white',
                }}
              />
            </View>
            <TouchableOpacity onPress={startJourney}>
              <View style={styles.btn}>
                <Text
                  style={{
                    fontSize: width * 0.055,
                    fontWeight: 'bold',
                    color: '#168070',
                  }}>
                  START
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setJourneyPopupVisible(false);
              }}>
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
    alignItems: 'center',
  },
  StopPopup: {
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
    marginTop: width * 0.025,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default MapScreen;
