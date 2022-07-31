import { StyleSheet, Text, View ,FlatList,Image} from 'react-native'
import React from 'react'
import { Dimensions } from "react-native";

var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const specialitylList = [
    {
      "name": "Diabetes Care",
      "image": require('./docassets/stethoscope_bg.png')
    },
    {
      "name": "Heart Health",
      "image": require('./docassets/hairface_bg.png')
    },
    {
      "name": "Lifestyle",
      "image": require('./docassets/pregnant_bg.png')
    },
    {
      "name": "Thyroid Care",
      "image": require('./docassets/tooth_bg.png')
    },
    {
      "name": "Health Checkups",
      "image": require('./docassets/childpatient_bg.png')
    },
    {
      "name": "RTPCR",
      "image": require('./docassets/throat.png')
    },
    {
      "name": "Women Care",
      "image": require('./docassets/mental_bg.png')
    },
    {
      "name": "Monsoon Care",
      "image": require('./docassets/bone_bg.png')
    }
  ];


const HealthConcerns = () => {
  return (
    <View>
        <Text style={{
          marginLeft: 15,
          marginTop: 10,
          marginBottom:20,
          fontSize: 18,
          color: '#000'
        }}>Browse Lab Tests By Health Concern</Text>
       <FlatList
            data={specialitylList}
            keyExtractor={(item, index) => item.tc_id}
            horizontal
            showsHorizontalScrollIndicator={false}
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
  )
}

export default HealthConcerns

const styles = StyleSheet.create({

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

})