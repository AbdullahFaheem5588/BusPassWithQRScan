import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GoogleMapKey from '../../GoogleMapKey';
import MapViewDirections from 'react-native-maps-directions';

const MapScreen = () => {
  const pickupcords = {
      latitude: 33.559444,
      longitude: 73.099897,
    };
    const unicords= {
      latitude: 33.64340057674401,
      longitude: 73.0790521153456,
    };
  return (
    <View style={styles.container}>
      <MapView
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
          image = {require('../../assets/UniMarkinMap.png')}
        />
        <MapViewDirections
          origin={pickupcords}
          destination={unicords}
          apikey={GoogleMapKey}
          strokeColor='#d883ff'
          strokeWidth={5}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
