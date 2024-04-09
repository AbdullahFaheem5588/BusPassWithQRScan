import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const NotificationScreen = () => {
  const navigation = useNavigation();
  const data = [
    'Check Out!',
    'Check In!',
    'QR-Code Scanned!',
    'Bus Arrived!',
    'Bus En-route!',
    'Announcement!',
    'Announcement!',
    'Announcement!',
    'Announcement!',
    'Announcement!',
  ];

  const Images = {
    'Announcement!': require('../assets/Announcement.png'),
    'Check Out!': require('../assets/CheckOut.png'),
    'Check In!': require('../assets/CheckIn.png'),
    'QR-Code Scanned!': require('../assets/QR-CodeScanned.png'),
    'Bus Arrived!': require('../assets/BusArrived.png'),
    'Bus En-route!': require('../assets/BusEn-route.png'),
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          alignSelf: 'flex-end',
          margin: width * 0.0125,
          width: width * 0.5,
          borderRadius: width * 0.025,
        }}
      >
        <Text style={{ color: '#168070', textAlign: 'center', fontSize: width * 0.045 }}>
          ✓✓ Mark All as Read
        </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NotificationDetails', {
                  NotificationType: item,
                  ImagePath: Images[item],
                })
              }
              style={{ margin: width * 0.0175 }}
            >
              <View
                style={[
                  styles.flatListRow,
                  index === 0 && {
                    backgroundColor: '#2FAA98',
                    borderWidth: 0,
                    elevation: 10,
                  },
                ]}
              >
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <Image source={Images[item]} style={{ height: '95%', width: '80%' }} />
                </View>
                <View style={{ width: '80%' }}>
                  <Text style={styles.DateTime}>Today, 11:30 AM</Text>
                  <Text style={styles.NotificationType}>{item}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
  },
  flatListRow: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: width * 0.025,
    padding: width * 0.025,
    flex: 1,
    flexDirection: 'row',
  },
  NotificationType: {
    color: 'white',
    fontSize: width * 0.055,
    fontWeight: 'bold',
    marginBottom: width * 0.025,
  },
  NotificationDescription: {
    color: 'white',
    fontSize: width * 0.045,
  },
  DateTime: {
    color: 'white',
    fontSize: width * 0.03,
    textAlign: 'right',
  },
});

export default NotificationScreen;