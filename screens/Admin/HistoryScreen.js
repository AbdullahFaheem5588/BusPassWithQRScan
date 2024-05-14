import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const {width, height} = Dimensions.get('window');

const HistoryScreen = ({route}) => {
  const UserId = route.params.UserId;
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const handleFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(false);
    setFromDate(currentDate);
  };

  const handleToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(false);
    setToDate(currentDate);
  };

  const showFromDatepicker = () => {
    setShowFromDatePicker(true);
  };

  const showToDatepicker = () => {
    setShowToDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <View style={styles.firstPicker}>
          <Text style={styles.pickerText}>From</Text>
          <TouchableOpacity onPress={showFromDatepicker}>
            <Text style={styles.picker}>{fromDate.toDateString()}</Text>
          </TouchableOpacity>
          {showFromDatePicker && (
            <DateTimePicker
              value={fromDate}
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
            <Text style={styles.picker}>{toDate.toDateString()}</Text>
          </TouchableOpacity>
          {showToDatePicker && (
            <DateTimePicker
              value={toDate}
              mode="date"
              display="default"
              onChange={handleToDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatListRow}>
              <Text style={styles.DateTime}>Today, 11:30 AM</Text>
              <Text style={styles.HistoryType}>History Type</Text>
              <Text style={styles.HistoryDescription}>Description</Text>
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
