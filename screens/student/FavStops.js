import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {Api_url} from '../../Helper/URL';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const FavStops = ({route}) => {
  const {studentId, favStops} = route.params;
  const [stops, setStops] = useState(favStops);
  const [checkedStates, setCheckedStates] = useState(
    new Array(stops.length).fill(false),
  );

  const handleCheckboxPress = index => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const RemovefromDB = async () => {
    try {
      for (let i = 0; i < stops.length; i++) {
        if (checkedStates[i]) {
          const response = await fetch(
            `${Api_url}Student/RemoveFavStop?studentId=${studentId}&stopId=${stops[i].Id}`,
            {
              method: 'DELETE',
            },
          );
          if (!response.ok) {
            ToastAndroid.show(
              'Failed to remove favorite stop ' + stops[i].Name,
              ToastAndroid.SHORT,
            );
          }
          const data = await response.json();
          ToastAndroid.show(data, ToastAndroid.SHORT);
          setStops(stops.filter(item => item.Id !== stops[i].Id));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleRemove = () => {
    RemovefromDB();
    const newData = stops.filter((item, index) => !checkedStates[index]);
    setCheckedStates(new Array(newData.length).fill(false));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stops}
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatListRow}>
              <View>
                <Text style={styles.StopNametextStyle}>{item.Name}</Text>
                <Text style={styles.RouteNotextStyle}>
                  Route # {item.Route}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.checkBox,
                  checkedStates[index] && styles.checkedBox,
                ]}
                onPress={() => handleCheckboxPress(index)}>
                {checkedStates[index] && (
                  <Text style={styles.checkIcon}>✓</Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <TouchableOpacity onPress={handleRemove}>
        <View style={styles.btn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#168070'}}>
            REMOVE
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
  },
  flatListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    margin: 7,
    padding: 10,
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
    marginBottom: width * 0.01,
    marginTop: -width * 0.05,
  },
  StopNametextStyle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  RouteNotextStyle: {
    color: 'white',
    fontSize: 20,
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: 'white',
  },
  checkIcon: {
    color: '#168070',
    fontSize: 20,
  },
});

export default FavStops;
