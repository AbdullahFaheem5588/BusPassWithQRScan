import React, {useState, useRef, useEffect} from 'react';
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
import Api_url from '../../Helper/URL';
import convertToAMPM from '../../Helper/convertToAMPM';

const {width, height} = Dimensions.get('window');

const Dashboard = ({route}) => {
  const userDetails = route.params.userDetails;
  const [organizationsDetails, setOrganizationsDetails] = useState({});
  const [offset, setOffset] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setOffset(index);
  };

  const GetAllOrganizationDetails = async () => {
    try {
      const response = await fetch(
        `${Api_url}/SuperAdmin/GetAllOrganizationDetails`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) setOrganizationsDetails(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    GetAllOrganizationDetails();
  }, []);

  return (
    <View style={styles.container}>
      {organizationsDetails.Organizations && (
        <View style={styles.Organizations}>
          <View style={styles.OrganizationsTitle}>
            <Text style={styles.titleText}>All Organizations</Text>
          </View>
          <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            horizontalScrollEventThrottle={360}>
            {organizationsDetails.Organizations.map((item, ind) => (
              <View key={ind} style={styles.childContainer}>
                <View style={styles.progress}>
                  <Progress.Circle
                    progress={item.TotalUsers / organizationsDetails.TotalUsers}
                    size={width * 0.45}
                    showsText={true}
                    color="white"
                    borderWidth={7}
                    borderColor="#2FAA98"
                    formatText={() =>
                      `${item.TotalUsers} / ${organizationsDetails.TotalUsers}`
                    }
                  />
                  <Text style={styles.progressText}>Users</Text>
                </View>
                <Text
                  style={styles.Name}
                  adjustsFontSizeToFit
                  numberOfLines={1}>
                  {item.Name}
                </Text>
                <View style={styles.dataContainer}>
                  <View style={[styles.sigleBox, {marginLeft: 10}]}>
                    <Image
                      source={require('../../assets/Student.png')}
                      style={[styles.userImage, {tintColor: 'white'}]}
                      resizeMode="contain"
                    />
                    <Text style={styles.userImageText}>Students</Text>
                    <Text style={styles.userCount}>{item.TotalStudents}</Text>
                  </View>
                  <View style={[styles.sigleBox, {marginRight: 10}]}>
                    <Image
                      source={require('../../assets/Parent.png')}
                      style={[styles.userImage, {tintColor: 'white'}]}
                      resizeMode="contain"
                    />
                    <Text style={styles.userImageText}>Parents</Text>
                    <Text style={styles.userCount}>{item.TotalParents}</Text>
                  </View>
                </View>
                <View style={[styles.dataContainer, {marginBottom: 10}]}>
                  <View style={[styles.sigleBox, {marginLeft: 10}]}>
                    <Image
                      source={require('../../assets/Conductor.png')}
                      style={[styles.userImage, {tintColor: 'white'}]}
                      resizeMode="contain"
                    />
                    <Text style={styles.userImageText}>Conductors</Text>
                    <Text style={styles.userCount}>{item.TotalConductors}</Text>
                  </View>
                  <View style={[styles.sigleBox, {marginRight: 10}]}>
                    <Image
                      source={require('../../assets/Admin.png')}
                      style={[styles.userImage, {tintColor: 'white'}]}
                      resizeMode="contain"
                    />
                    <Text style={styles.userImageText}>Admins</Text>
                    <Text style={styles.userCount}>{item.TotalAdmins}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.dotContainer}>
            {organizationsDetails.Organizations.map((item, ind) => (
              <View
                key={ind}
                style={[
                  styles.dot,
                  ind === offset ? styles.activeDot : null,
                ]}></View>
            ))}
          </View>
        </View>
      )}
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
  Organizations: {
    backgroundColor: '#168070',
    width: '90%',
    borderRadius: 30,
    elevation: 10,
  },
  OrganizationsTitle: {
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: height * 0.035,
  },
  titleText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#168070',
    marginTop: -5,
  },
  childContainer: {
    borderColor: 'white',
    borderWidth: 1,
    width: width * 0.85,
    margin: 10,
    marginTop: 5,
    borderRadius: 30,
  },
  progressText: {
    fontSize: width * 0.05,
    color: 'white',
    alignSelf: 'center',
    marginTop: -height * 0.085,
    marginBottom: height * 0.04,
  },
  Name: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginTop: 10,
  },
  timings: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginBottom: 2,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sigleBox: {
    backgroundColor: '#2FAA98',
    borderRadius: width * 0.075,
    elevation: width * 0.025,
    width: width * 0.38,
    height: height * 0.18,
    marginTop: 10,
  },
  userImage: {
    height: height * 0.1,
    alignSelf: 'center',
    marginTop: 4,
  },
  userImageText: {
    fontSize: width * 0.04,
    color: 'white',
    alignSelf: 'center',
  },
  userCount: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width * 0.8,
    height: width * 0.125,
    borderRadius: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: width * 0.0125,
    marginBottom: width * 0.03,
    marginTop: width * 0.025,
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#168070',
  },
});

export default Dashboard;
