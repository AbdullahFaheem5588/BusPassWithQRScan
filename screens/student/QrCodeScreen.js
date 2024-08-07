import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const {width, height} = Dimensions.get('window');

const QrCodeScreen = ({route}) => {
  const userDetails = route.params.userDetails;
  const QrCodeValue = 'BusPassWithQrScan/' + userDetails.PassId.toString();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/ProfilePicture.png')}
        style={{
          width: width * 0.4,
          height: height * 0.21,
          marginTop: height * 0.01,
        }}
      />
      <Text
        style={{
          fontSize: width * 0.07,
          fontWeight: 'bold',
          color: 'white',
          marginTop: height * 0.001,
        }}>
        {userDetails.Name}
      </Text>
      <Text
        style={{
          fontSize: width * 0.05,
          fontWeight: 'bold',
          color: 'white',
        }}>
        {userDetails.RegNo}
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          width: width * 0.95,
          height: height * 0.45,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          marginTop: height * 0.03,
        }}>
        <QRCode value={QrCodeValue} size={width * 0.75} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#168070',
  },
});

export default QrCodeScreen;
