  import React, {useState, useRef, useEffect} from 'react';
  import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Animated,
  } from 'react-native';
  import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
  import GoogleMapKey from '../../GoogleMapKey';
  import MapViewDirections from 'react-native-maps-directions';
  import { locationPermission, getCurrentLocation } from '../../Helper/LocationTracker';
  const MapScreen = () => {
    const arr = ['Abdullah', 'Adeel', 'Umer', 'Zia'];
    const scrollViewRef = useRef(null);
    const mapView = useRef();
    const markerRef = useRef()
    const [offset, setOffset] = useState(0);
    const [scrollViewVisible, setScrollViewVisible] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const unicords = {
      latitude: 33.64340057674401,
      longitude: 73.0790521153456,
    };
    const [userLocation, setUserLocation] = useState({
      latitude: 0,
      longitude: 0,
    });
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
      const locPermissionDenied = await locationPermission()
      console.log("Location Permission: " , locPermissionDenied)
      if (locPermissionDenied) {
          const { latitude, longitude, heading } = await getCurrentLocation()
          console.log("get live location after 4 second",latitude,longitude)
          const loc = {
            latitude: latitude,
            longitude: longitude,
          }
          setUserLocation(loc);
          console.log("User Location:", userLocation)
          animate(latitude, longitude);
          updateState({
              heading: heading,
              curLoc: { latitude, longitude },
              coordinate: new AnimatedRegion({
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA
              })
          })
      }
  }

  useEffect(() => {
      const interval = setInterval(() => {
          getLiveLocation()
      }, 6000);
      return () => clearInterval(interval)
  }, [userLocation])


    const handleScroll = event => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffsetX / 360);
      setOffset(index);
    };

    const handleStopPopupVisibility = () => {
      setScrollViewVisible(!scrollViewVisible);

      Animated.spring(scaleAnim, {
        toValue: scrollViewVisible ? 0 : 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
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
          {/* <Marker
            coordinate={unicords}
            title="Barani Institute of Information Technology"
            image={require('../../assets/UniMapMarker.png')}
          /> */}
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
        <Animated.View style={[{transform: [{scale: scaleAnim}]}]}>
          {scrollViewVisible && (
            <View style={[styles.StopPopup]}>
              <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                horizontalScrollEventThrottle={360}>
                {arr &&
                  arr.map((item, ind) => (
                    <View
                      key={ind}
                      style={{
                        borderColor: 'white',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        width: 360,
                        margin: 10,
                        marginTop: 20,
                        borderRadius: 30,
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: 'bold',
                          color: 'white',
                          alignSelf: 'center',
                          marginTop: 10,
                        }}>
                        {/*favStops[0].Name*/}
                        Chandni Chowk
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 20,
                          marginBottom: 20,
                        }}>
                        <View
                          style={{
                            marginLeft: 10,
                            backgroundColor: '#2FAA98',
                            borderRadius: 30,
                            elevation: 10,
                            width: 160,
                            height: 160,
                          }}>
                          <Image
                            source={require('../../assets/RouteNo.png')}
                            style={{
                              width: 21,
                              height: 85,
                              alignSelf: 'center',
                              marginTop: 10,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: 'white',
                              alignSelf: 'center',
                              marginTop: 5,
                            }}>
                            Route No
                          </Text>
                          <Text
                            style={{
                              fontSize: 25,
                              fontWeight: 'bold',
                              color: 'white',
                              alignSelf: 'center',
                            }}>
                            1111
                          </Text>
                        </View>
                        <View
                          style={{
                            marginRight: 10,
                            width: 160,
                            height: 160,
                            backgroundColor: '#2FAA98',
                            borderRadius: 30,
                            elevation: 10,
                          }}>
                          <Image
                            source={require('../../assets/StopTiming.png')}
                            style={{
                              width: 120,
                              height: 85,
                              alignSelf: 'center',
                              marginTop: 10,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: 'white',
                              alignSelf: 'center',
                              marginTop: 5,
                            }}>
                            Stop Timing
                          </Text>
                          <Text
                            style={{
                              fontSize: 25,
                              fontWeight: 'bold',
                              color: 'white',
                              alignSelf: 'center',
                            }}>
                            1111
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
              </ScrollView>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                {arr &&
                  arr.map((item, ind) => (
                    <View
                      key={ind}
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={[
                          {
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            borderColor: 'white',
                            borderWidth: 1,
                            marginHorizontal: 5,
                          },
                          ind === offset ? {backgroundColor: 'white'} : null,
                        ]}></View>
                    </View>
                  ))}
              </View>
              <TouchableOpacity>
                <View style={styles.btn}>
                  <Text
                    style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
                    ADD TO FAVOURITE STOPS
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity onPress={handleStopPopupVisibility}>
            <View style={styles.btn}>
              <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
                CLOSE
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
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
      width: 380,
      borderRadius: 30,
      elevation: 10,
      marginBottom: 30,
    },
    btn: {
      alignSelf: 'center',
      backgroundColor: 'white',
      width: 360,
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      marginBottom: 25,
      marginTop: 10,
    },
  });

  export default MapScreen;
