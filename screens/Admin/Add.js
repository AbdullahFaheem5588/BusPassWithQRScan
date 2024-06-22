import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Add = ({route}) => {
  const OrganizationId = route.params.userDetails.OrganizationId;
  const [RouteSharingPopupVisible, setRouteSharingPopupVisible] =
    useState(false);
  const navigation = useNavigation();
  const handleRouteSharingPopupVisibility = () => {
    setRouteSharingPopupVisible(!RouteSharingPopupVisible);
  };
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
        <TouchableOpacity
          style={{margin: width * 0.05}}
          onPress={handleRouteSharingPopupVisibility}>
          <View style={styles.touchableBox}>
            <Image
              source={require('../../assets/RouteSharing.png')}
              style={{height: 90, width: 90}}
            />
            <Text style={styles.touchableBoxText}>Route Sharing</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={RouteSharingPopupVisible}
        onRequestClose={handleRouteSharingPopupVisibility}>
        {RouteSharingPopupVisible && (
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
                    handleRouteSharingPopupVisibility();
                    navigation.navigate('FindNewRoutes', {
                      OrganizationId: OrganizationId,
                    });
                  }}>
                  <View style={[styles.btn, {width: width * 0.8}]}>
                    <Text
                      style={{
                        fontSize: width * 0.055,
                        fontWeight: 'bold',
                        color: '#168070',
                      }}>
                      FIND NEW ROUTES
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleRouteSharingPopupVisibility();
                    navigation.navigate('SharedRoutesRecord', {
                      OrganizationId: OrganizationId,
                    });
                  }}>
                  <View style={[styles.btn, {width: width * 0.8}]}>
                    <Text
                      style={{
                        fontSize: width * 0.055,
                        fontWeight: 'bold',
                        color: '#168070',
                      }}>
                      SHARED ROUTES RECORD
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={handleRouteSharingPopupVisibility}>
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
  btn: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width * 0.9,
    height: width * 0.125,
    borderRadius: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: width * 0.0125,
    marginBottom: width * 0.025,
    marginTop: width * 0.025,
  },
});

export default Add;
