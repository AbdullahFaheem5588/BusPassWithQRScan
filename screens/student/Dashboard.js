import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const { width, height } = Dimensions.get('window');
  const [offset, setOffset] = useState(0);
  const arr = ['Abdullah', 'Adeel', 'Umer', 'Zia'];
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [notificationIcon, setNotificationIcon] = useState(require('../../assets/Notification-Focused.png'));

  const handleNotificartionIcon = () => {
    if (notificationIcon === require('../../assets/Notification-Focused.png'))
      setNotificationIcon(require('../../assets/Notification-On.png'));
    else
      setNotificationIcon(require('../../assets/Notification-Focused.png'));
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / 360);
    setOffset(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <Progress.Circle
          progress={59 / 100}
          size={200}
          showsText={true}
          color="white"
          borderWidth={7}
          borderColor="#2FAA98"
          formatText={() => `${59} / ${100}`}
        />
        <Text style={styles.progressText}>Journeys Used</Text>
      </View>
      <View style={styles.MyFavStop}>
        <View style={styles.MyFavStopTitle}>
          <Text style={styles.titleText}>Favourite Stops</Text>
        </View>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          horizontalScrollEventThrottle={360}>
          {arr &&
            arr.map((item, ind) => (
              <View key={ind} style={styles.favoriteStopContainer}>
                <TouchableOpacity onPress={handleNotificartionIcon} style={styles.notificationIconContainer}>
                  <Image source={notificationIcon} style={styles.notificationIcon} />
                </TouchableOpacity>
                <Text style={styles.favoriteStopText}>Chandni Chowk</Text>
                <View style={styles.infoContainer}>
                  <View style={styles.infoBox}>
                    <Image source={require('../../assets/RouteNo.png')} style={styles.infoImage} />
                    <Text style={styles.infoLabel}>Route No</Text>
                    <Text style={styles.infoText}>1111</Text>
                  </View>
                  <View style={[styles.infoBox, {marginRight:10,}]}>
                    <Image source={require('../../assets/StopTiming.png')} style={styles.StopTimingImage} />
                    <Text style={styles.infoLabel}>Stop Timing</Text>
                    <Text style={styles.infoText}>1111</Text>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
        <View style={styles.pageIndicatorContainer}>
          {arr &&
            arr.map((item, ind) => (
              <View key={ind} style={[styles.pageIndicator, ind === offset ? styles.activePageIndicator : null]}></View>
            ))}
        </View>
        <TouchableOpacity onPress={() => { navigation.navigate('FavStops'); }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>EDIT FAVOURITE STOPS</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#168070',
  },
  progress: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 18,
    color: 'white',
    marginTop: -70,
    marginBottom: 80,
  },
  MyFavStop: {
    backgroundColor: '#168070',
    width: 380,
    borderRadius: 30,
    elevation: 10,
  },
  MyFavStopTitle: {
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    width: 380,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 40,
  },
  titleText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#168070',
  },
  favoriteStopContainer: {
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 360,
    margin: 10,
    marginTop: 20,
    borderRadius: 30,
  },
  notificationIconContainer: {
    width: 30,
    flex: 1,
    alignSelf: 'flex-end',
  },
  notificationIcon: {
    marginTop: 10,
    marginLeft: -5,
  },
  favoriteStopText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  infoBox: {
    marginLeft: 10,
    backgroundColor: '#2FAA98',
    borderRadius: 30,
    elevation: 10,
    width: 160,
    height: 160,
  },
  infoImage: {
    width: 21,
    height: 85,
    alignSelf: 'center',
    marginTop: 10,
  },
  StopTimingImage : {
    width: 120,
    height: 85,
    alignSelf: 'center',
    marginTop:10,
  },
  infoLabel: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    marginTop: 5,
  },
  infoText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  pageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  activePageIndicator: {
    backgroundColor: 'white',
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
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#168070',
  },
});

export default Dashboard;
