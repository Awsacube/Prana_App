import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import Search from '../../components/Search';
import Specialization from './Specialization';
import DocHealthConcern from './DocHealthConcern';
import DoctorCard from './DoctorCard';
import {useNavigation} from '@react-navigation/native';
import Carousel from '../Carousel';
import Calltoorder from '../Calltoorder';
import DocSearch from '../Doctors/DocSearch';
import Location from '.././Location';
import {colors} from '../../constants/colors';
import adjust from '../../utils/responsive';

var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const Doctors = () => {
  const navigation = useNavigation();

  const categorylist = [
    {
      name: 'Book Appointment',
      image: require('./docassets/doctor.jpg'),
      status: 'Confirmed Appointments',
      id: 1,
    },
    {
      name: 'Instant Video Consulting',
      image: require('./docassets/videocall.jpg'),
      status: 'Connect within 60 secs',
      id: 2,
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

  // const specialitylList = [
  //   {
  //     "name": "General Physician",
  //     "image": require('./docassets/stethoscope_bg.png')
  //   },
  //   {
  //     "name": "Skin & Hair",
  //     "image": require('./docassets/hairface_bg.png')
  //   },
  //   {
  //     "name": "Women's Health",
  //     "image": require('./docassets/pregnant_bg.png')
  //   },
  //   {
  //     "name": "Dental Care",
  //     "image": require('./docassets/tooth_bg.png')
  //   },
  //   {
  //     "name": "Child Specialist",
  //     "image": require('./docassets/childpatient_bg.png')
  //   },
  //   {
  //     "name": "Ear, Nose,Throat",
  //     "image": require('./docassets/throat.png')
  //   },
  //   {
  //     "name": "Mental Wellness",
  //     "image": require('./docassets/mental_bg.png')
  //   },
  //   {
  //     "name": "Bones & Joint ",
  //     "image": require('./docassets/bone_bg.png')
  //   }
  // ];

  const bookapp = () => {};
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Search
          placeholder={'Search For Tests , Health Packages'}
          editable={false}
          navigate="EmptyPage"
          component={<DocSearch />}
        />
        <View style={styles.headerContainer}>
          <View style={styles.mainContainer}>
            <Location style={styles.location} />
            <View>
              <Calltoorder text={'Book a Test'} />
            </View>
          </View>
        </View>
        <View>
          <FlatList
            // LisHeaderComponent={
            //   <>
            //            <Search placeholder={"Search Health Problems , Specializations"}/>
            //   </>}
            data={categorylist}
            keyExtractor={(item, index) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View style={styles.catLayout}>
                  <TouchableHighlight
                    onPress={() => navigation.navigate('BookAppointment')}>
                    <Image source={item.image} style={styles.image} />
                  </TouchableHighlight>
                  <Text
                    style={styles.productname}
                    onPress={() => navigation.navigate('BookAppointment')}>
                    {item.name != null ? item.name : ''}
                  </Text>

                  {/* <Text style={styles.status}>
                  {item.status != null ? item.status : ""}
                </Text> */}
                </View>
              );
            }}
          />
        </View>

        {/* <Text style={{
          marginLeft: 15,
          marginTop: 10,
          fontSize: 18,
          color: '#000'
        }}>Mostly searched specialities</Text> */}

        {/* <View style={{
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
 */}
        {/* <Carousel data={dummyData}/> */}
        <Specialization />
        <DocHealthConcern />
      </View>
    </SafeAreaView>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  container: {
    // alignContent: 'center',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center'
    backgroundColor: colors.pearlWhite,
    height: '100%',
    // flex: 1,
    paddingHorizontal: adjust(5),
  },
  headerContainer: {
    // flex: 1,
    alignItems: 'center',
    paddingVertical: adjust(5),
    // paddingHorizontal: adjust(5),
  },
  mainContainer: {
    width: '100%',
    // flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    marginTop: adjust(10),
    marginHorizontal: adjust(5),
    // backgroundColor: colors.red,
  },

  catLayout: {
    width: 150,
    height: 250,
    borderRadius: 15,
    margin: 8,
    // elevation: 0.5,
  },
  image: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  productname: {
    fontSize: 17,
    color: '#000',
    marginTop: 10,
    marginLeft: 5,
    height: 50,
  },
  status: {
    fontSize: 12,
    color: '#696969',
    height: 20,
    marginTop: 10,
    marginLeft: 5,
  },
});
