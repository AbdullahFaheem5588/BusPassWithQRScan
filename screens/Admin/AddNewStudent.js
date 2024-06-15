import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SelectList} from 'react-native-dropdown-select-list';
import Api_url from '../../Helper/URL';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const AddNewStudent = ({route}) => {
  const OrganizationId = route.params.OrganizationId;
  const navigation = useNavigation();
  const [newOrOldParent, setNewOrOldParent] = useState('');
  const [parentsFromDB, setParentsFromDB] = useState([]);
  const [parentInserted, setParentInserted] = useState(false);
  const ParentSelection = [
    {key: 1, value: 'New Parent'},
    {Key: 2, value: 'Existing Parent'},
  ];
  const Genders = [
    {key: 1, value: 'Male'},
    {Key: 2, value: 'Female'},
  ];
  const [studentDetails, setStudentDetails] = useState({
    Name: '',
    RegNo: '',
    Contact: '',
    Password: '',
    TotalJourneys: '',
    PassExpiry: new Date(),
    Gender: '',
    ParentId: '',
    OrganizationId: OrganizationId,
  });
  const [parentDetails, setParentDetails] = useState({
    Name: '',
    Contact: '',
    Password: '',
    OrganizationId: OrganizationId,
  });
  const [showExpiryDateOPicker, setShowExpiryDatePicker] = useState(false);

  useEffect(() => {
    const GetAllParents = async () => {
      try {
        const response = await fetch(
          `${Api_url}/Users/GetAllParents?OrganizationId=${OrganizationId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          setParentsFromDB([]);
          data.map(item => {
            setParentsFromDB(prevState => [
              ...prevState,
              {key: item.Id, value: item.Name},
            ]);
          });
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    };
    GetAllParents();
  }, []);

  const addNewStudent = async () => {
    try {
      if (newOrOldParent === 'New Parent') {
        if (
          Object.values(parentDetails).every(
            value => typeof value === 'string' && value.trim() !== '',
          )
        ) {
          const response = await fetch(`${Api_url}/Users/InsertParent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(parentDetails),
          });

          if (response.ok) {
            const newParentId = await response.json();
            setStudentDetails(prevState => ({
              ...prevState,
              ParentId: newParentId,
            }));
            setParentInserted(true);
          } else {
            const data = await response.json();
            console.log(data);
            return;
          }
        } else {
          ToastAndroid.show(
            'Please provide the necessary details!',
            ToastAndroid.SHORT,
          );
          return;
        }
      } else {
        setParentInserted(true);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (parentInserted) {
      insertStudent();
    }
  }, [parentInserted, studentDetails]);

  const insertStudent = async () => {
    try {
      if (
        Object.values(studentDetails).every(value =>
          typeof value === 'string' ? value.trim() !== '' : value !== '',
        )
      ) {
        const response = await fetch(`${Api_url}/Users/InsertStudent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentDetails),
        });

        if (response.ok) {
          const data = await response.json();
          navigation.goBack();
          ToastAndroid.show(data, ToastAndroid.SHORT);
        } else {
          const data = await response.json();
          console.log(data);
        }
      } else {
        ToastAndroid.show(
          'Please provide the necessary details!',
          ToastAndroid.SHORT,
        );
      }
      setParentInserted(false);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleShowExpiryDateOPicker = () => {
    setShowExpiryDatePicker(true);
  };
  const handleExpiryDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || showExpiryDateOPicker.PassExpiry;
    setShowExpiryDatePicker(false);
    const temp = {...studentDetails};
    temp.PassExpiry = currentDate;
    setStudentDetails(temp);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.FormContainer}>
        <Text
          style={{
            color: 'white',
            fontSize: width * 0.06,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginBottom: height * 0.03,
          }}>
          Student Details
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            temp = {...studentDetails};
            temp.Name = e;
            setStudentDetails(temp);
          }}
          value={studentDetails.Name}
          placeholder="Name"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <TextInput
          style={styles.input}
          onChangeText={e => {
            temp = {...studentDetails};
            temp.RegNo = e;
            setStudentDetails(temp);
          }}
          value={studentDetails.RegNo}
          placeholder="Registration No"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <TextInput
          style={styles.input}
          onChangeText={e => {
            temp = {...studentDetails};
            temp.Contact = e;
            setStudentDetails(temp);
          }}
          value={studentDetails.Contact}
          keyboardType="phone-pad"
          placeholder="Contact No"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <TextInput
          style={styles.input}
          onChangeText={e => {
            temp = {...studentDetails};
            temp.Password = e;
            setStudentDetails(temp);
          }}
          value={studentDetails.Password}
          keyboardType="visible-password"
          placeholder="Password"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => {
            const value = parseInt(text, 10);
            if (!isNaN(value)) {
              setStudentDetails(prevState => ({
                ...prevState,
                TotalJourneys: value,
              }));
            }
          }}
          value={studentDetails.TotalJourneys.toString()}
          placeholder="Total Journeys"
          placeholderTextColor="white"
          fontSize={width * 0.04}
        />
        <View style={styles.PickerContainer}>
          <View>
            <Text style={styles.pickerText}>Pass Expiry:</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleShowExpiryDateOPicker}>
              <Text style={styles.picker}>
                {studentDetails.PassExpiry.toDateString()}
              </Text>
            </TouchableOpacity>
            {showExpiryDateOPicker && (
              <DateTimePicker
                value={studentDetails.PassExpiry}
                mode="date"
                display="default"
                onChange={handleExpiryDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>
        </View>
        <SelectList
          setSelected={val => {
            setStudentDetails(prevDetails => ({
              ...prevDetails,
              Gender: val,
            }));
          }}
          data={Genders}
          save="value"
          search={false}
          placeholder="Select Gender"
          inputStyles={{color: 'white'}}
          dropdownTextStyles={{color: 'white'}}
          dropdownStyles={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 5,
            width: width * 0.8,
            alignSelf: 'center',
            color: 'white',
            alignItems: 'center',
            marginBottom: height * 0.02,
          }}
          boxStyles={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 5,
            width: width * 0.8,
            alignSelf: 'center',
            color: 'white',
            marginTop: height * 0.02,
            marginBottom: height * 0.02,
          }}
        />
        <SelectList
          setSelected={val => setNewOrOldParent(val)}
          data={ParentSelection}
          save="value"
          search={false}
          placeholder="New or Existing Parent?"
          inputStyles={{color: 'white'}}
          dropdownTextStyles={{color: 'white'}}
          dropdownStyles={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 5,
            width: width * 0.8,
            alignSelf: 'center',
            color: 'white',
            alignItems: 'center',
            marginBottom: height * 0.02,
          }}
          boxStyles={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 5,
            width: width * 0.8,
            alignSelf: 'center',
            color: 'white',
            marginTop: height * 0.02,
            marginBottom: height * 0.02,
          }}
        />
      </View>
      {newOrOldParent === 'New Parent' ? (
        <View style={styles.FormContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.06,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            Parent Details
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={e => {
              temp = {...parentDetails};
              temp.Name = e;
              setParentDetails(temp);
            }}
            value={parentDetails.Name}
            placeholder="Name"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            onChangeText={e => {
              temp = {...parentDetails};
              temp.Contact = e;
              setParentDetails(temp);
            }}
            value={parentDetails.Contact}
            placeholder="Contact No"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
          <TextInput
            keyboardType="visible-password"
            style={styles.input}
            onChangeText={e => {
              temp = {...parentDetails};
              temp.Password = e;
              setParentDetails(temp);
            }}
            value={parentDetails.Password}
            placeholder="Password"
            placeholderTextColor="white"
            fontSize={width * 0.04}
          />
        </View>
      ) : newOrOldParent === 'Existing Parent' ? (
        <View style={styles.FormContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.06,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            Parent Details
          </Text>
          <SelectList
            setSelected={val => {
              setStudentDetails({
                ...studentDetails,
                ParentId: parseInt(val),
              });
            }}
            data={parentsFromDB}
            save="key"
            searchPlaceholder="Search By Name"
            placeholder="Select Existing Parent"
            inputStyles={{color: 'white'}}
            dropdownTextStyles={{color: 'white'}}
            dropdownStyles={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 5,
              width: width * 0.8,
              alignSelf: 'center',
              color: 'white',
              alignItems: 'center',
              marginBottom: height * 0.02,
            }}
            boxStyles={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 5,
              width: width * 0.8,
              alignSelf: 'center',
              color: 'white',
              marginTop: height * 0.02,
              marginBottom: height * 0.02,
            }}
          />
        </View>
      ) : (
        <View></View>
      )}
      <TouchableOpacity onPress={addNewStudent}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>ADD</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#168070',
  },
  FormContainer: {
    backgroundColor: '#168070',
    width: width * 0.95,
    borderRadius: width * 0.075,
    elevation: width * 0.025,
    alignSelf: 'center',
    verticalAlign: 'middle',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  input: {
    marginBottom: height * 0.02,
    width: width * 0.8,
    height: height * 0.053,
    borderBottomWidth: 2,
    color: 'white',
    borderColor: 'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
  PickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  picker: {
    borderColor: '#2FAA98',
    borderRadius: 15,
    borderWidth: 2,
    color: 'white',
    fontSize: 20,
    height: 50,
    width: width * 0.5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  pickerText: {
    color: 'white',
    fontSize: width * 0.04,
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
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  btnText: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#168070',
  },
});

export default AddNewStudent;
