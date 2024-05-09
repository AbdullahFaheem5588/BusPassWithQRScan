import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GoogleMapKey from '../../GoogleMapKey';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');

const MapScreen = () => {
  const arr = ['Abdullah', 'Adeel', 'Umer', 'Zia'];
  const scrollViewRef = useRef(null);
  const mapView = useRef();
  const [offset, setOffset] = useState(0);
  const [stopPopupVisible, setStopPopupVisible] = useState(false);
  const unicords = {
    latitude: 33.64340057674401,
    longitude: 73.0790521153456,
  };
  const busesCords = [
    { Id: 1,
      Cords: {
        latitude: 33.60626103098687,
        longitude: 73.06594487798462
      }
    },
    {
      Id: 2,
      Cords: {
        latitude: 33.58619836860913,
      longitude: 73.07261567925178
    }
    }
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

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / 360);
    setOffset(index);
  };

  const handleStopPopupVisibility = () => {
    setStopPopupVisible(!stopPopupVisible);
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
        <MapViewDirections
          origin={unicords}
          destination={unicords}
          waypoints={stops}
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
        {busesCords.map((location, index) => (
          <Marker
            key={index}
            coordinate={location.Cords}
            image={require('../../assets/BusMapMarker.png')}
            title={`Bus No: ${location.Id}`}
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
              horizontalScrollEventThrottle={(width * 0.9)}
            >
              {arr &&
                arr.map((item, ind) => (
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
                    }}
                  >
                    <Text
                      style={{
                        fontSize: width * 0.055,
                        fontWeight: 'bold',
                        color: 'white',
                        alignSelf: 'center',
                        marginTop: width * 0.025,
                      }}
                    >
                      {/*favStops[0].Name*/}
                      Chandni Chowk
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: width * 0.05,
                        marginBottom: width * 0.05,
                      }}
                    >
                      <View
                        style={{
                          marginLeft: width * 0.025,
                          backgroundColor: '#2FAA98',
                          borderRadius: width * 0.075,
                          elevation: width * 0.025,
                          width: width * 0.4,
                          height: width * 0.4,
                        }}
                      >
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
                          }}
                        >
                          Route No
                        </Text>
                        <Text
                          style={{
                            fontSize: width * 0.055,
                            fontWeight: 'bold',
                            color: 'white',
                            alignSelf: 'center',
                          }}
                        >
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
                        }}
                      >
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
                          }}
                        >
                          Stop Timing
                        </Text>
                        <Text
                          style={{
                            fontSize: width * 0.055,
                            fontWeight: 'bold',
                            color: 'white',
                            alignSelf: 'center',
                          }}
                        >
                          8:30
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              {arr &&
                arr.map((item, ind) => (
                  <View
                    key={ind}
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                    }}
                  >
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
                        ind === offset ? { backgroundColor: 'white' } : null,
                      ]}
                    ></View>
                  </View>
                ))}
            </View>
            <TouchableOpacity>
              <View style={styles.btn}>
                <Text
                  style={{
                    fontSize: width * 0.055,
                    fontWeight: 'bold',
                    color: '#168070',
                  }}
                >
                  ADD TO FAVOURITE STOPS
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleStopPopupVisibility}>
          <View style={styles.btn}>
            <Text
              style={{
                fontSize: width * 0.055,
                fontWeight: 'bold',
                color: '#168070',
              }}
            >
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
