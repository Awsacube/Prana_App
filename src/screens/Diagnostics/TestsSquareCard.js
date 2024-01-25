//Test And Packages Screen Can Be Used Interchangeably
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import CButton from '../../components/CButton';
import {brandColor} from '../../constants/constants';

var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const allTests = [
  {
    name: 'Diabetes Care',
    price: 235,
    description: 'Diabetic care and etc etc etc etc etc etc',
    reportTime: '15 min',
    discount: '54%',
  },
  {
    name: 'Diabetes Care',
    price: 235,
    description: 'Diabetic care and etc etc etc etc etc etc',
    reportTime: '15 min',
    discount: '54 %',
  },
  {
    name: 'Diabetes Care',
    price: 235,
    description: 'Diabetic care and etc etc etc etc etc etc',
    reportTime: '15 min',
  },
];

const TestsSquareCard = () => {
  return (
    <View>
      {/* <Text style={{
          marginLeft: 15,
          marginTop: 10,
          marginBottom:20,
          fontSize: 18,
          color: '#000'
        }}>All Tests</Text> */}
      <FlatList
        data={allTests}
        keyExtractor={(item, index) => item.tc_id}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <View style={styles.splLayout}>
              <View style={styles.layoutItems}>
                <View style={styles.top}>
                  <Text style={styles.name}>
                    {item.name != null ? item.name : ''}
                  </Text>
                  <View style={styles.price}>
                    <Text>₹ {item.price}</Text>

                    {item.discount ? (
                      <Text style={styles.discount}>Save {item.discount}</Text>
                    ) : null}
                  </View>
                  <Text>{item.description}</Text>
                </View>
                <View style={styles.bottom}>
                  <Text style={styles.price}>
                    `Report in {item.reportTime}`
                  </Text>
                  <CButton Text="Book" onPress={() => console.warn('Booked')} />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TestsSquareCard;

const styles = StyleSheet.create({
  splLayout: {
    // margin:5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // alignContent: 'center',
    backgroundColor: '#fff',
    margin: 10,
    width: 300,
  },
  layoutItems: {
    padding: 15,
  },
  top: {
    display: 'flex',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    color: '#000',
  },
  price: {
    // marginTop:10,
    // marginBottom:10
    display: 'flex',
    flexDirection: 'row',
  },
  discount: {
    marginLeft: 20,
  },
  //   button: {
  //     alignItems: "center",
  //     backgroundColor: brandColor,
  //     padding: 10,
  //     paddingLeft:40,
  //     paddingRight:40,
  //     borderRadius:5
  //   },
});
