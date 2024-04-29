import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {PermissionsAndroid} from 'react-native';

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

const QrCodeScanner = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [PassStatus, setPassStatus] = useState('');
  const scannerRef = useRef(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const onSuccess = e => {
    console.log('Scanned');
    setPassStatus(e.data);
    setModalVisible(true);
  };

  const reactivateScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.reactivate();
    }
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
          {PassStatus === 'Active' ? (
            <View style={styles.ContentContainer}>
              <Image
                source={require('../../assets/ActivePass.png')}
                style={styles.passImage}
              />
              <Text style={styles.passStatusText}>Pass Status: Active</Text>
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
                      01/12/2025
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : PassStatus === 'In-Active' ? (
            <View style={styles.ContentContainer}>
              <Image
                source={require('../../assets/InActivePass.png')}
                style={styles.passImage}
              />
              <Text style={styles.passStatusText}>Pass Status: In-Active</Text>
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
                      0
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
          ) : (
            <View style={styles.ContentContainer}>
              <Image
                source={require('../../assets/InActivePass.png')}
                style={styles.passImage}
              />
              <Text style={styles.passStatusText}>Pass Status: In-Valid</Text>
            </View>
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
    marginTop:-20,
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
});

export default QrCodeScanner;
