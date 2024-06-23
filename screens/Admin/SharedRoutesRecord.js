import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
import Api_url from '../../Helper/URL';

const {width, height} = Dimensions.get('window');

const SharedRoutesRecord = ({route}) => {
  const OrganizationId = route.params.OrganizationId;
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [sharedRoutesRecord, setSharedRoutesRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(null);

  const filterOptions = [
    {id: 1, label: 'Pending'},
    {id: 2, label: 'Accepted'},
    {id: 3, label: 'Rejected'},
  ];

  const GetSharedRoutesRecord = async () => {
    try {
      const response = await fetch(
        `${Api_url}/Admin/GetSharedRoutesRecord?OrganizationId=${OrganizationId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setSharedRoutesRecord(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetSharedRoutesRecord();
  }, []);

  const UpdateRequestStatus = async (id, status) => {
    try {
      setButtonLoading(id); // Set the loading state to the button's ID
      const response = await fetch(
        `${Api_url}/Admin/UpdateRequestStatus?Id=${id}&Status=${status}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        ToastAndroid.show(data, ToastAndroid.SHORT);
        GetSharedRoutesRecord();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setButtonLoading(null); // Reset the loading state
      setLoading(false);
    }
  };

  const handleFilterSelect = id => {
    setSelectedFilter(id);
  };

  const renderSection = (title, data) => (
    <>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {data.length === 0 ? (
        <Text style={styles.noDataText}>No Request Found!</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.Id.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.RouteTitle}</Text>
              <Text style={styles.itemDescription}>{item.Description}</Text>
              {selectedFilter === 1 && !item.RequestedByUser && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => UpdateRequestStatus(item.Id, 'Accepted')}
                    disabled={buttonLoading === item.Id}>
                    {buttonLoading === item.Id ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Accept</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => UpdateRequestStatus(item.Id, 'Rejected')}
                    disabled={buttonLoading === item.Id}>
                    {buttonLoading === item.Id ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Reject</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      )}
    </>
  );

  const renderSelectedView = () => {
    const requestedByUserItems = sharedRoutesRecord.filter(
      item =>
        item.Status === filterOptions[selectedFilter - 1].label &&
        item.RequestedByUser,
    );
    const needsResponseItems = sharedRoutesRecord.filter(
      item =>
        item.Status === filterOptions[selectedFilter - 1].label &&
        !item.RequestedByUser,
    );

    return (
      <View style={styles.viewContainer}>
        {renderSection('Requested to You', needsResponseItems)}
        {renderSection('Requested by You', requestedByUserItems)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        {filterOptions.map(filter => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => handleFilterSelect(filter.id)}>
            <View
              style={[
                styles.topFilters,
                selectedFilter === filter.id && styles.selectedFilter,
                selectedFilter === filter.id && styles.selectedFilterBorder,
              ]}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.id && styles.selectedFilterText,
                ]}>
                {filter.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      ) : (
        renderSelectedView()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
    alignItems: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: height * 0.01,
  },
  topFilters: {
    alignSelf: 'center',
    backgroundColor: '#2FAA98',
    width: width * 0.301,
    height: height * 0.05,
    borderTopRightRadius: width * 0.02,
    borderTopLeftRadius: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.014,
  },
  selectedFilter: {
    backgroundColor: 'white',
    height: height * 0.06,
    marginBottom: -height * 0.01,
  },
  selectedFilterBorder: {
    borderWidth: 2,
    borderColor: 'white',
  },
  filterText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedFilterText: {
    color: '#168070',
  },
  viewContainer: {
    width: width * 0.957,
    height: height * 0.71,
    backgroundColor: 'white',
    borderBottomRightRadius: width * 0.02,
    borderBottomLeftRadius: width * 0.02,
    padding: 10,
  },
  viewText: {
    fontSize: width * 0.05,
    color: '#168070',
    fontWeight: 'bold',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: 'white',
    marginTop: height * 0.02,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: width * 0.05,
    color: '#168070',
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: width * 0.04,
    color: '#168070',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statusText: {
    marginTop: 10,
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#168070',
  },
  sectionTitleContainer: {
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#168070',
    padding: 5,
    borderRadius: 10,
  },
  noDataText: {
    textAlign: 'center',
    color: '#168070',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  loader: {
    marginTop: height * 0.4,
  },
});

export default SharedRoutesRecord;
