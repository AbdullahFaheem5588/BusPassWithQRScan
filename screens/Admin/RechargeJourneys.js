import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {PermissionsAndroid} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

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

const RechargeJourneys = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [PassStatus, setPassStatus] = useState('');
  const scannerRef = useRef(null);
  const [journeyDetails, setJourneyDetials] = useState({
    PassId: null,
    NoOfJourneys: null,
    PassExpiry: new Date(),
  });
  const [showExpiryDateOPicker, setShowExpiryDatePicker] = useState(false);

  const addJourneys = () => {
    //Add Journey Code Here
    console.warn(journeyDetails);
    setModalVisible(false);
    navigation.goBack();
  }

  const handleShowExpiryDateOPicker = () => {
    setShowExpiryDatePicker(true);
  };
  const handleExpiryDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || showExpiryDateOPicker.PassExpiry;
    setShowExpiryDatePicker(false);
    const temp = {...journeyDetails};
    temp.PassExpiry = currentDate;
    setJourneyDetials(temp);
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const onSuccess = e => {
    console.log('Scanned');
    setJourneyDetials(prevState => ({
        ...prevState,
        PassId: e.data,
      }));
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
          {PassStatus === 'Active' || PassStatus === 'In-Active' ? (
            <View style={styles.ContentContainer}>
              <Image
                source={require('../../assets/ActivePass.png')}
                style={styles.passImage}
              />
              <Text style={styles.passStatusText}>Pass Status: Valid</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={e => {
                  const value = parseInt(e, 10);
                  if (!isNaN(value)) {
                    setJourneyDetials(prevState => ({
                      ...prevState,
                      NoOfJourneys: value,
                    }));
                  }
                }}
                value={journeyDetails.NoOfJourneys}
                placeholder="No of Journeys"
                placeholderTextColor="white"
                fontSize={width * 0.04}
              />
              <View style={styles.PickerContainer}>
                <View>
                  <Text style={styles.pickerText}>Pass Expiry:</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={handleShowExpiryDateOPicker}>
                    <Text style={styles.picker}>
                      {journeyDetails.PassExpiry.toDateString()}
                    </Text>
                  </TouchableOpacity>
                  {showExpiryDateOPicker && (
                    <DateTimePicker
                      value={journeyDetails.PassExpiry}
                      mode="date"
                      display="default"
                      onChange={handleExpiryDateChange}
                      minimumDate={new Date()}
                    />
                  )}
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
            onPress={addJourneys}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Add</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor: '#168070',
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
    marginBottom: height * 0.01,
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
  input: {
    marginBottom: height * 0.02,
    width: width * 0.8,
    height: height * 0.053,
    borderBottomWidth: 2,
    color: 'white',
    borderColor: 'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
  PickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  picker: {
    borderColor: '#2FAA98',
    borderRadius: 15,
    borderWidth: 2,
    color: 'white',
    fontSize: 20,
    height: 50,
    width: width * 0.5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  pickerText: {
    color: 'white',
    fontSize: width * 0.04,
    marginRight: width * 0.06,
  },
});

export default RechargeJourneys;
