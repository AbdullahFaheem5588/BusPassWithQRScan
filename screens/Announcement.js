import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Api_url from '../Helper/URL';

const {width, height} = Dimensions.get('window');

const Announcement = () => {
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const makeAnnouncement = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Users/MakeAnnouncement?Description=${description}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      ToastAndroid.show(data, ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <Image
          source={require('../assets/Announcement.png')}
          style={{
            width: 100,
            height: 100,
            transform: [{rotate: '-20deg'}],
          }}
        />
        <Text style={styles.HeaderText}>Make an Announcement</Text>
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type Here"
          placeholderTextColor="white"
          numberOfLines={10}
          multiline={true}
          textAlignVertical="top"
          textAlign="left"
          onChangeText={setDescription}
          value={description}
        />
      </View>
      <TouchableOpacity
        style={{marginTop: 30}}
        onPress={() => {
          makeAnnouncement();
          navigation.goBack();
        }}>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            SEND
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
    alignItems: 'center',
  },
  textAreaContainer: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    width: width * 0.9,
    marginTop: height * 0.02,
    borderRadius: 20,
  },
  textArea: {
    color: 'white',
    justifyContent: 'flex-start',
  },
  TopContainer: {
    backgroundColor: '#2FAA98',
    width: '100%',
    borderBottomLeftRadius: width * 0.175,
    borderBottomRightRadius: width * 0.175,
    alignItems: 'center',
    paddingVertical: width * 0.05,
  },
  BottomContainer: {
    backgroundColor: 'white',
    width: '90%',
    marginTop: width * 0.03,
    elevation: width * 0.025,
    borderRadius: width * 0.075,
    marginBottom: 10,
  },
  HeaderText: {
    color: 'white',
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  NotificationDescriptionHeader: {
    color: '#168070',
    fontSize: width * 0.045,
    opacity: 0.8,
    marginTop: width * 0.025,
  },
  NotificationDescriptionData: {
    color: '#168070',
    fontSize: width * 0.045,
    fontWeight: 'bold',
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
});

export default Announcement;
