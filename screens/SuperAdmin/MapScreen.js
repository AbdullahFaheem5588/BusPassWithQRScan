import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MapScreen = ({route}) => {
  const userDetails = route.params.userDetails;
  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  );
};

export default MapScreen;
