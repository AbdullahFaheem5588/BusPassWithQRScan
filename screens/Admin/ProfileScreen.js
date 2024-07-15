import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({route}) => {
  const userDetails = route.params.userDetails;
  const navigation = useNavigation();
  const [RouteRankingPopupVisible, setRouteRankingPopupVisible] =
    useState(false);

  const handleRouteRankingPopupVisibility = () => {
    setRouteRankingPopupVisible(!RouteRankingPopupVisible);
  };
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
          {userDetails.Name}
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: height * 0.03,
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
                {userDetails.Contact}
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
                  fontSize: width * 0.06,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                {userDetails.Gender}
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
                Admin ID
              </Text>
              <Text
                style={{
                  fontSize: width * 0.06,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                {userDetails.Id}
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
                {userDetails.UserName}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{marginTop: 15}}
        onPress={handleRouteRankingPopupVisibility}>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            HISTORY
          </Text>
        </View>
      </TouchableOpacity>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={RouteRankingPopupVisible}
        onRequestClose={handleRouteRankingPopupVisibility}>
        {RouteRankingPopupVisible && (
          <View style={styles.modalContainer}>
            <View style={[styles.Popup]}>
              <View
                style={{
                  borderColor: 'white',
                  borderStyle: 'solid',
                  borderWidth: 1,
                  width: width * 0.9,
                  margin: width * 0.025,
                  borderRadius: width * 0.075,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleRouteRankingPopupVisibility();
                    navigation.navigate('History', {
                      UserId: userDetails.UserId,
                    });
                  }}
                  style={{marginVertical: 10}}>
                  <View style={[styles.btn, {width: width * 0.8}]}>
                    <Text
                      style={{
                        fontSize: width * 0.055,
                        fontWeight: 'bold',
                        color: '#168070',
                      }}>
                      ALL HISTORY
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleRouteRankingPopupVisibility();
                    navigation.navigate('RouteRanking', {
                      OrganizationId: userDetails.OrganizationId,
                    });
                  }}
                  style={{marginVertical: 10}}>
                  <View style={[styles.btn, {width: width * 0.8}]}>
                    <Text
                      style={{
                        fontSize: width * 0.055,
                        fontWeight: 'bold',
                        color: '#168070',
                      }}>
                      ROUTE RANKING
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={handleRouteRankingPopupVisibility}>
              <View style={styles.btn}>
                <Text
                  style={{
                    fontSize: width * 0.055,
                    fontWeight: 'bold',
                    color: '#168070',
                  }}>
                  CLOSE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
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
  Popup: {
    backgroundColor: '#168070',
    width: width * 0.95,
    borderRadius: width * 0.075,
    elevation: width * 0.025,
    marginBottom: width * 0.075,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ProfileScreen;
