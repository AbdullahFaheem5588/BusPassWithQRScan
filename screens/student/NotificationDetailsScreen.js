import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

const NotificationDetails = () => {
  const route = useRoute();
  const {NotificationType, ImagePath} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <Image source={ImagePath} />
        <Text style={styles.NotificationType}>{NotificationType}</Text>
      </View>
      <View style={styles.BottomContainer}>
        <View style={{margin: 30}}>
          <Text style={styles.NotificationDescriptionHeader}>Date</Text>
          <Text style={styles.NotificationDescriptionDate}>11/11/2024</Text>
          <Text style={styles.NotificationDescriptionHeader}>Time</Text>
          <Text style={styles.NotificationDescriptionDate}>11:30 AM</Text>
          <View style={{width:'100%',height:1.5,backgroundColor:'#168070',marginTop:20, marginBottom:10,}} />
          <Text style={styles.NotificationDescriptionHeader}>Description</Text>
          <Text style={styles.NotificationDescriptionDate}>Bus has Arrived at Chandni Chowk.Wait Time is 10 Minutes.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
    alignItems: 'center',
  },
  TopContainer: {
    backgroundColor: '#2FAA98',
    width: '100%',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    alignItems: 'center',
  },
  BottomContainer: {
    backgroundColor: 'white',
    width: '90%',
    marginTop: 30,
    elevation: 10,
    borderRadius: 30,
  },
  NotificationType: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  NotificationDescriptionHeader: {
    color: '#168070',
    fontSize: 20,
    opacity:0.80,
    marginTop:10,
  },
  NotificationDescriptionDate: {
    color: '#168070',
    fontSize: 20,
    fontWeight:'bold',
  },
});

export default NotificationDetails;
