import React,{useState,useRef} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import * as Progress from 'react-native-progress';
  import { enableScreens } from 'react-native-screens';
  import { useNavigation } from '@react-navigation/native';
  
  enableScreens();
  
  const Dashboard = () => {
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
  
    // useEffect(() => {
    //   const login = async () => {
    //     try {
    //       const response = await fetch(
    //         url + 'Users/Login?username=student2&password=studentpass2',
    //       );
    //       const userData = await response.json();
    //       setData(userData.Students);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
    //   login();
  
    //   const GetFavStops = async () => {
    //     try {
    //       const response = await fetch(url + 'Student/GetFavStops?passId=2');
    //       const stops = await response.json();
    //       setFavStops(stops);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
    //   GetFavStops();
    // }, []);
  
    return (
      <View style={styles.container}>
        <View style={styles.progress}>
          <>
            <Progress.Circle
              progress={25 / 50}
              size={150}
              showsText={true}
              color="white"
              borderWidth={7}
              borderColor="#2FAA98"
              formatText={() => `${25} / ${50}`}
            />
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                alignSelf: 'center',
                marginTop: -55,
                marginBottom: 45,
              }}>
              Seats Booked
            </Text>
          </>
        </View>
        <View style={styles.MainContainer}>
          <View style={styles.Title}>
            <Text
              style={{
                fontSize: 23,
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
                    width: 360,
                    margin: 10,
                    marginTop: 10,
                    borderRadius: 30,
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
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
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        marginLeft: 10,
                        backgroundColor: '#2FAA98',
                        borderRadius: 30,
                        elevation: 10,
                        width: 160,
                        height: 160,
                      }}>
                      <Image
                        source={require('../../assets/RouteNo.png')}
                        style={{
                          width: 21,
                          height: 85,
                          alignSelf: 'center',
                          marginTop: 10,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        Route No
                      </Text>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: 'bold',
                          color: 'white',
                          alignSelf: 'center',
                        }}>
                        1111
                      </Text>
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                        width: 160,
                        height: 160,
                        backgroundColor: '#2FAA98',
                        borderRadius: 30,
                        elevation: 10,
                      }}>
                      <Image
                        source={require('../../assets/StopTiming.png')}
                        style={{
                          width: 120,
                          height: 85,
                          alignSelf: 'center',
                          marginTop:10,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        Stop Timing
                      </Text>
                      <Text
                        style={{
                          fontSize: 25,
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
        <View style={[styles.MainContainer, {marginTop:20,}]}>
          <View style={styles.Title}>
            <Text
              style={{
                fontSize: 23,
                fontWeight: 'bold',
                color: '#168070',
              }}>
              Bus Seat Availability
            </Text>
          </View>
          <View
                  style={{
                    borderColor: 'white',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    width: 360,
                    margin: 10,
                    marginTop: 10,
                    borderRadius: 30,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        marginLeft: 10,
                        backgroundColor: '#2FAA98',
                        borderRadius: 30,
                        elevation: 10,
                        width: 160,
                        height: 160,
                      }}>
                      <Image
                        source={require('../../assets/RouteNo.png')}
                        style={{
                          width: 21,
                          height: 85,
                          alignSelf: 'center',
                          marginTop: 10,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        Route No
                      </Text>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: 'bold',
                          color: 'white',
                          alignSelf: 'center',
                        }}>
                        1111
                      </Text>
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                        width: 160,
                        height: 160,
                        backgroundColor: '#2FAA98',
                        borderRadius: 30,
                        elevation: 10,
                      }}>
                      <Image
                        source={require('../../assets/StopTiming.png')}
                        style={{
                          width: 120,
                          height: 85,
                          alignSelf: 'center',
                          marginTop:10,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        Stop Timing
                      </Text>
                      <Text
                        style={{
                          fontSize: 25,
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
      width: 380,
      borderRadius: 30,
      elevation: 10,
    },
    Title: {
      alignItems: 'center',
      backgroundColor: '#D9D9D9',
      width: 380,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      height: 30,
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
  });
  
  export default Dashboard;