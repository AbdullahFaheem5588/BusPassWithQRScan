import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { enableScreens } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';

enableScreens();

const {width, height} = Dimensions.get('window');

const Dashboard = () => {
  const [offset, setOffset] = useState(0);
  const arr = ['Abdullah Faheem', 'Adeel Shahid khan'];
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setOffset(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.MyChildren}>
        <View style={styles.MyChildrenTitle}>
          <Text style={styles.titleText}>My Children</Text>
        </View>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          horizontalScrollEventThrottle={360}>
          {arr.map((item, ind) => (
            <View key={ind} style={styles.childContainer}>
              <View style={styles.progress}>
                <Progress.Circle
                  progress={0.59}
                  size={width * 0.3}
                  showsText={true}
                  color="white"
                  borderWidth={7}
                  borderColor="#2FAA98"
                  formatText={() => `59 / 100`}
                />
                <Text style={styles.progressText}>Journeys Used</Text>
              </View>
              <Text style={styles.childName}>{item}</Text>
              <Text style={styles.timings}>Pick up Timings</Text>
              <View style={styles.timingContainer}>
                <View style={[styles.timingBox ,{marginLeft:10}]}>
                  <Image source={require('../../assets/CheckIn.png')} style={styles.timingImage} />
                  <Text style={styles.timingImageText}>Check In</Text>
                  <Text style={styles.timingValue}>8:00 AM</Text>
                </View>
                <View style={[styles.timingBox ,{marginRight:10}]}>
                  <Image source={require('../../assets/CheckOut.png')} style={styles.timingImage} />
                  <Text style={styles.timingImageText}>Check Out</Text>
                  <Text style={styles.timingValue}>8:30 AM</Text>
                </View>
              </View>
              <Text style={styles.timings}>Drop off Timings</Text>
              <View style={[styles.timingContainer, {marginBottom:10}]}>
                <View style={[styles.timingBox ,{marginLeft:10}]}>
                  <Image source={require('../../assets/CheckIn.png')} style={styles.timingImage} />
                  <Text style={styles.timingImageText}>Check In</Text>
                  <Text style={styles.timingValue}>4:30 PM</Text>
                </View>
                <View style={[styles.timingBox ,{marginRight:10}]}>
                  <Image source={require('../../assets/CheckOut.png')} style={styles.timingImage} />
                  <Text style={styles.timingImageText}>Check Out</Text>
                  <Text style={styles.timingValue}>5:00 PM</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.dotContainer}>
          {arr.map((item, ind) => (
            <View key={ind} style={[styles.dot, ind === offset ? styles.activeDot : null]}></View>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>TRACK MY CHILDREN</Text>
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
    marginTop: 5,
  },
  MyChildren: {
    backgroundColor: '#168070',
    width: '90%',
    borderRadius: 30,
    elevation: 10,
  },
  MyChildrenTitle: {
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '4%',
  },
  titleText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#168070',
    marginTop: -3,
  },
  childContainer: {
    borderColor: 'white',
    borderWidth: 1,
    width: width * 0.85,
    margin: 10,
    marginTop: 5,
    borderRadius: 30,
  },
  progressText: {
    fontSize: width * 0.03,
    color: 'white',
    alignSelf: 'center',
    marginTop: -height * 0.065,
    marginBottom: height * 0.04,
  },
  childName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  timings: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginBottom: 2,
  },
  timingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timingBox: {
    backgroundColor: '#2FAA98',
    borderRadius: width * 0.075,
    elevation: width * 0.025,
    width: width * 0.38,
    height: height * 0.160,
  },
  timingImage: {
    width: width * 0.2,
    height: height * 0.08,
    alignSelf: 'center',
    marginTop: 2,
  },
  timingImageText: {
    fontSize: width * 0.04,
    color: 'white',
    alignSelf: 'center',
  },
  timingValue: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width * 0.8,
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
