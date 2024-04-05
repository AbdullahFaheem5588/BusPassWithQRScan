import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GoogleMapKey from '../../GoogleMapKey';
import MapViewDirections from 'react-native-maps-directions';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const MapScreen = () => {
  const [offset, setOffset] = useState(0);
  const mapRef = useRef();
  const markerRef = useRef();
  const unicords = {
    latitude: 33.64340057674401,
    longitude: 73.0790521153456,
  };
  const [ChildLocation, setChildLocation] = useState([
    {latitude: 33.62143941364173, longitude: 73.06649344534786},
    {latitude: 33.61580806175649, longitude: 73.06536334223695},
    {latitude: 33.61226103098687, longitude: 73.06514487798462},
    {latitude: 33.59934934614757, longitude: 73.06264830651558},
    {latitude: 33.592161870536664, longitude: 73.05439953778502},
    {latitude: 33.585168200292784, longitude: 73.0645131331935},
    {latitude: 33.59059836860913, longitude: 73.07861567925173},
    {latitude: 33.59545700923111, longitude: 73.07889345288326},
  ]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const lat = loc.latitude + 0.1;
  //     const long = loc.longitude + 0.1;
  //     const myloc = {lat, long}
  //     setloc(myloc);
  //   }, 6000);  
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: ChildLocation[ChildLocation.length - 1].latitude,
          longitude: ChildLocation[ChildLocation.length - 1].longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker
          coordinate={unicords}
          title="Barani Institute of Information Technology"
          image={require('../../assets/UniMapMarker.png')}
        />
        <MapViewDirections
          origin={ChildLocation[0]}
          destination={ChildLocation[ChildLocation.length - 1]}
          waypoints={ChildLocation}
          apikey={GoogleMapKey}
          strokeColor="#d883ff"
          strokeWidth={5}
        />
        <Marker coordinate={ChildLocation[ChildLocation.length - 1]} title="Abdullah Faheem" ref={markerRef}>
          <Image
            source={require('../../assets/ProfilePicture.png')}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              backgroundColor: 'black',
              borderRadius: 17,
            }}
          />
        </Marker>
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
