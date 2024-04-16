import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
  requestCameraPermission();
  const navigation = useNavigation();

  onSuccess = e => {
    console.log('Scanned');
    //Linking.openURL(e.data).catch(err => console.error('An error occured', err));
    navigation.navigate('PassValidity', {PassStatus: e.data});
    setTimeout(() => {
        this.scanner.reactivate();
      }, 3000);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        ref={node => {
          this.scanner = node;
        }}
        onRead={this.onSuccess}
        bottomContent={<Text style={styles.ScanText}>Scan Here</Text>}
      />
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
  },
});

export default QrCodeScanner;
