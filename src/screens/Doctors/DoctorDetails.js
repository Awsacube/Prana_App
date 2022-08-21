import { StyleSheet, Text, View ,FlatList,TouchableOpacity,Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { Card } from "react-native-elements";
import { useGetDoctorQuery } from '../../services/userAuthApi';
import { Button } from 'react-native-elements';
import { Dimensions } from 'react-native';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const doctorDetails=[
    {
      "name": "Ekta maretta",
      "image": require('./docassets/stethoscope_bg.png'),
      "Experience":"7",
      "Specialization":"Pediatrician",
      "Timeslot":["6AM","6:30AM","7:00","7:30"],
      "Fee":300
    }
]


const DoctorDetails = ({route}) => {
  // const {data,isLoading,isFetching,error,isSuccess}=useGetDoctorsBySpecializationQuery(queryItems)
  return (
    <SafeAreaView>
        <View>
        <FlatList
            data={doctorDetails }
            keyExtractor={(item, index) => item.tc_id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              // let discount=item.discount
              return (
                <View style={styles.splLayout}>
                <View style={styles.top}>
                  <Image source={item.image} style={styles.img}/>
                </View>
                <View style={styles.bottom}>
                <Text style={styles.name}>
                  Dr. {item.name}
                </Text>
                <Text>{item.Specialization}</Text>
                <Text>{item.Experience} Years Experience</Text>
                </View>
                <View style={styles.slot}>
                    <Text>Select Slot</Text>
                    <FlatList data={item.Timeslot}
                        horizontal
                        renderItem={({tslot,index})=>{
                            return(
                                
                                <Card>
                                    <Text>item.Timeslot[0] Hello</Text>
                                </Card>
                                    
                                )
                        }}
                    />
                </View>
                </View>
              );
            }}
          />
    </View>
    </SafeAreaView>
  )
}

export default DoctorDetails

const styles = StyleSheet.create({

    splLayout:{
        // display:'flex',
        // backgroundColor:'red',
        margin:6,
        // borderRadius:10    
        // flex:1
      },
    
      top:{
        width: screenwidth,
        height: screenheight / 3,
        alignSelf: 'center',
      },
      img:{
        width: screenwidth,
        height: screenheight / 3,
         flex:1,
         resizeMode: 'stretch',
        },
    //   bottom:{
    //     display:'flex',
    //     justifyContent:''
    //   },
      name:{
        fontWeight:'bold'
      }

})