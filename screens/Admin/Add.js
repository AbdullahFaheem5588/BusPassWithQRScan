import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Add = ({route}) => {
  const OrganizationId = route.params.userDetails.OrganizationId;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{margin: width * 0.05}}
          onPress={() =>
            navigation.navigate('AdminAddNewStudent', {
              OrganizationId: OrganizationId,
            })
          }>
          <View style={styles.touchableBox}>
            <Image source={require('../../assets/Student.png')} />
            <Text style={styles.touchableBoxText}>ADD NEW STUDENT</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: width * 0.05}}
          onPress={() =>
            navigation.navigate('AdminAddNewAdmin', {
              OrganizationId: OrganizationId,
            })
          }>
          <View style={styles.touchableBox}>
            <Image
              source={require('../../assets/Admin.png')}
              style={{height: 80, width: 80}}
            />
            <Text style={styles.touchableBoxText}>ADD NEW ADMIN</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{margin: width * 0.05}}
          onPress={() =>
            navigation.navigate('AdminRechargeJourneys', {
              OrganizationId: OrganizationId,
            })
          }>
          <View style={styles.touchableBox}>
            <Image
              source={require('../../assets/Journey.png')}
              style={{height: 80, width: 80}}
            />
            <Text style={styles.touchableBoxText}>RECHARGE JOURNEYS</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: width * 0.05}}
          onPress={() =>
            navigation.navigate('AdminAddNewBus', {
              OrganizationId: OrganizationId,
            })
          }>
          <View style={styles.touchableBox}>
            <Image
              source={require('../../assets/Bus.png')}
              style={{height: 80, width: 80}}
            />
            <Text style={styles.touchableBoxText}>ADD NEW BUS</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{margin: width * 0.05}}
          onPress={() =>
            navigation.navigate('AdminSearchAndUpdate', {
              OrganizationId: OrganizationId,
            })
          }>
          <View style={styles.touchableBox}>
            <Image
              source={require('../../assets/Search&Update.png')}
              style={{height: 80, width: 80}}
            />
            <Text style={styles.touchableBoxText}>SEARCH & UPDATE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
    justifyContent: 'center',
  },
  touchableBox: {
    backgroundColor: 'white',
    width: width * 0.4,
    height: height * 0.22,
    borderRadius: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: width * 0.0125,
  },
  touchableBoxText: {
    fontSize: width * 0.044,
    fontWeight: 'bold',
    color: '#168070',
    textAlign: 'center',
    marginTop: height * 0.03,
  },
});

export default Add;
