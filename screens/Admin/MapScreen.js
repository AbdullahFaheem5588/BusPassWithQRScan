import React, {useState, useRef} from 'react';
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
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GoogleMapKey from '../../GoogleMapKey';
import MapViewDirections from 'react-native-maps-directions';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

const {width, height} = Dimensions.get('window');

const MapScreen = () => {
  const arr = ['Abdullah', 'Adeel', 'Umer', 'Zia'];
  const [stopName, setStopName] = useState('');
  const [routeName, setRouteName] = useState('');
  const scrollViewRef = useRef(null);
  const mapView = useRef();
  const [offset, setOffset] = useState(0);
  const [stopPopupVisible, setStopPopupVisible] = useState(false);
  const [BusPopupVisible, setBusPopupVisible] = useState(false);
  const [AddOptionsVisible, setAddOptionsVisible] = useState(false);
  const [AddStopVisible, setAddStopVisible] = useState(false);
  const [AddRouteVisible, setAddRouteVisible] = useState(false);
  const [selectedBusIndex, setselectedBusIndex] = useState(null);
  const [selectedStops, SetSelectedStops] = useState([]);
  const Stops = [
    {key: '1', value: 'Saddar'},
    {key: '2', value: 'Chandni Chowk'},
    {key: '3', value: 'Rehmanabad'},
    {key: '4', value: '6th Road'},
  ];
  const unicords = {
    latitude: 33.64340057674401,
    longitude: 73.0790521153456,
  };
  const busesCords = [
    {
      Id: 1,
      Title: 'Chandni Chowk - Saddar (8:30)',
      Cords: {
        latitude: 33.60626103098687,
        longitude: 73.06594487798462,
      },
    },
    {
      Id: 2,
      Title: 'Saddar - Chandni Chowk (4:30)',
      Cords: {
        latitude: 33.58619836860913,
        longitude: 73.07261567925178,
      },
    },
  ];
  const stopsCords = [
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
  };
  const handleAddRoutePopupVisibility = () => {
    setAddRouteVisible(!AddRouteVisible);
    setAddOptionsVisible(false);
  };
  const handleLongPress = event => {
    const {coordinate} = event.nativeEvent;
    console.log('Long press detected at:', coordinate);
    handleAddPopupVisibility();
  };
  const addNewStop = () => {
    //Adding New Stop Code
    handleAddStopPopupVisibility();
  };
  const addNewRoute = () => {
    //Adding New Route Code
    handleAddRoutePopupVisibility();
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
        }}
        onLongPress={handleLongPress}>
        <Marker
          coordinate={unicords}
          title="Barani Institute of Information Technology"
          image={require('../../assets/UniMapMarker.png')}
        />
        <MapViewDirections
          origin={unicords}
          destination={unicords}
          waypoints={stopsCords}
          apikey={GoogleMapKey}
          strokeColor="#d883ff"
          strokeWidth={5}
        />
        {stopsCords.map((waypoint, index) => (
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
                  ))}
              </ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginBottom: 10,
                }}>
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
                  {busesCords[selectedBusIndex].Title}
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
                      {busesCords[selectedBusIndex].Id}
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
                    onChangeText={setStopName}
                    value={stopName}
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
                    onChangeText={setRouteName}
                    value={routeName}
                    placeholder="Name"
                    placeholderTextColor="white"
                    fontSize={width * 0.04}
                  />
                  <MultipleSelectList
                    setSelected={SetSelectedStops}
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
