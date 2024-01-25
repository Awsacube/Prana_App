import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {useGetDoctorQuery} from '../../services/userAuthApi';
import {useGetTimeSlotsQuery} from '../../services/userAuthApi';
import {Button} from 'react-native-elements';
import {getToken} from '../../services/AsyncStorageService';
import {Dimensions} from 'react-native';
import {margin} from '@mui/system';
import {Picker} from '@react-native-picker/picker';
// import { Dropdown } from 'react-native-material-dropdown-v2'
import {Dropdown} from 'react-native-material-dropdown-v2';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const DoctorDetails = ({route}) => {
  const [selectedOpType, setSelectedOpType] = useState();
  console.warn(selectedOpType);

  let dropData = [
    {
      value: 'Offline',
    },
    {
      value: 'Online',
    },
  ];

  const doctorDetails = [
    // {
    //   "name": "Ekta maretta",
    //   "image": require('./docassets/stethoscope_bg.png'),
    //   "Experience":"7",
    //   "Specialization":"Pediatrician",
    //   "Timeslot":["6AM","6:30AM","7:00","7:30"],
    //   "Fee":300
    // }
  ];

  const Timeslots = [];

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const [userLToken, setUserLToken] = useState();
  const [Timeslot, SetTimeSlot] = useState();

  let selectedTimeslot;

  if (Timeslot !== undefined) {
    selectedTimeslot = Object.values(Timeslot);
  }

  const {uuid, id} = route.params;
  const queryItems = {token: userLToken, uuid: uuid};

  const queryItems2 = {
    token: userLToken,
    id: id,
  };
  const {data, isLoading, isFetching, error, isSuccess} =
    useGetDoctorQuery(queryItems);

  const res = useGetTimeSlotsQuery(queryItems2);

  // console.warn("slots data",res.data.data)
  if (res.isSuccess) {
    Timeslots.push(res.data.data);
  }

  {
    isSuccess && doctorDetails.unshift(data);
  }

  {
    console.warn(doctorDetails);
  }

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={doctorDetails}
          keyExtractor={(item, index) => item.tc_id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            // let discount=item.discount
            return (
              <View style={styles.splLayout}>
                <View style={styles.top}>
                  <Image source={item.image} style={styles.img} />
                </View>
                <View style={styles.bottom}>
                  <Text style={styles.name}>
                    Dr. {item.first_name} {item.last_name}
                  </Text>
                  <Text>{item.title}</Text>
                  <Text>Consultation Fees : {item.consultation_fee}</Text>
                </View>
                <View style={styles.slot}>
                  <Text>Select From Available Timeslots</Text>
                  <FlatList
                    data={Timeslots[0]}
                    horizontal
                    renderItem={(item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            SetTimeSlot({
                              date: item.item.date,
                              timeslot_id: item.item.uuid,
                              is_offline: item.item.type,
                              From: item.item.start_time,
                              To: item.item.end_time,
                            });
                          }}
                        >
                          <Card>
                            <Text>Date :{item.item.date}</Text>
                            <Text>From {item.item.start_time}</Text>
                            <Text>To {item.item.end_time}</Text>
                            <Text>Type :{item.item.type}</Text>
                          </Card>
                        </TouchableOpacity>
                      );
                    }}
                  />
                  {/* {console.warn("typeof timeslot",typeof(Timeslot))} */}
                  {Timeslot !== undefined && (
                    //  //this returns the keys
                    //   const appoint_keys = Object.keys()
                    //   //this returns the values
                    //   const appoint_values = Object.values()

                    <View>
                      <Text>Selected Appointment</Text>
                      <Card>
                        <Text>Date :{selectedTimeslot[0]}</Text>
                        <Text>From {selectedTimeslot[3]}</Text>
                        <Text>To {selectedTimeslot[4]}</Text>
                        {selectedTimeslot[2] === 'both' ? (
                          <>
                            <Dropdown
                              label="Choose Appointment Type"
                              data={dropData}
                              onChangeText={optype => setSelectedOpType(optype)}
                            />
                          </>
                        ) : (
                          <Text>Type :{selectedTimeslot[2]}</Text>
                        )}
                      </Card>
                      <Button style={styles.book} title="Book Appoitment" />
                    </View>
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DoctorDetails;

const styles = StyleSheet.create({
  splLayout: {
    // display:'flex',
    // backgroundColor:'red',
    margin: 6,
    // borderRadius:10
    // flex:1
  },
  book: {
    margin: 20,
  },
  top: {
    width: screenwidth,
    height: screenheight / 3,
    alignSelf: 'center',
  },
  img: {
    width: screenwidth,
    height: screenheight / 3,
    flex: 1,
    resizeMode: 'stretch',
  },
  //   bottom:{
  //     display:'flex',
  //     justifyContent:''
  //   },
  name: {
    fontWeight: 'bold',
  },
});
