import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from "react-native";
import Search from '../../components/Search';

var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const Doctors=()=> {

  const categorylist = [
    {
      "name": "Book Appointment",
      "image": require('./docassets/doctor.jpg'),
      "status": "Confirmed Appointments"
    },
    {
      "name": "Instant Video Consulting",
      "image": require('./docassets/videocall.jpg'),
      "status": "Connect within 60 secs"
    },
    // {
    //   "name": "Manage Address",
    //   "image": require('./docassets/doctor.jpg'),
    //   "status": "Confirmed Appointments"
    // },
    // {
    //   "name": "Profile",
    //   "image": require('./docassets/videocall.jpg'),
    //   "status": "Connect within 60 secs"
    // },
  ];

  const specialitylList = [
    {
      "name": "General Physician",
      "image": require('./docassets/stethoscope_bg.png')
    },
    {
      "name": "Skin & Hair",
      "image": require('./docassets/hairface_bg.png')
    },
    {
      "name": "Women's Health",
      "image": require('./docassets/pregnant_bg.png')
    },
    {
      "name": "Dental Care",
      "image": require('./docassets/tooth_bg.png')
    },
    {
      "name": "Child Specialist",
      "image": require('./docassets/childpatient_bg.png')
    },
    {
      "name": "Ear, Nose,Throat",
      "image": require('./docassets/throat.png')
    },
    {
      "name": "Mental Wellness",
      "image": require('./docassets/mental_bg.png')
    },
    {
      "name": "Bones & Joint ",
      "image": require('./docassets/bone_bg.png')
    }
  ];



  return (
    <ScrollView>
    <SafeAreaView>
    <View style={styles.container}>
      <Search placeholder={"Search Health Problems , Specializations"}/>
        <FlatList
          data={categorylist}
          keyExtractor={(item, index) => item.tc_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.catLayout}>

                <Image source={item.image} style={styles.image} />

                <Text style={styles.productname}>
                  {item.name != null ? item.name : ""}
                </Text>

                <Text style={styles.status}>
                  {item.status != null ? item.status : ""}
                </Text>

              </View>
            );
          }}
        />



        <Text style={{
          marginLeft: 15,
          marginTop: 10,
          fontSize: 18,
          color: '#000'
        }}>Mostly searched specialities</Text>


        <View style={{
          marginTop: 20,
        }}>
          <FlatList
            data={specialitylList}
            keyExtractor={(item, index) => item.tc_id}
            vertical
            numColumns={4}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.splLayout}>
                  <Image source={item.image} style={styles.splimage} />

                  <Text style={styles.splname}>
                    {item.name != null ? item.name : ""}
                  </Text>
                </View>

              );
            }}
          />
        </View>


    </View>
    </SafeAreaView>
    </ScrollView>
  );
};

  export default Doctors;


const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flexDirection: 'column',

  }, catLayout: {
    width: 150,
    height: 250,
    borderRadius: 15,
    margin: 8,
    // elevation: 0.5,
  }, image: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  }, productname: {
    fontSize: 17,
    color: '#000',
    marginTop: 10,
    marginLeft: 5,
    height: 50
  }, status: {
    fontSize: 12,
    color: '#696969',
    height: 20,
    marginTop: 10,
    marginLeft: 5
  },

  splLayout: {
    width: screenwidth / 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  splimage: {
    width: screenwidth / 6,
    height: screenheight / 11,
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#D6EAF8'
  },
  splname: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
    height: 40,
    justifyContent: 'center',
    textAlignVertical: 'center'
  },


});















































































































































































// import React,{useState} from 'react'
// import { View, Text, ScrollView, StyleSheet, TextInput, Button } from 'react-native';
// import { RadioButton } from 'react-native-paper';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const Doctors = () => {
//     const [value, setValue] = React.useState('1');
//     const [date, setDate] = useState(new Date(Date.now()));
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);
  
//     const onChange = (event, selectedDate) => {
//       const currentDate = selectedDate || date;
//       setShow(Platform.OS === 'ios');
//       setDate(currentDate);
//     };
  
//     const showTimepicker = () => {
//       showMode('time');
//     };
  
//     const showDatepicker = () => {
//       showMode('date');
//     };
  
//     const showMode = (currentMode) => {
//       setShow(true);
//       setMode(currentMode);
//     };
  
