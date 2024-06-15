import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Dashboard = ({route}) => {
  const userDetails = route.params.userDetails;
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

export default Dashboard;
