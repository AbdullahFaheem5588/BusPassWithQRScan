import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import convertToAMPM from '../Helper/convertToAMPM';
import {Api_url} from '../Helper/URL';

const {width, height} = Dimensions.get('window');

const NotificationDetails = () => {
  const route = useRoute();
  const {NotificationDetails, ImagePath} = route.params;

  const markAsRead = async () => {
    try {
      const response = await fetch(
        `${Api_url}Users/MarkNotificationAsRead?id=${NotificationDetails.Id}`,
        {
          method: 'PUT',
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    markAsRead();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <Image
          source={ImagePath}
          style={{
            width: width * 0.5,
            height: height * 0.2,
            resizeMode: 'contain',
            tintColor: 'white',
          }}
        />
        <Text style={styles.NotificationType}>{NotificationDetails.Type}</Text>
      </View>
      <ScrollView style={styles.BottomContainer}>
        <View style={{margin: width * 0.075}}>
          <Text style={styles.NotificationDescriptionHeader}>Date</Text>
          <Text style={styles.NotificationDescriptionData}>
            {NotificationDetails.Date.substring(0, 10)}
          </Text>
          <Text style={styles.NotificationDescriptionHeader}>Time</Text>
          <Text style={styles.NotificationDescriptionData}>
            {convertToAMPM(NotificationDetails.Time)}
          </Text>
          <View
            style={{
              width: '100%',
              height: width * 0.00375,
              backgroundColor: '#168070',
              marginTop: width * 0.05,
              marginBottom: width * 0.025,
            }}
          />
          <Text style={styles.NotificationDescriptionHeader}>Description</Text>
          <Text style={styles.NotificationDescriptionData}>
            {NotificationDetails.Description}
          </Text>
        </View>
      </ScrollView>
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
    borderBottomLeftRadius: width * 0.175,
    borderBottomRightRadius: width * 0.175,
    alignItems: 'center',
    paddingVertical: width * 0.05,
  },
  BottomContainer: {
    backgroundColor: 'white',
    width: '90%',
    marginTop: width * 0.03,
    elevation: width * 0.025,
    borderRadius: width * 0.075,
    marginBottom: 10,
  },
  NotificationType: {
    color: 'white',
    fontSize: width * 0.1,
    fontWeight: 'bold',
    marginTop: width * 0.05,
  },
  NotificationDescriptionHeader: {
    color: '#168070',
    fontSize: width * 0.045,
    opacity: 0.8,
    marginTop: width * 0.025,
  },
  NotificationDescriptionData: {
    color: '#168070',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});

export default NotificationDetails;
