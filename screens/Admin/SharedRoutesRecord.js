import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SharedRoutesRecord = ({route}) => {
  const OrganizationId = route.params.OrganizationId;
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Item 1',
      description: 'Description 1',
      status: 'Pending',
      requestedByUser: true,
    },
    {
      id: 2,
      title: 'Item 2',
      description: 'Description 2',
      status: 'Accepted',
      requestedByUser: false,
    },
    {
      id: 3,
      title: 'Item 3',
      description: 'Description 3',
      status: 'Rejected',
      requestedByUser: true,
    },
    {
      id: 4,
      title: 'Item 4',
      description: 'Description 4',
      status: 'Pending',
      requestedByUser: false,
    },
    {
      id: 5,
      title: 'Item 5',
      description: 'Description 5',
      status: 'Accepted',
      requestedByUser: true,
    },
    {
      id: 6,
      title: 'Item 1',
      description: 'Description 1',
      status: 'Pending',
      requestedByUser: true,
    },
    {
      id: 7,
      title: 'Item 2',
      description: 'Description 2',
      status: 'Accepted',
      requestedByUser: false,
    },
    {
      id: 8,
      title: 'Item 3',
      description: 'Description 3',
      status: 'Rejected',
      requestedByUser: true,
    },
    {
      id: 9,
      title: 'Item 4',
      description: 'Description 4',
      status: 'Pending',
      requestedByUser: false,
    },
    {
      id: 10,
      title: 'Item 5',
      description: 'Description 5',
      status: 'Accepted',
      requestedByUser: true,
    },
    {
      id: 11,
      title: 'Item 1',
      description: 'Description 1',
      status: 'Pending',
      requestedByUser: true,
    },
    {
      id: 12,
      title: 'Item 2',
      description: 'Description 2',
      status: 'Accepted',
      requestedByUser: false,
    },
    {
      id: 13,
      title: 'Item 3',
      description: 'Description 3',
      status: 'Rejected',
      requestedByUser: true,
    },
    {
      id: 14,
      title: 'Item 4',
      description: 'Description 4',
      status: 'Pending',
      requestedByUser: false,
    },
    {
      id: 15,
      title: 'Item 5',
      description: 'Description 5',
      status: 'Accepted',
      requestedByUser: true,
    },
    // Add more items as needed
  ]);

  const filterOptions = [
    {id: 1, label: 'Pending'},
    {id: 2, label: 'Accepted'},
    {id: 3, label: 'Rejected'},
  ];

  const handleFilterSelect = id => {
    setSelectedFilter(id);
  };

  const handleAccept = itemId => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? {...item, status: 'Accepted'} : item,
      ),
    );
  };

  const handleReject = itemId => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? {...item, status: 'Rejected'} : item,
      ),
    );
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
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {selectedFilter === 1 && !item.requestedByUser && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAccept(item.id)}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleReject(item.id)}>
                    <Text style={styles.buttonText}>Reject</Text>
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
    const requestedByUserItems = items.filter(
      item =>
        item.status === filterOptions[selectedFilter - 1].label &&
        item.requestedByUser,
    );
    const needsResponseItems = items.filter(
      item =>
        item.status === filterOptions[selectedFilter - 1].label &&
        !item.requestedByUser,
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
      {renderSelectedView()}
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
});

export default SharedRoutesRecord;
