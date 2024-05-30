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
  const [offset, setOffset] = useState(0);
  const [favStops, setfavStops] = useState([]);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const getFavStops = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Student/GetFavStops?id=${userDetails.Id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setfavStops(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    getFavStops();
  }, [favStops]);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / 360);
    setOffset(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <Progress.Circle
          progress={
            (userDetails.TotalJourneys - userDetails.RemainingJourneys) /
            userDetails.TotalJourneys
          }
          size={200}
          showsText={true}
          color="white"
          borderWidth={7}
          borderColor="#2FAA98"
          formatText={() =>
            `${userDetails.TotalJourneys - userDetails.RemainingJourneys} / ${
              userDetails.TotalJourneys
            }`
          }
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
          {Array.isArray(favStops) &&
            favStops.length > 0 &&
            favStops.map((item, ind) => (
              <View key={ind} style={styles.favoriteStopContainer}>
                <Text style={styles.favoriteStopText}>{item.Name}</Text>
                <View style={styles.infoContainer}>
                  <View style={styles.infoBox}>
                    <Image
                      source={require('../../assets/RouteNo.png')}
                      style={styles.infoImage}
                    />
                    <Text style={styles.infoLabel}>Route No</Text>
                    <Text style={styles.infoText}>{item.Route}</Text>
                  </View>
                  <View style={[styles.infoBox, {marginRight: 10}]}>
                    <Image
                      source={require('../../assets/StopTiming.png')}
                      style={styles.StopTimingImage}
                    />
                    <Text style={styles.infoLabel}>Stop Timing</Text>
                    <Text style={styles.infoText}>
                      {convertToAMPM(item.Timing)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
        {Array.isArray(favStops) && favStops.length > 0 && (
          <View>
            <View style={styles.pageIndicatorContainer}>
              {favStops.map((item, ind) => (
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
                navigation.navigate('FavStops', {
                  studentId: userDetails.Id,
                  favStops: favStops,
                });
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>EDIT FAVORITE STOPS</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
  infoImage: {
    width: width * 0.04,
    height: height * 0.1,
    alignSelf: 'center',
    marginTop: width * 0.01,
  },
  StopTimingImage: {
    width: width * 0.27,
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