//     return (
//       <SafeAreaView>
//       <ScrollView>
//         <View style={styles.container}>
  
//           <View style={styles.orderLayout}>
  
//             <Text style={{ textAlign: 'center', fontSize: 18, color: '#000' }}>Book Appointment</Text>
  
//             <View style={{ backgroundColor: '#A0A0A0', height: 1, margin: 10 }}></View>
  
//             <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
  
//               <Text style={{ fontSize: 15, color: '#000' }}>General Physician </Text>
  
//               <View style={{ flexDirection: 'column' }}>
  
//                 <Text style={{ fontSize: 15, color: '#606060' }}>by Dr.Kumar </Text>
  
//                 <Text>at Warangal</Text>
  
//               </View>
  
//             </View>
  
//             <View style={{ backgroundColor: '#0084fa', height: 40, marginTop: 10 }}>
  
//               <Text style={{
//                 color: '#fff',
//                 textAlignVertical: 'center',
//                 alignItems: 'center',
//                 flex: 1,
//                 paddingLeft: 10
//               }}>Customer/Patient Details</Text>
  
//             </View>
  
//             <Text style={styles.text}>Name of patient</Text>
  
//             <TextInput
//               style={styles.input}
//             />
  
//             <Text style={styles.text}>Gender</Text>
  
//             <RadioButton.Group
//               onValueChange={(value) => {
//                 setValue(value)
//               }}
  
//               value={value}
//             >
//               <View style={{ flexDirection: 'row' }}>
  
//                 <View style={{ flexDirection: 'row' }}>
  
//                   <RadioButton value="1" />
  
//                   <Text style={{ textAlignVertical: 'center' }}>Male</Text>
  
//                 </View>
  
//                 <View style={{ flexDirection: 'row', marginLeft: 20 }}>
  
//                   <RadioButton value="2" />
  
//                   <Text style={{ textAlignVertical: 'center' }}>Female</Text>
  
//                 </View>
  
//               </View>
  
//             </RadioButton.Group>
  
  
//             <Text style={styles.text}>Contact Number</Text>
  
//             <View style={{ flexDirection: 'row' }}>
  
//               <Text style={styles.text}>+91</Text>
  
//               <TextInput style={styles.input}/>
//             </View>
  
//             <Text style={styles.text}>Email</Text>
  
//             <TextInput style={styles.input}/>
  
//             <View style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               margin: 20
//             }}>
  
//               {!show && (
  
//                 <Text style={{ borderColor: '#000', borderWidth: 1, padding: 10, borderRadius: 10 }}
//                  onPress={showDatepicker} >Select Date</Text>
                 
//               )}
  
//               <Text style={{ borderColor: '#000', borderWidth: 1, padding: 10, borderRadius: 10 }}
//                 onPress={showTimepicker}>Select Time</Text>
  
//               <Text style={{ padding: 10 }} >Amt : 10</Text>
  
//             </View>
  
//             {show && (
  
//               <DateTimePicker
//                 testID="dateTimePicker"
//                 value={date}
//                 mode={mode}
//                 is24Hour={true}
//                 display="default"
//                 onChange={onChange}
//               />
  
//             )}
  
//             <Text style={styles.button}>Pay Amount</Text>
  
//           </View>
  
//         </View>
  
//       </ScrollView>
//       </SafeAreaView>
//     );
//   };
  
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignContent: 'center',
//       flexDirection: 'column',
//     },
//     orderLayout: {
//       borderStyle: 'dashed',
//       borderWidth: 2,
//       margin: 15,
//       borderRadius: 10,
//       borderColor: '#000',
//       paddingTop: 10,
//       paddingBottom: 10
//     }, input: {
//       flex: 1,
//       height: 40,
//       borderWidth: 1,
//       padding: 10,
//       marginRight: 10,
//       marginLeft: 10
//     },
//     text: {
//       fontSize: 15,
//       margin: 10,
//       color: '#000'
//     },
//     button: {
//       backgroundColor: '#323383',
//       height: 40,
//       color: '#fff',
//       textAlignVertical: 'center',
//       textAlign: 'center',
//       marginLeft: 20,
//       marginRight: 20,
//       borderRadius: 20
//     }
//   });
  