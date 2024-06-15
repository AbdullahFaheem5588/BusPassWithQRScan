import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import GoogleMapKey from '../../GoogleMapKey';
import Api_url from '../../Helper/URL';

const MapScreen = ({route}) => {
  const userDetails = route.params.userDetails;
  const mapRef = useRef();
  const markerRef = useRef();
  const [ChildLocation, setChildLocation] = useState([]);

  const getChildrenLocation = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Parent/GetChildLocation?id=${userDetails.Id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setChildLocation(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getChildrenLocation();
  }, [ChildLocation]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: userDetails.OrganizationCords.latitude,
          longitude: userDetails.OrganizationCords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker
          coordinate={userDetails.OrganizationCords}
          title={userDetails.OrganizationName}
          image={require('../../assets/UniMapMarker.png')}
        />
        {Array.isArray(ChildLocation) && ChildLocation.length > 0 ? (
          ChildLocation.map((item, ind) => (
            <View key={ind}>
              <Polyline
                coordinates={item.Location.map(loc => ({
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                }))}
                strokeColor="#d883ff"
                strokeWidth={5}
              />

              <Marker
                coordinate={item.Location[item.Location.length - 1]}
                title={item.Name}
                ref={markerRef}>
                <Image
                  source={require('../../assets/ChildLocationMarker.png')}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              </Marker>
            </View>
          ))
        ) : (
          <View></View>
        )}
      </MapView>
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
