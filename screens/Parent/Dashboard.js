import React, {useState, useRef, useEffect} from 'react';
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
import Api_url from '../../Helper/URL';
import convertToAMPM from '../../Helper/convertToAMPM';

const {width, height} = Dimensions.get('window');

const Dashboard = ({route}) => {
  const userDetails = route.params.userDetails;
  const [childrenDetails, setChildrenDetails] = useState([]);
  const [offset, setOffset] = useState(0);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setOffset(index);
  };

  const getChildren = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Parent/GetChildren/?id=${userDetails.Id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setChildrenDetails(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getChildren();
    const interval = setInterval(() => {}, 6000);
    return () => clearInterval(interval);
  }, [childrenDetails]);

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
          {childrenDetails.map((item, ind) => (
            <View key={ind} style={styles.childContainer}>
              <View style={styles.progress}>
                <Progress.Circle
                  progress={
                    (item.childDetails.TotalJourneys -
                      item.childDetails.RemainingJourneys) /
                    item.childDetails.TotalJourneys
                  }
                  size={width * 0.35}
                  showsText={true}
                  color="white"
                  borderWidth={7}
                  borderColor="#2FAA98"
                  formatText={() =>
                    `${
                      item.childDetails.TotalJourneys -
                      item.childDetails.RemainingJourneys
                    } / ${item.childDetails.TotalJourneys}`
                  }
                />
                <Text style={styles.progressText}>Journeys Used</Text>
              </View>
              <Text style={styles.childName}>{item.childDetails.Name}</Text>
              <Text style={styles.timings}>Pick up Timings</Text>
              <View style={styles.timingContainer}>
                <View style={[styles.timingBox, {marginLeft: 10}]}>
                  <Image
                    source={require('../../assets/CheckIn.png')}
                    style={styles.timingImage}
                  />
                  <Text style={styles.timingImageText}>Check In</Text>
                  <Text style={styles.timingValue}>
                    {convertToAMPM(item.childTimings.Pickup_Checkin)}
                  </Text>
                </View>
                <View style={[styles.timingBox, {marginRight: 10}]}>
                  <Image
                    source={require('../../assets/CheckOut.png')}
                    style={styles.timingImage}
                  />
                  <Text style={styles.timingImageText}>Check Out</Text>
                  <Text style={styles.timingValue}>
                    {convertToAMPM(item.childTimings.Pickup_Checkout)}
                  </Text>
                </View>
              </View>
              <Text style={styles.timings}>Drop off Timings</Text>
              <View style={[styles.timingContainer, {marginBottom: 10}]}>
                <View style={[styles.timingBox, {marginLeft: 10}]}>
                  <Image
                    source={require('../../assets/CheckIn.png')}
                    style={styles.timingImage}
                  />
                  <Text style={styles.timingImageText}>Check In</Text>
                  <Text style={styles.timingValue}>
                    {convertToAMPM(item.childTimings.Dropup_Checkin)}
                  </Text>
                </View>
                <View style={[styles.timingBox, {marginRight: 10}]}>
                  <Image
                    source={require('../../assets/CheckOut.png')}
                    style={styles.timingImage}
                  />
                  <Text style={styles.timingImageText}>Check Out</Text>
                  <Text style={styles.timingValue}>
                    {convertToAMPM(item.childTimings.Dropup_Checkout)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.dotContainer}>
          {childrenDetails.map((item, ind) => (
            <View
              key={ind}
              style={[
                styles.dot,
                ind === offset ? styles.activeDot : null,
              ]}></View>
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
    height: height * 0.16,
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
    marginBottom: width * 0.03,
    marginTop: width * 0.025,
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#168070',
  },
});

export default Dashboard;
