import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        <Image
          source={require('../../assets/ProfilePicture.png')}
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
          Ahmed Shehbaz
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
                Contact Number
              </Text>
              <Text
                style={{
                  fontSize: width * 0.06,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                03345207788
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
                Bus No
              </Text>
              <Text
                style={{
                  fontSize: width * 0.06,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                RWP-1122
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
                Conductor ID
              </Text>
              <Text
                style={{
                  fontSize: width * 0.06,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                0001
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
                Username
              </Text>
              <Text
                style={{
                  fontSize: width * 0.027,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                AhmedShehbaz_0001@Biit.edu.pk
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.navigate('History')}>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            HISTORY
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.navigate('ChangePassword')}>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            CHANGE PASSWORD
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.replace('Login')}>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            LOG OUT
          </Text>
        </View>
      </TouchableOpacity>
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
    marginTop: 5,
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
});

export default ProfileScreen;
