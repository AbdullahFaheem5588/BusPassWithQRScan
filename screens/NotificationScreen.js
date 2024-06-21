import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Api_url from '../Helper/URL';
import convertToAMPM from '../Helper/convertToAMPM';

const {width, height} = Dimensions.get('window');

const NotificationScreen = ({route}) => {
  const userDetails = route.params.userDetails;
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();

  const Images = {
    'Pass Recharged!': require('../assets/Recharged.png'),
    'Bus En-route!': require('../assets/BusEn-route.png'),
    'Announcement!': require('../assets/Announcement.png'),
    'Check Out!': require('../assets/CheckOut.png'),
    'Check In!': require('../assets/CheckIn.png'),
    'Bus Arrived!': require('../assets/BusArrived.png'),
    'New User Added!': require('../assets/NewUserAdded.png'),
  };
  const markAllAsRead = async () => {
    try {
      const response = await fetch(
        `${Api_url}Users/MarkAllNotificationAsRead?userId=${userDetails.UserId}`,
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
  const getUserNotifations = async () => {
    try {
      const response = await fetch(
        `${Api_url}Users/GetUserNotification?id=${userDetails.UserId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    getUserNotifations();
  }, [notifications]);

  return (
    <View style={styles.container}>
      {Array.isArray(notifications) ? (
        <View style={{height: height * 0.8}}>
          <TouchableOpacity
            onPress={markAllAsRead}
            style={{
              backgroundColor: 'white',
              alignSelf: 'flex-end',
              margin: width * 0.0125,
              width: width * 0.5,
              borderRadius: width * 0.025,
            }}>
            <Text
              style={{
                color: '#168070',
                textAlign: 'center',
                fontSize: width * 0.045,
              }}>
              ✓✓ Mark All as Read
            </Text>
          </TouchableOpacity>
          <FlatList
            data={notifications}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('NotificationDetails', {
                      NotificationDetails: item,
                      ImagePath: Images[item.Type],
                    })
                  }
                  style={{margin: width * 0.0175}}>
                  <View
                    style={[
                      styles.flatListRow,
                      item.NotificationRead === 0 && {
                        backgroundColor: '#2FAA98',
                        borderWidth: 0,
                        elevation: 10,
                      },
                    ]}>
                    <View style={{width: '20%', justifyContent: 'center'}}>
                      <Image
                        source={Images[item.Type]}
                        style={{
                          height: '95%',
                          width: '90%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View style={{width: '80%'}}>
                      <Text style={styles.DateTime}>
                        {item.Date.substring(0, 10)} ,{' '}
                        {convertToAMPM(item.Time)}
                      </Text>
                      <Text style={styles.NotificationType}>{item.Type}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <View>
          <Text style={[styles.NotificationType, {textAlign: 'center'}]}>
            No Notifications Found!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
    justifyContent: 'center',
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
