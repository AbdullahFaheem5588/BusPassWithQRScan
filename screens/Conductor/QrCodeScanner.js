import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {PermissionsAndroid} from 'react-native';
import {Api_url, Api_Image_url} from '../../Helper/URL';

const {width, height} = Dimensions.get('window');

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera.',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const QrCodeScanner = ({route}) => {
  const userDetails = route.params.userDetails;
  const [modalVisible, setModalVisible] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
  const scannerRef = useRef(null);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const onSuccess = async e => {
    try {
      let passId;
      if (typeof e.data === 'string' && e.data.length >= 18) {
        const passIdString = e.data.substring(18);

        if (!isNaN(passIdString)) {
          passId = parseInt(passIdString);
          const response = await fetch(
            `${Api_url}/Conductor/ScanQrCode?passId=${passId}&busId=${userDetails.BusId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setStudentDetails(data);
            setModalVisible(true);
          } else {
            const data = await response.json();
            ToastAndroid.show(data, ToastAndroid.SHORT);
            reactivateScanner();
          }
        } else {
          ToastAndroid.show('Invalid Pass!', ToastAndroid.SHORT);
          reactivateScanner();
        }
      } else {
        ToastAndroid.show('Invalid Pass!', ToastAndroid.SHORT);
        reactivateScanner();
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      reactivateScanner();
    }
  };

  const reactivateScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.reactivate();
    }
  };

  const toggleFullScreenImage = () => {
    setIsImageFullScreen(!isImageFullScreen);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        ref={scannerRef}
        onRead={onSuccess}
        bottomContent={<Text style={styles.ScanText}>Scan Here</Text>}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          reactivateScanner();
        }}>
        <View style={styles.modalContainer}>
          {!studentDetails || typeof studentDetails === 'object' ? (
            studentDetails.PassStatus === 'Active' ? (
              <View style={styles.ContentContainer}>
                {/* <Image
                  source={require('../../assets/ActivePass.png')}
                  style={styles.passImage}
                /> */}
                {studentDetails.Image && (
                  <TouchableOpacity onPress={toggleFullScreenImage}>
                    <Image
                      style={styles.studentImage}
                      source={{uri: Api_Image_url + studentDetails.Image}}
                    />
                  </TouchableOpacity>
                )}
                <Text style={styles.passStatusText}>
                  Pass Status: {studentDetails.PassStatus}
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
                        Student Name
                      </Text>
                      <Text
                        style={{
                          fontSize: width * 0.05,
                          fontWeight: 'bold',
                          color: 'white',
                          alignSelf: 'center',
                        }}>
                        {studentDetails.Name || 'N/A'}
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
                        {studentDetails.RegNo || 'N/A'}
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
                        {studentDetails.RemainingJourneys || 'N/A'}
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
                        {studentDetails.Gender || 'N/A'}
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
                        {studentDetails.PassId || 'N/A'}
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
                        {studentDetails.PassExpiry
                          ? studentDetails.PassExpiry.substring(0, 10)
                          : 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.ContentContainer}>
                <Image
                  source={require('../../assets/InActivePass.png')}
                  style={styles.passImage}
                />
                <Text style={styles.passStatusText}>
                  Pass Status: {studentDetails.PassStatus}
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
                        Student Name
                      </Text>
                      <Text
                        style={{
                          fontSize: width * 0.05,
                          fontWeight: 'bold',
                          color: 'white',
                          alignSelf: 'center',
                        }}>
                        {studentDetails.Name || 'N/A'}
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
                        {studentDetails.RegNo || 'N/A'}
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
                        {studentDetails.RemainingJourneys || 'N/A'}
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
                        {studentDetails.Gender || 'N/A'}
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
                        {studentDetails.PassId || 'N/A'}
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
                        {studentDetails.PassExpiry
                          ? studentDetails.PassExpiry.substring(0, 10)
                          : 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          ) : (
            <View></View>
          )}

          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              reactivateScanner();
            }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>CLOSE</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isImageFullScreen}
        onRequestClose={toggleFullScreenImage}>
        <View style={styles.fullScreenContainer}>
          <TouchableOpacity
            style={styles.fullScreenCloseButton}
            onPress={toggleFullScreenImage}>
            <Text style={styles.fullScreenCloseText}>Close</Text>
          </TouchableOpacity>
          <Image
            style={styles.fullScreenImage}
            source={{uri: Api_Image_url + studentDetails.Image}}
            resizeMode="contain"
          />
        </View>
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
  ScanText: {
    fontSize: 21,
    color: 'white',
    marginTop: -20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ContentContainer: {
    backgroundColor: '#168070',
    width: width * 0.95,
    borderRadius: 30,
    elevation: 20,
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },
  passImage: {
    width: width * 0.3,
    height: height * 0.159,
    alignSelf: 'center',
  },
  passStatusText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: 'white',
    marginTop: height * 0.01,
    alignSelf: 'center',
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
    marginTop: height * 0.03,
  },
  btnText: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#168070',
  },
  studentImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  fullScreenCloseText: {
    fontSize: 20,
    color: 'white',
  },
  fullScreenImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default QrCodeScanner;
