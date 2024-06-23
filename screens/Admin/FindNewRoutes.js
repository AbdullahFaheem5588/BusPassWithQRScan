import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import MapViewDirections from 'react-native-maps-directions';
import Api_url from '../../Helper/URL';
import GoogleMapKey from '../../GoogleMapKey';

const {width, height} = Dimensions.get('window');

const FindNewRoutes = ({route}) => {
  const OrganizationId = route.params.OrganizationId;

  const [selectedStops, setSelectedStops] = useState([]);
  const [RouteSharingPopupVisible, setRouteSharingPopupVisible] =
    useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [Stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setStops(
          data.map(item => ({
            key: item.Id.toString(),
            value: item.Name,
            timing: item.Timing,
            longitude: item.Longitude,
            latitude: item.Latitude,
            route: item.Route,
          })),
        );
      } else {
        console.log(data);
        Alert.alert('Error', 'Failed to load stops.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const GetAvailableRoutes = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Stops/GetAvailableRoutes?OrganizationId=${OrganizationId}`,
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
        Alert.alert('Error', 'Failed to load routes.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const SendRouteSharingRequest = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Admin/SendRouteSharingRequest?RouteId=${selectedRoute.RouteId}&OrganizationId=${OrganizationId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        ToastAndroid.show(data, ToastAndroid.SHORT);
        GetAvailableRoutes();
        handleRouteSharingPopupVisibility(null);
      } else {
        console.log(data);
        handleRouteSharingPopupVisibility(null);
        Alert.alert('Error', 'Failed to load routes.');
      }
    } catch (error) {
      handleRouteSharingPopupVisibility(null);
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    GetAvailableRoutes();
    getAllStops();
  }, []);

  const calculateRegion = stops => {
    if (stops.length === 0) return null;

    let minLat = parseFloat(stops[0].Latitude);
    let maxLat = parseFloat(stops[0].Latitude);
    let minLon = parseFloat(stops[0].Longitude);
    let maxLon = parseFloat(stops[0].Longitude);

    stops.forEach(stop => {
      minLat = Math.min(minLat, parseFloat(stop.Latitude));
      maxLat = Math.max(maxLat, parseFloat(stop.Latitude));
      minLon = Math.min(minLon, parseFloat(stop.Longitude));
      maxLon = Math.max(maxLon, parseFloat(stop.Longitude));
    });

    const midLat = (minLat + maxLat) / 2;
    const midLon = (minLon + maxLon) / 2;
    const deltaLat = (maxLat - minLat) * 1.1; // 10% padding
    const deltaLon = (maxLon - minLon) * 1.1; // 10% padding

    return {
      latitude: midLat,
      longitude: midLon,
      latitudeDelta: Math.max(deltaLat, 0.02),
      longitudeDelta: Math.max(deltaLon, 0.02),
    };
  };

  const handleRouteSharingPopupVisibility = route => {
    setSelectedRoute(route);
    setRouteSharingPopupVisible(!RouteSharingPopupVisible);
  };

  const filteredRoutes = routes.filter(route =>
    selectedStops.every(stop => route.Stops.some(s => s.Name === stop)),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Stops to Filter Routes</Text>
      <MultipleSelectList
        setSelected={setSelectedStops}
        data={Stops}
        save="value"
        label="Selected Stops"
        boxStyles={{
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 5,
          width: width * 0.9,
          alignSelf: 'center',
          color: 'white',
        }}
        dropdownStyles={{
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 5,
          width: width * 0.9,
          alignSelf: 'center',
          color: 'white',
          maxHeight: height * 0.24,
          marginBottom: 20,
        }}
        checkBoxStyles={{borderColor: 'white'}}
        labelStyles={{color: 'white'}}
        dropdownItemStyles={{justifyContent: 'center', color: 'white'}}
        dropdownTextStyles={{color: 'white'}}
        inputStyles={{color: 'white'}}
        placeholder="Select Stops Here"
      />
      {loading ? (
        <Text style={styles.noResultsText}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredRoutes}
          keyExtractor={item => item.RouteId.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.routeContainer}
              onPress={() => handleRouteSharingPopupVisibility(item)}>
              <Text style={styles.routeTitle}>{item.RouteTitle}</Text>
              <Text style={styles.description}>
                Stops: {item.Stops.map(stop => stop.Name).join(', ')}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>No routes found</Text>
          }
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={RouteSharingPopupVisible}
        onRequestClose={() => handleRouteSharingPopupVisibility(null)}>
        <View style={styles.modalContainer}>
          {selectedRoute && (
            <MapView
              style={styles.map}
              initialRegion={calculateRegion(selectedRoute.Stops)}>
              <MapViewDirections
                origin={{
                  latitude: parseFloat(selectedRoute.Stops[0].Latitude),
                  longitude: parseFloat(selectedRoute.Stops[0].Longitude),
                }}
                destination={{
                  latitude: parseFloat(
                    selectedRoute.Stops[selectedRoute.Stops.length - 1]
                      .Latitude,
                  ),
                  longitude: parseFloat(
                    selectedRoute.Stops[selectedRoute.Stops.length - 1]
                      .Longitude,
                  ),
                }}
                waypoints={selectedRoute.Stops.slice(1, -1).map(stop => ({
                  latitude: parseFloat(stop.Latitude),
                  longitude: parseFloat(stop.Longitude),
                }))}
                apikey={GoogleMapKey}
                strokeColor="#d883ff"
                strokeWidth={5}
              />
              {selectedRoute &&
                selectedRoute.Stops.map((stop, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parseFloat(stop.Latitude),
                      longitude: parseFloat(stop.Longitude),
                    }}
                    title={stop.Name}
                  />
                ))}
            </MapView>
          )}
          <TouchableOpacity onPress={SendRouteSharingRequest}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>SEND SHARING REQUEST</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleRouteSharingPopupVisibility(null)}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>CLOSE</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  routeContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    elevation: 2,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#168070',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  noResultsText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  map: {
    width: width * 0.8,
    height: height * 0.8,
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
  btnText: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#168070',
  },
});

export default FindNewRoutes;
