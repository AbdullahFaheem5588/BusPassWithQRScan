import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Dashboard = () => {
  const [offset, setOffset] = useState(0);
  const arr = ['Abdullah', 'Adeel', 'Umer', 'Zia'];
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [notificationIcon, setNotificationIcon] = useState(
    require('../../assets/Notification-Focused.png'),
  );

  const handleScroll = event => {
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
        <Text style={styles.progressText}>Seats Booked</Text>
      </View>
      <View style={styles.MyFavStop}>
        <View style={styles.MyFavStopTitle}>
          <Text style={styles.titleText}>Buses Seating Capacity</Text>
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
                <Text style={styles.favoriteStopText}>Bus # {ind + 1}</Text>
                <View style={styles.infoContainer}>
                  <View style={styles.infoBox}>
                    <Image
                      source={require('../../assets/CheckIn.png')}
                      style={styles.CheckInImage}
                    />
                    <Text style={styles.infoLabel}>Students Checked-In</Text>
                    <Text style={styles.infoText}>11</Text>
                  </View>
                  <View style={[styles.infoBox, {marginRight: 10}]}>
                    <Image
                      source={require('../../assets/Seats.png')}
                      style={styles.SeatsImage}
                    />
                    <Text style={styles.infoLabel}>Remaining Seats</Text>
                    <Text style={styles.infoText}>39</Text>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
        <View style={styles.pageIndicatorContainer}>
          {arr &&
            arr.map((item, ind) => (
              <View
                key={ind}
                style={[
                  styles.pageIndicator,
                  ind === offset ? styles.activePageIndicator : null,
                ]}></View>
            ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Map');
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>TRACK BUSES</Text>
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
    marginBottom: 60,
  },
  MyFavStop: {
    backgroundColor: '#168070',
    width: width * 0.95,
    borderRadius: width * 0.075,
    elevation: width * 0.025,
  },
  MyFavStopTitle: {
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    width: width * 0.95,
    borderTopLeftRadius: width * 0.075,
    borderTopRightRadius: width * 0.075,
    height: height * 0.035,
  },
  titleText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#168070',
  },
  favoriteStopContainer: {
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    width: width * 0.9,
    margin: width * 0.025,
    marginTop: width * 0.025,
    borderRadius: width * 0.075,
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
    marginTop: width * 0.025,
    marginBottom: width * 0.025,
  },
  infoBox: {
    marginLeft: width * 0.025,
    backgroundColor: '#2FAA98',
    borderRadius: width * 0.075,
    elevation: width * 0.025,
    width: width * 0.4,
    height: height * 0.175,
  },
  CheckInImage: {
    width: width * 0.25,
    height: height * 0.1,
    alignSelf: 'center',
    marginTop: width * 0.01,
  },
  SeatsImage: {
    width: width * 0.14,
    height: height * 0.1,
    alignSelf: 'center',
    marginTop: height * 0.005,
  },
  infoLabel: {
    fontSize: width * 0.035,
    color: 'white',
    alignSelf: 'center',
    marginTop: width * 0.0125,
  },
  infoText: {
    fontSize: width * 0.055,
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
    width: width * 0.9,
    height: width * 0.125,
    borderRadius: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: width * 0.0125,
    marginBottom: width * 0.0625,
    marginTop: width * 0.025,
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#168070',
  },
});

export default Dashboard;
