import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GoogleMapKey from '../../GoogleMapKey';
import MapViewDirections from 'react-native-maps-directions';
import Api_url from '../../Helper/URL';
import convertToAMPM from '../../Helper/convertToAMPM';
import {Stop} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

const MapScreen = ({route}) => {
  const userDetails = route.params.userDetails;
  const [loading, setLoading] = useState(true);
  const [Stops, setStops] = useState([]);
  const [busesCords, SetBusesCords] = useState([]);
  const [selectedStopId, setSelectedStopId] = useState([]);
  const [selectedStopsList, setSelectedStopsList] = useState([]);
  const scrollViewRef = useRef(null);
  const mapView = useRef();
  const [offset, setOffset] = useState(0);
  const [stopPopupVisible, setStopPopupVisible] = useState(false);
  const unicords = {
    latitude: 33.64340057674401,
    longitude: 73.0790521153456,
  };

  const addFavStop = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Student/AddFavStop?studentId=${userDetails.Id}&stopId=${selectedStopId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      ToastAndroid.show(data, ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const getAllBusesCords = async () => {
    try {
      const response = await fetch(`${Api_url}/Student/GetBusesLocations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      SetBusesCords(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
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
      setStops(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStops();
  }, []);

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
    setSelectedStopId(id);
    setSelectedStopsList([]);
    for (i = 0; i < Stops.length; i++) {
      const stop = Stops[i].find(stop => stop.Id === id);
      if (stop) {
        setSelectedStopsList(prevSelectedStopsList => [
          ...prevSelectedStopsList,
          stop,
        ]);
      }
    }
    setStopPopupVisible(!stopPopupVisible);
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
        {Stops.map((routeStops, routeIndex) => (
          <MapViewDirections
            key={routeIndex}
            origin={unicords}
            destination={unicords}
            waypoints={routeStops.map(stop => ({
              latitude: parseFloat(stop.Latitude),
              longitude: parseFloat(stop.Longitude),
            }))}
            apikey={GoogleMapKey}
            strokeColor="#d883ff"
            strokeWidth={5}
          />
        ))}
        {Stops.map((routeStops, routeIndex) =>
          routeStops.map((stop, stopIndex) => (
            <Marker
              key={stopIndex}
              coordinate={{
                latitude: parseFloat(stop.Latitude),
                longitude: parseFloat(stop.Longitude),
              }}
              onPress={() => handleStopPopupVisibility(stop.Id)}
            />
          )),
        )}
        {busesCords.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.Cords}
            image={require('../../assets/BusMapMarker.png')}
            title={`Bus No: ${item.BusId}`}
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
            <View style={[styles.StopPopup]}>
              <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                horizontalScrollEventThrottle={width * 0.9}>
                {selectedStopsList &&
                  selectedStopsList.map((item, ind) => (
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
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                {selectedStopsList &&
                  selectedStopsList.map((item, ind) => (
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
              <TouchableOpacity onPress={addFavStop}>
                <View style={styles.btn}>
                  <Text
                    style={{
                      fontSize: width * 0.055,
                      fontWeight: 'bold',
                      color: '#168070',
                    }}>
                    ADD TO FAVOURITE STOPS
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setStopPopupVisible(!stopPopupVisible)}>
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
    marginBottom: width * 0.0625,
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
