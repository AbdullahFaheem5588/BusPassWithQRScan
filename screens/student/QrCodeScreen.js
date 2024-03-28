import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrCodeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/ProfilePicture.png')}
        style={{
          width: 150,
          height: 150,
          marginTop: 20,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 10,
        }}>
        Abdullah Faheem
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
        }}>
        2020-Arid-3587
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          width: 350,
          height: 350,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius:50,
          marginTop:20,
        }}>
        <QRCode
          value="https://discountedbrandsbyzofshan.myshopify.com/"
          size={300}
        />
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
