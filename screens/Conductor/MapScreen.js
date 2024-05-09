import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import GoogleMapKey from '../../GoogleMapKey';
import MapViewDirections from 'react-native-maps-directions';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  locationPermission,
  getCurrentLocation,
} from '../../Helper/LocationTracker';

const {width, height} = Dimensions.get('window');

const MapScreen = () => {
  const mapView = useRef();
  const markerRef = useRef();
  const [stopPopupVisible, setStopPopupVisible] = useState(false);
  const [journeyPopupVisible, setJourneyPopupVisible] = useState(false);
  const [selectedJourney, SetSelectedJourney] = useState('');
  const unicords = {
    latitude: 33.64340057674401,
    longitude: 73.0790521153456,
  };
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const Journeys = [
    {key: '1', value: 'Uni - Saddar (8:30)'},
    {key: '2', value: 'Uni - Chandni Chowk (6:30)'},
  ];
  const stops = [
    {latitude: 33.62143941364173, longitude: 73.06649344534786},
    {latitude: 33.61580806175649, longitude: 73.06536334223695},
    {latitude: 33.61226103098687, longitude: 73.06514487798462},
    {latitude: 33.59934934614757, longitude: 73.06264830651558},
    {latitude: 33.592161870536664, longitude: 73.05439953778502},
    {latitude: 33.585168200292784, longitude: 73.0645131331935},
    {latitude: 33.59059836860913, longitude: 73.07861567925173},
    {latitude: 33.59545700923111, longitude: 73.07889345288326},
  ];

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    console.log('Location Permission: ', locPermissionDenied);
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 4 second', latitude, longitude);
      const loc = {
        latitude: latitude,
        longitude: longitude,
      };
      setUserLocation(loc);
      console.log('User Location:', userLocation);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, [userLocation]);

  const handleStopPopupVisibility = () => {
    setStopPopupVisible(!stopPopupVisible);
  };

  const handleJourneyPopupVisibility = () => {
    setJourneyPopupVisible(!journeyPopupVisible);
  };

  const startJourney = () => {
    //Start Journey Code Here
    handleJourneyPopupVisibility();
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 33.64340057674401,
          longitude: 73.0790521153456,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker
          coordinate={unicords}
          title="Barani Institute of Information Technology"
          image={require('../../assets/UniMapMarker.png')}
        />
        <Marker
          coordinate={userLocation}
          image={require('../../assets/BusMapMarker.png')}
          ref={markerRef}
        />
        <MapViewDirections
          origin={unicords}
          destination={unicords}
          waypoints={stops}
          optimizeWaypoints={true}
          apikey={GoogleMapKey}
          strokeColor="#d883ff"
          strokeWidth={5}
        />
        {stops.map((waypoint, index) => (
          <Marker
            key={index}
            coordinate={waypoint}
            onPress={handleStopPopupVisibility}
          />
        ))}
      </MapView>
      <TouchableOpacity onPress={handleJourneyPopupVisibility} style={{position: 'absolute', bottom: 10,}}>
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
                  {/*favStops[0].Name*/}
                  Chandni Chowk
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
                      10
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
                      8:30
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
              setSelected={val => SetSelectedJourney(val)}
              data={Journeys}
              save="value"
              onSelect={() => {
                console.log(selectedJourney);
              }}
              searchPlaceholder="Search"
              dropdownTextStyles={{color: 'white'}}
              placeholder="Select Here"
              inputStyles={{color: 'white'}}
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
        <TouchableOpacity onPress={handleJourneyPopupVisibility}>
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
