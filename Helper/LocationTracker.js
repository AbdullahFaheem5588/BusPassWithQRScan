import React, {createContext, useState, useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {isPointWithinRadius} from 'geolib';

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          'whenInUse',
        );
        if (permissionStatus === 'granted') {
          return resolve('granted');
        }
        reject('Permission not granted');
      } catch (error) {
        return reject(error);
      }
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }
        return reject('Location Permission denied');
      })
      .catch(error => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
      });
  });

export const LocationServiceContext = createContext();

export const LocationServiceProvider = ({children}) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getLiveLocation = async () => {
    try {
      const locPermissionDenied = await locationPermission();
      if (locPermissionDenied) {
        const {latitude, longitude} = await getCurrentLocation();
        const loc = {latitude, longitude};
        setUserLocation(loc);
      }
    } catch (error) {
      console.error('Error obtaining user location:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LocationServiceContext.Provider value={{userLocation}}>
      {children}
    </LocationServiceContext.Provider>
  );
};
