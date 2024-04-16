import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const PassValidity = () => {
  const route = useRoute();
  const { PassStatus } = route.params;
  const Images = {
    'Valid': require('../../assets/ValidPass.png'),
    'Invalid': require('../../assets/InvalidPass.png'),
  };
  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        <Image
          source={Images[PassStatus]}
          style={{
            width: width * 0.3,
            height: height * 0.159,
            marginTop: height * 0.01,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: width * 0.07,
            fontWeight: 'bold',
            color: 'white',
            marginTop: height * 0.001,
            alignSelf: 'center',
          }}>
          Pass Status: {PassStatus}
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop:height * 0.03,
            }}>
            <View
              style={{
                marginLeft: 10,
                width: width * 0.45,
                height: height * 0.1,
                borderRightWidth: 1,
                borderColor: 'white',
                borderBottomWidth: 2,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: width * 0.038,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                Student Name
              </Text>
              <Text
                style={{
                  fontSize: width * 0.05,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                Abdullah Faheem
              </Text>
            </View>
            <View
              style={{
                marginRight: 10,
                width: width * 0.45,
                height: height * 0.1,
                borderLeftWidth: 1,
                borderBottomWidth: 2,
                borderColor: 'white',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: width * 0.038,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                Registration No
              </Text>
              <Text
                style={{
                  fontSize: width * 0.05,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                2020-Arid-3587
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                marginLeft: 10,
                width: width * 0.45,
                height: height * 0.1,
                borderRightWidth: 1,
                borderColor: 'white',
                borderBottomWidth: 2,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: width * 0.038,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                Remaining Journeys
              </Text>
              <Text
                style={{
                  fontSize: width * 0.05,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                20
              </Text>
            </View>
            <View
              style={{
                marginRight: 10,
                width: width * 0.45,
                height: height * 0.1,
                borderLeftWidth: 1,
                borderBottomWidth: 2,
                borderColor: 'white',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: width * 0.038,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                Gender
              </Text>
              <Text
                style={{
                  fontSize: width * 0.05,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                Male
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                marginLeft: 10,
                width: width * 0.45,
                height: height * 0.1,
                borderRightWidth: 1,
                borderColor: 'white',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: width * 0.038,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                Pass ID
              </Text>
              <Text
                style={{
                  fontSize: width * 0.05,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                1200
              </Text>
            </View>
            <View
              style={{
                marginRight: 10,
                width: width * 0.45,
                height: height * 0.1,
                borderLeftWidth: 1,
                borderColor: 'white',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: width * 0.038,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                Pass Expiry
              </Text>
              <Text
                style={{
                    fontSize: width * 0.05,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                01/12/2023
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
    alignItems: 'center',
    backgroundColor: '#168070',
    justifyContent: 'center',
  },
  ContentContainer: {
    backgroundColor: '#168070',
    width: width * 0.95,
    borderRadius: 30,
    elevation: 20,
    marginBottom: 30,
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
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#168070',
  },
});

export default PassValidity;
