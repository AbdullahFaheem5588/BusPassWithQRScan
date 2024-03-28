import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const NotificationScreen = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                styles.flatListRow,
                index === 0 && {
                  backgroundColor: '#2FAA98',
                  borderWidth: 0,
                  elevation: 10,
                },
              ]}>
              <Text style={styles.DateTime}>Today, 11:30 AM</Text>
              <Text style={styles.NotificationType}>Notification Type</Text>
              <Text style={styles.NotificationDescription}>Description</Text>
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
  NotificationType: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: -20,
  },
  NotificationDescription: {
    color: 'white',
    fontSize: 20,
  },
  DateTime: {
    color: 'white',
    fontSize: 12,
    textAlign: 'right',
  },
});

export default NotificationScreen;
