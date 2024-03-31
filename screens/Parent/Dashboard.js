import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {enableScreens} from 'react-native-screens';
import {useNavigation} from '@react-navigation/native';

enableScreens();

const Dashboard = () => {
  const [offset, setOffset] = useState(0);
  const arr = ['Abdullah Faheem', 'Adeel Shahid khan'];
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const handleScroll = event => {
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
      <View style={styles.MyChildren}>
        <View style={styles.MyChildrenTitle}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: 'bold',
              color: '#168070',
              marginTop:-5,
            }}>
            My Children
          </Text>
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
              <View
                key={ind}
                style={{
                  borderColor: 'white',
                  borderStyle: 'solid',
                  borderWidth: 1,
                  width: 360,
                  margin: 10,
                  marginTop: 5,
                  borderRadius: 30,
                }}>
                <View style={styles.progress}>
                  <>
                    <Progress.Circle
                      progress={59 / 100}
                      size={150}
                      showsText={true}
                      color="white"
                      borderWidth={7}
                      borderColor="#2FAA98"
                      formatText={() => `${59} / ${100}`}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'white',
                        alignSelf: 'center',
                        marginTop: -55,
                        marginBottom: 40,
                      }}>
                      Journeys Used
                    </Text>
                  </>
                </View>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'center',
                  }}>
                  {item}
                </Text>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'center',
                    marginTop:5,
                    marginBottom:5,
                  }}>Pick up Timings</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      marginLeft: 20,
                      backgroundColor: '#2FAA98',
                      borderRadius: 30,
                      elevation: 10,
                      width: 150,
                      height: 150,
                    }}>
                    <Image
                      source={require('../../assets/CheckIn.png')}
                      style={{
                        width: 100,
                        height: 80,
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
                      Check In
                    </Text>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        alignSelf: 'center',
                      }}>
                      8:00 AM
                    </Text>
                  </View>
                  <View
                    style={{
                      marginRight: 20,
                      width: 150,
                      height: 150,
                      backgroundColor: '#2FAA98',
                      borderRadius: 30,
                      elevation: 10,
                    }}>
                    <Image
                      source={require('../../assets/CheckOut.png')}
                      style={{
                        width: 100,
                        height: 80,
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
                      Check Out
                    </Text>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        alignSelf: 'center',
                      }}>
                      8:30 AM
                    </Text>
                  </View>
                </View>
                <Text  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'center',
                    marginTop:5,
                    marginBottom:5,
                  }}>Drop off Timings</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      marginLeft: 20,
                      backgroundColor: '#2FAA98',
                      borderRadius: 30,
                      elevation: 10,
                      width: 150,
                      height: 150,
                    }}>
                    <Image
                      source={require('../../assets/CheckIn.png')}
                      style={{
                        width: 100,
                        height: 80,
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
                      Check In
                    </Text>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        alignSelf: 'center',
                      }}>
                      4:30 PM
                    </Text>
                  </View>
                  <View
                    style={{
                      marginRight: 20,
                      width: 150,
                      height: 150,
                      backgroundColor: '#2FAA98',
                      borderRadius: 30,
                      elevation: 10,
                    }}>
                    <Image
                      source={require('../../assets/CheckOut.png')}
                      style={{
                        width: 100,
                        height: 80,
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
                      Check Out
                    </Text>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        alignSelf: 'center',
                      }}>
                      5:00 PM
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          {arr &&
            arr.map((item, ind) => (
              <View
                key={ind}
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <View
                  style={[
                    {
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      borderColor: 'white',
                      borderWidth: 1,
                      marginHorizontal: 5,
                    },
                    ind === offset ? {backgroundColor: 'white'} : null,
                  ]}></View>
              </View>
            ))}
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Map');
          }}>
          <View style={styles.btn}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
              TRACK MY CHILDREN
            </Text>
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
    width: 380,
    borderRadius: 30,
    elevation: 10,
  },
  MyChildrenTitle: {
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
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Dashboard;
