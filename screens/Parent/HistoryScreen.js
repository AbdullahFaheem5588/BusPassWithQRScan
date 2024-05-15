import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Api_url from '../../Helper/URL';
import convertToAMPM from '../../Helper/convertToAMPM';

const {width, height} = Dimensions.get('window');

const HistoryScreen = ({route}) => {
  const UserId = route.params.UserId;
  const [History, setHistory] = useState([]);
  date = new Date();
  const [fromDate, setFromDate] = useState(
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
  );
  const [toDate, setToDate] = useState(
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
  );
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const handleFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(false);
    formattedDate =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate();
    setFromDate(formattedDate);
  };

  const handleToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(false);
    formattedDate =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate();
    setToDate(formattedDate);
  };

  const showFromDatepicker = () => {
    setShowFromDatePicker(true);
  };

  const showToDatepicker = () => {
    setShowToDatePicker(true);
  };

  const getUserHistory = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Users/GetUserHistory?id=${UserId}&fDate=${fromDate}&tDate=${toDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    getUserHistory();
  }, [fromDate, toDate]);
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <View style={styles.firstPicker}>
          <Text style={styles.pickerText}>From</Text>
          <TouchableOpacity onPress={showFromDatepicker}>
            <Text style={styles.picker}>{fromDate}</Text>
          </TouchableOpacity>
          {showFromDatePicker && (
            <DateTimePicker
              value={new Date(fromDate)}
              mode="date"
              display="default"
              onChange={handleFromDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
        <View>
          <Text style={styles.pickerText}>To</Text>
          <TouchableOpacity onPress={showToDatepicker}>
            <Text style={styles.picker}>{toDate}</Text>
          </TouchableOpacity>
          {showToDatePicker && (
            <DateTimePicker
              value={new Date(toDate)}
              mode="date"
              display="default"
              onChange={handleToDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
      </View>
      <FlatList
        data={History.flat()}
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatListRow}>
              <Text style={styles.DateTime}>
                {item.Date.substring(0, 10)} , {convertToAMPM(item.Time)}
              </Text>
              <Text style={styles.HistoryType}>{item.Type}</Text>
              <Text style={styles.HistoryDescription}>
                Child StudentName: {item.StudentName}
              </Text>
              <Text style={styles.HistoryDescription}>
                Bus No: {item.BusId}
              </Text>
              <Text style={styles.HistoryDescription}>
                Route No: {item.RouteId}
              </Text>
              <Text style={styles.HistoryDescription}>
                Stop No: {item.StopId}
              </Text>
            </View>
          );
        }}
      />
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
    marginTop: -20,
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

export default HistoryScreen;
