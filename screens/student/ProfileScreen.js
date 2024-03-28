import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        <Image
          source={require('../../assets/ProfilePicture.png')}
          style={{
            width: 100,
            height: 100,
            marginTop: 20,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 10,
            alignSelf: 'center',
          }}>
          Abdullah Faheem
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            alignSelf: 'center',
          }}>
          2020-Arid-3587
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View
              style={{
                marginLeft: 10,
                width: 180,
                height: 80,
                borderRightWidth: 1,
                borderColor: 'white',
                borderBottomWidth: 2,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                Contact Number
              </Text>
              <Text
                style={{
                  fontSize: 25,
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
                width: 180,
                height: 80,
                borderLeftWidth: 1,
                borderBottomWidth: 2,
                borderColor: 'white',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                Gender
              </Text>
              <Text
                style={{
                  fontSize: 25,
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
                width: 180,
                height: 80,
                borderRightWidth: 1,
                borderColor: 'white',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                Pass ID
              </Text>
              <Text
                style={{
                  fontSize: 25,
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
                width: 180,
                height: 80,
                borderLeftWidth: 1,
                borderColor: 'white',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                Pass Expiry
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                10/11/2024
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={{marginTop: 30}} onPress={() => navigation.navigate('History')}>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            HISTORY
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 30}} onPress={() => navigation.navigate('ChangePassword')}>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            CHANGE PASSWORD
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 30}} onPress={() => navigation.replace('Login')}>
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
  },
  ContentContainer: {
    backgroundColor: '#168070',
    width: 380,
    borderRadius: 30,
    elevation: 20,
    marginTop: 35,
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
  },
});

export default ProfileScreen;
