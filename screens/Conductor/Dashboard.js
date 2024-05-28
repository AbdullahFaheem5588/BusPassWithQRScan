import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  Alert,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {enableScreens} from 'react-native-screens';
import Api_url from '../../Helper/URL';
import convertToAMPM from '../../Helper/convertToAMPM';

enableScreens();

const {width, height} = Dimensions.get('window');

const Dashboard = ({route}) => {
  const userDetails = route.params.userDetails;
  const [nextStop, setNextStop] = useState({
    Id: Number,
    Name: '',
    Timing: '',
    Route: Number,
  });
  const [routeDetails, setRouteDetails] = useState({
    TotalStops: Number,
    RemainingStops: Number,
  });
  const [bookedSeats, setBookedSeats] = useState(0);

  const getBookedSeats = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Conductor/GetBookedSeats/?conductorId=${userDetails.Id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setBookedSeats(data || 0);
      } else {
        setBookedSeats(0);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const getRemainingStops = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Conductor/GetRemainingStops/?conductorId=${userDetails.Id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setRouteDetails(data || {TotalStops: Number, RemainingStops: Number});
      } else {
        setRouteDetails({TotalStops: Number, RemainingStops: Number});
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const getNextStop = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Conductor/GetNextStop/?conductorId=${userDetails.Id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setNextStop(data || {Id: Number, Name: '', Timing: '', Route: Number});
      } else {
        setNextStop({Id: Number, Name: '', Timing: '', Route: Number});
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    getNextStop();
  }, [nextStop]);

  useEffect(() => {
    getRemainingStops();
  }, [routeDetails]);

  useEffect(() => {
    getBookedSeats();
  }, [bookedSeats]);

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <>
          <Progress.Circle
            progress={bookedSeats / userDetails.TotalSeats}
            size={width * 0.35}
            showsText={true}
            color="white"
            borderWidth={width * 0.015}
            borderColor="#2FAA98"
            formatText={() => `${bookedSeats} / ${userDetails.TotalSeats}`}
          />
          <Text
            style={{
              fontSize: width * 0.035,
              color: 'white',
              alignSelf: 'center',
              marginTop: -(width * 0.12),
              marginBottom: width * 0.09,
            }}>
            Seats Booked
          </Text>
        </>
      </View>
      <View style={styles.MainContainer}>
        <View style={styles.Title}>
          <Text
            style={{
              fontSize: width * 0.05,
              fontWeight: 'bold',
              color: '#168070',
            }}>
            Next Stop
          </Text>
        </View>
        <View
          style={{
            borderColor: 'white',
            borderStyle: 'solid',
            borderWidth: 1,
            width: width * 0.9,
            margin: width * 0.025,
            marginTop: width * 0.025,
            borderRadius: width * 0.075,
          }}>
          <Text
            style={{
              fontSize: width * 0.055,
              fontWeight: 'bold',
              color: 'white',
              alignSelf: 'center',
            }}>
            {nextStop.Name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: width * 0.025,
              marginBottom: width * 0.025,
            }}>
            <View
              style={{
                marginLeft: width * 0.025,
                backgroundColor: '#2FAA98',
                borderRadius: width * 0.075,
                elevation: width * 0.025,
                width: width * 0.4,
                height: height * 0.175,
              }}>
              <Image
                source={require('../../assets/RouteNo.png')}
                style={{
                  width: width * 0.04,
                  height: height * 0.1,
                  alignSelf: 'center',
                  marginTop: width * 0.01,
                }}
              />
              <Text
                style={{
                  fontSize: width * 0.035,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: width * 0.0125,
                }}>
                Route No
              </Text>
              <Text
                style={{
                  fontSize: width * 0.055,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                {nextStop.Route}
              </Text>
            </View>
            <View
              style={{
                marginRight: width * 0.025,
                width: width * 0.4,
                height: height * 0.175,
                backgroundColor: '#2FAA98',
                borderRadius: width * 0.075,
                elevation: width * 0.025,
              }}>
              <Image
                source={require('../../assets/StopTiming.png')}
                style={{
                  width: width * 0.27,
                  height: height * 0.1,
                  alignSelf: 'center',
                  marginTop: height * 0.005,
                }}
              />
              <Text
                style={{
                  fontSize: width * 0.035,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: width * 0.0125,
                }}>
                Stop Timing
              </Text>
              <Text
                style={{
                  fontSize: width * 0.055,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                {convertToAMPM(nextStop.Timing)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.MainContainer, {marginTop: height * 0.015}]}>
        <View style={styles.Title}>
          <Text
            style={{
              fontSize: width * 0.05,
              fontWeight: 'bold',
              color: '#168070',
            }}>
            Route Details
          </Text>
        </View>
        <View
          style={{
            borderColor: 'white',
            borderStyle: 'solid',
            borderWidth: 1,
            width: width * 0.9,
            margin: width * 0.025,
            marginTop: width * 0.025,
            borderRadius: width * 0.075,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: width * 0.025,
              marginBottom: width * 0.025,
            }}>
            <View
              style={{
                marginLeft: width * 0.025,
                backgroundColor: '#2FAA98',
                borderRadius: width * 0.075,
                elevation: width * 0.025,
                width: width * 0.4,
                height: height * 0.175,
              }}>
              <Image
                source={require('../../assets/RouteNo.png')}
                style={{
                  width: width * 0.04,
                  height: height * 0.1,
                  alignSelf: 'center',
                  marginTop: width * 0.01,
                }}
              />
              <Text
                style={{
                  fontSize: width * 0.035,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: width * 0.0125,
                }}>
                Total Stops
              </Text>
              <Text
                style={{
                  fontSize: width * 0.055,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                {routeDetails.TotalStops}
              </Text>
            </View>
            <View
              style={{
                marginRight: width * 0.025,
                width: width * 0.4,
                height: height * 0.175,
                backgroundColor: '#2FAA98',
                borderRadius: width * 0.075,
                elevation: width * 0.025,
              }}>
              <Image
                source={require('../../assets/RouteNo.png')}
                style={{
                  width: width * 0.04,
                  height: height * 0.1,
                  alignSelf: 'center',
                  marginTop: width * 0.01,
                }}
              />
              <Text
                style={{
                  fontSize: width * 0.035,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: width * 0.0125,
                }}>
                Remaining Stops
              </Text>
              <Text
                style={{
                  fontSize: width * 0.055,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                {routeDetails.RemainingStops}
              </Text>
            </View>
          </View>
        </View>
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
  MainContainer: {
    backgroundColor: '#168070',
    width: width * 0.95,
    borderRadius: width * 0.075,
    elevation: width * 0.025,
  },
  Title: {
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    width: width * 0.95,
    borderTopLeftRadius: width * 0.075,
    borderTopRightRadius: width * 0.075,
    height: height * 0.035,
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
});

export default Dashboard;
