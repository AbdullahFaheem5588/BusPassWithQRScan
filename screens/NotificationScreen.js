import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
    'Bus En-route!': require('../assets/BusEn-route.png')
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          alignSelf: 'flex-end',
          margin: 5,
          width: 150,
          borderRadius: 10,
        }}>
        <Text style={{color: '#168070', textAlign: 'center'}}>
          ✓✓ Mark All as Read
        </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('NotificationDetails', { NotificationType: item, ImagePath: Images[item] })}
              style={{
                margin: 7,
              }}>
              <View
                style={[
                  styles.flatListRow,
                  index === 0 && {
                    backgroundColor: '#2FAA98',
                    borderWidth: 0,
                    elevation: 10,
                  },
                ]}>
                <View style={{width: '20%', justifyContent: 'center',}}>
                  <Image
                    source={Images[item]}  style={{height:'95%', width:'80%'}}
                  />
                </View>
                <View style={{width: '80%',}}>
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
    borderRadius: 10,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  },
  NotificationType: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom:10,
  },
  NotificationDescription: {
    color: 'white',
    fontSize: 20,
  },
  DateTime: {
    color: 'white',
    fontSize: 12,
    textAlign: 'right',
  },
});

export default NotificationScreen;
