import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const FavStops = () => {

  const data = [
    {
      Name: 'Stop',
      Route: 'Route #',
    },
    {
      Name: 'Stop',
      Route: 'Route #',
    },
    {
      Name: 'Stop',
      Route: 'Route #',
    },
    {
      Name: 'Stop',
      Route: 'Route #',
    },
    {
      Name: 'Stop',
      Route: 'Route #',
    },
    {
      Name: 'Stop',
      Route: 'Route #',
    },
    {
      Name: 'Stop',
      Route: 'Route #',
    },
    {
      Name: 'Stop',
      Route: 'Route #',
    },
  ];
  const [checkedStates, setCheckedStates] = useState(new Array(data.length).fill(false));

  const handleCheckboxPress = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const handleRemove = () => {
    const newData = data.filter((item, index) => !checkedStates[index]);
    setCheckedStates(new Array(newData.length).fill(false));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatListRow}>
              <View>
                <Text style={styles.StopNametextStyle}>
                  Stop Name {index + 1}
                </Text>
                <Text style={styles.RouteNotextStyle}>Route # {index + 1}</Text>
              </View>
              <TouchableOpacity
                style={[styles.checkBox, checkedStates[index] && styles.checkedBox]}
                onPress={() => handleCheckboxPress(index)}>
                {checkedStates[index] && <Text style={styles.checkIcon}>✓</Text>}
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
    width: 360,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 10,
    marginTop: -20,
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
