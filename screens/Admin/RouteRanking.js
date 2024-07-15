import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {Api_url} from '../../Helper/URL';

const {width, height} = Dimensions.get('window');

const RouteRanking = ({route}) => {
  const OrganizationId = route.params.OrganizationId;
  const [History, setHistory] = useState([]);

  const GetRouteRaking = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Admin/GetRouteRaking?OrganizationId=${OrganizationId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setHistory(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    GetRouteRaking();
  }, []);

  return (
    <View style={styles.container}>
      {History.length > 0 ? (
        <View>
          <FlatList
            data={History.sort()}
            renderItem={({item, index}) => {
              return (
                <View style={styles.flatListRow}>
                  <Text style={styles.HistoryType}>
                    Route No: {item.RouteId}
                  </Text>
                  <Text style={styles.HistoryDescription}>
                    Bus No: {item.BusId}
                  </Text>
                  <Text style={styles.HistoryDescription}>
                    Travel Type: {item.TravelType}
                  </Text>
                  <Text style={styles.HistoryDescription}>
                    Max Passengers Entered: {item.MaxPassengers}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
  },
  flatListRow: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    margin: 7,
    padding: 10,
  },
  HistoryType: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  HistoryDescription: {
    color: 'white',
    fontSize: 20,
  },
  DateTime: {
    color: 'white',
    fontSize: 12,
    textAlign: 'right',
  },
  firstPicker: {
    marginRight: width * 0.03,
  },
  picker: {
    borderColor: '#2FAA98',
    borderRadius: 15,
    borderWidth: 2,
    color: 'white',
    fontSize: 20,
    height: 50,
    width: width * 0.47,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  pickerText: {
    color: 'white',
    fontSize: 20,
  },
});

export default RouteRanking;
