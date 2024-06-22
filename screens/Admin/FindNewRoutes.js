import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

const {width, height} = Dimensions.get('window');

const FindNewRoutes = ({route}) => {
  const OrganizationId = route.params.OrganizationId;

  const [selectedStops, setSelectedStops] = useState([]);
  const [RouteSharingPopupVisible, setRouteSharingPopupVisible] =
    useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routes, setRoutes] = useState([
    {id: 1, title: 'Route 1', stops: ['Stop A', 'Stop B', 'Stop C']},
    {id: 2, title: 'Route 2', stops: ['Stop D', 'Stop E', 'Stop F']},
    {id: 3, title: 'Route 3', stops: ['Stop G', 'Stop H', 'Stop I']},
  ]);

  const allStops = [
    {key: 1, value: 'Stop A'},
    {key: 2, value: 'Stop B'},
    {key: 3, value: 'Stop C'},
    {key: 4, value: 'Stop D'},
    {key: 5, value: 'Stop E'},
    {key: 6, value: 'Stop F'},
    {key: 7, value: 'Stop G'},
    {key: 8, value: 'Stop H'},
    {key: 9, value: 'Stop I'},
  ];

  const handleRouteSharingPopupVisibility = route => {
    setSelectedRoute(route);
    setRouteSharingPopupVisible(!RouteSharingPopupVisible);
  };

  const filteredRoutes = routes.filter(route =>
    selectedStops.every(stop => route.stops.includes(stop)),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Stops to Filter Routes</Text>
      <MultipleSelectList
        setSelected={setSelectedStops}
        data={allStops}
        save="value"
        label="Selected Stops"
        search={true}
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
      <FlatList
        data={filteredRoutes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.routeContainer}
            onPress={() => handleRouteSharingPopupVisibility(item)}>
            <Text style={styles.routeTitle}>{item.title}</Text>
            <Text style={styles.routeStops}>
              Stops: {item.stops.join(', ')}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No routes found</Text>
        }
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={RouteSharingPopupVisible}
        onRequestClose={() => handleRouteSharingPopupVisibility(null)}>
        <View style={styles.modalContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: 33.56606783485247,
              longitude: 73.09835087034504,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}></MapView>
          <TouchableOpacity
            onPress={() => handleRouteSharingPopupVisibility(null)}>
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
  routeStops: {
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
    width: width * 0.9,
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
    marginBottom: width * 0.025,
    marginTop: width * 0.025,
  },
});

export default FindNewRoutes;
