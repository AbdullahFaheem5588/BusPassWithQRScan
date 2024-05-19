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
import {enableScreens} from 'react-native-screens';

enableScreens();

const {width, height} = Dimensions.get('window');

const Dashboard = () => {
  const [offset, setOffset] = useState(0);
  const [notificationIcon, setNotificationIcon] = useState(
    require('../../assets/Notification-Focused.png'),
  );

  const handleNotificartionIcon = () => {
    if (notificationIcon === require('../../assets/Notification-Focused.png'))
      setNotificationIcon(require('../../assets/Notification-On.png'));
    else setNotificationIcon(require('../../assets/Notification-Focused.png'));
  };

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width * 0.9));
    setOffset(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <>
          <Progress.Circle
            progress={25 / 50}
            size={width * 0.35}
            showsText={true}
            color="white"
            borderWidth={width * 0.015}
            borderColor="#2FAA98"
            formatText={() => `${25} / ${50}`}
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
            {/*favStops[0].Name*/}
            Chandni Chowk
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
                1111
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
                1111
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
            Journey Details
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
                15
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
                5
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
