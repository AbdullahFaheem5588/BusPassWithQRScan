import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({route}) => {
  const userDetails = route.params.userDetails;
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
            marginVertical: height * 0.005,
            alignSelf: 'center',
          }}>
          Super Admin
        </Text>
      </View>
      <TouchableOpacity
        style={{marginTop: 15}}
        onPress={() =>
          navigation.navigate('ChangePassword', {UserId: userDetails.UserId})
        }>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            CHANGE PASSWORD
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 15}}
        onPress={() => navigation.replace('Login')}>
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
